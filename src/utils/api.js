// src/utils/api.js - Frontend API Client (แทน database.js)

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// HTTP Client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🌐 API Request: ${options.method || "GET"} ${url}`);

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log(`✅ API Success: ${data.count || "N/A"} records`);
      return { data: data.data, error: null, meta: data };
    } catch (error) {
      console.error(`❌ API Error: ${error.message}`);
      return { data: null, error: error.message, meta: null };
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: "GET",
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Tours API
export const toursApi = {
  // Get all tours or filter by destination
  getAll: async (params = {}) => {
    return apiClient.get("/tours", params);
  },

  // Get tour detail by slug and destination
  getDetail: async (destination, slug) => {
    return apiClient.get(`/tours/${destination}/${slug}`);
  },

  // Get featured tours
  getFeatured: async (limit = 6) => {
    return apiClient.get("/tours", { featured: "true", limit });
  },

  // Get tours by destination
  getByDestination: async (destination, limit = 10) => {
    return apiClient.get("/tours", { destination, limit });
  },
};

// Contact API
export const contactApi = {
  // Submit contact form
  submit: async (formData) => {
    return apiClient.post("/contact", formData);
  },

  // Submit group tour inquiry
  submitGroupTour: async (formData) => {
    return apiClient.post("/contact/group-tour", formData);
  },
};

// Gallery API
export const galleryApi = {
  // Get gallery images
  getAll: async (type = "all") => {
    return apiClient.get("/gallery", { type });
  },

  // Get domestic gallery
  getDomestic: async () => {
    return apiClient.get("/gallery", { type: "domestic" });
  },

  // Get international gallery
  getInternational: async () => {
    return apiClient.get("/gallery", { type: "international" });
  },
};

// Health check
export const healthApi = {
  check: async () => {
    return apiClient.get("/health");
  },
};

// Backward compatibility functions (ให้ code เดิมใช้ได้)
export const query = async (sql, params = []) => {
  console.warn(
    "🚨 Direct SQL queries are not supported in frontend. Use API endpoints instead."
  );
  return { data: null, error: "Direct SQL not supported in frontend" };
};

export const selectOne = async (table, where = {}) => {
  console.warn(
    "🚨 Direct database access not supported in frontend. Use specific API endpoints."
  );
  return { data: null, error: "Direct database access not supported" };
};

export const selectMany = async (table, options = {}) => {
  console.warn(
    "🚨 Direct database access not supported in frontend. Use specific API endpoints."
  );
  return { data: null, error: "Direct database access not supported" };
};

export const insertOne = async (table, data) => {
  console.warn(
    "🚨 Direct database access not supported in frontend. Use specific API endpoints."
  );
  return { data: null, error: "Direct database access not supported" };
};

// Test API connection
export const testApiConnection = async () => {
  try {
    const result = await healthApi.check();
    if (result.error) {
      console.error("❌ API connection test failed:", result.error);
      return false;
    } else {
      console.log("✅ API connection test successful");
      return true;
    }
  } catch (error) {
    console.error("❌ API connection test error:", error);
    return false;
  }
};

// Default export
export default apiClient;
