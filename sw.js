// Service Worker สำหรับ Seven Smile Tour
// เพิ่ม performance และ offline support

const CACHE_NAME = "seven-smile-tour-v1.0.0";
const STATIC_CACHE = "seven-smile-static-v1";
const DYNAMIC_CACHE = "seven-smile-dynamic-v1";

// ไฟล์ที่ต้องการ cache เมื่อ install
const STATIC_FILES = [
  "/",
  "/index.html",
  "/images/logo.png",
  "/logo2.png",
  "/manifest.json",
  // CSS และ JS จะ cache แบบ dynamic
];

// API endpoints ที่จะ cache
const API_CACHE_PATTERNS = [/\/api\/tours/, /\/api\/gallery/, /\/api\/health/];

// รูปภาพที่จะ cache
const IMAGE_CACHE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /\/images\//,
  /\/logo/,
];

// =====================================
// INSTALL EVENT - Cache static files
// =====================================
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Service Worker: Caching static files");
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log("✅ Service Worker: Installation complete");
        return self.skipWaiting(); // Force activation
      })
      .catch((error) => {
        console.error("❌ Service Worker: Installation failed", error);
      })
  );
});

// =====================================
// ACTIVATE EVENT - Clean old caches
// =====================================
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // ลบ cache เก่าที่ไม่ใช้แล้ว
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== CACHE_NAME
            ) {
              console.log("🗑️ Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker: Activation complete");
        return self.clients.claim(); // Take control immediately
      })
  );
});

// =====================================
// FETCH EVENT - Handle requests
// =====================================
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // ข้าม external requests และ chrome-extension
  if (
    !url.origin.includes(self.location.origin) ||
    url.protocol === "chrome-extension:"
  ) {
    return;
  }

  // Handle different types of requests
  if (request.method === "GET") {
    if (isStaticFile(request)) {
      event.respondWith(handleStaticFile(request));
    } else if (isAPIRequest(request)) {
      event.respondWith(handleAPIRequest(request));
    } else if (isImageRequest(request)) {
      event.respondWith(handleImageRequest(request));
    } else if (isNavigationRequest(request)) {
      event.respondWith(handleNavigation(request));
    }
  }
});

// =====================================
// HELPER FUNCTIONS
// =====================================

// Check if request is for static files
function isStaticFile(request) {
  return (
    request.url.includes(".css") ||
    request.url.includes(".js") ||
    request.url.includes(".woff") ||
    request.url.includes(".woff2") ||
    request.url.includes("manifest.json")
  );
}

// Check if request is for API
function isAPIRequest(request) {
  return API_CACHE_PATTERNS.some((pattern) => pattern.test(request.url));
}

// Check if request is for images
function isImageRequest(request) {
  return IMAGE_CACHE_PATTERNS.some((pattern) => pattern.test(request.url));
}

// Check if request is navigation
function isNavigationRequest(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept").includes("text/html"))
  );
}

// =====================================
// CACHE STRATEGIES
// =====================================

// Cache First - สำหรับ static files
function handleStaticFile(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response;
    }

    return fetch(request)
      .then((fetchResponse) => {
        // Cache successful responses
        if (fetchResponse && fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches
            .open(STATIC_CACHE)
            .then((cache) => cache.put(request, responseClone));
        }
        return fetchResponse;
      })
      .catch((error) => {
        console.log("❌ Static file fetch failed:", request.url, error);
        return new Response("File not available offline", {
          status: 503,
          statusText: "Service Unavailable",
        });
      });
  });
}

// Network First - สำหรับ API requests
function handleAPIRequest(request) {
  return fetch(request)
    .then((response) => {
      // Cache successful API responses
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches
          .open(DYNAMIC_CACHE)
          .then((cache) => cache.put(request, responseClone));
      }
      return response;
    })
    .catch((error) => {
      console.log("🌐 API request failed, trying cache:", request.url);

      // ถ้า network fail ให้ลอง cache
      return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // ถ้าไม่มี cache ให้ส่ง error response
        return new Response(
          JSON.stringify({
            error: "Network unavailable",
            message: "Please check your internet connection",
            cached: false,
          }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      });
    });
}

// Cache First - สำหรับรูปภาพ
function handleImageRequest(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response;
    }

    return fetch(request)
      .then((fetchResponse) => {
        // Cache successful image responses
        if (fetchResponse && fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches
            .open(DYNAMIC_CACHE)
            .then((cache) => cache.put(request, responseClone));
        }
        return fetchResponse;
      })
      .catch((error) => {
        console.log("🖼️ Image fetch failed:", request.url);

        // ส่ง placeholder image หรือ fallback
        return new Response("", {
          status: 404,
          statusText: "Image not found",
        });
      });
  });
}

// Network First with Cache Fallback - สำหรับ navigation
function handleNavigation(request) {
  return fetch(request)
    .then((response) => {
      // Cache HTML pages
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches
          .open(DYNAMIC_CACHE)
          .then((cache) => cache.put(request, responseClone));
      }
      return response;
    })
    .catch((error) => {
      console.log("📄 Navigation failed, trying cache:", request.url);

      // ถ้า network fail ให้ลอง cache
      return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fallback ไปที่ index.html สำหรับ SPA
        return caches.match("/index.html").then((indexResponse) => {
          if (indexResponse) {
            return indexResponse;
          }

          // ถ้าไม่มี index.html ใน cache
          return new Response("Offline - Please check your connection", {
            status: 503,
            headers: { "Content-Type": "text/html" },
          });
        });
      });
    });
}

// =====================================
// BACKGROUND SYNC (Optional)
// =====================================
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("🔄 Service Worker: Background sync triggered");
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // ทำ background tasks เมื่อ network กลับมา
  return Promise.resolve().then(() => {
    console.log("✅ Background sync completed");
  });
}

// =====================================
// PUSH NOTIFICATIONS (Optional)
// =====================================
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log("📱 Push notification received:", data);

    const options = {
      body: data.body || "Seven Smile Tour มีข่าวสารใหม่",
      icon: "/logo2.png",
      badge: "/logo2.png",
      tag: "seven-smile-notification",
      data: data.url || "/",
      actions: [
        {
          action: "open",
          title: "เปิดดู",
          icon: "/logo2.png",
        },
        {
          action: "close",
          title: "ปิด",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || "Seven Smile Tour",
        options
      )
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const url = event.notification.data || "/";
    event.waitUntil(self.clients.openWindow(url));
  }
});

// =====================================
// ERROR HANDLING
// =====================================
self.addEventListener("error", (event) => {
  console.error("❌ Service Worker error:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("❌ Service Worker unhandled rejection:", event.reason);
});

// =====================================
// MESSAGE HANDLING
// =====================================
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log("📱 Service Worker: Loaded successfully");
