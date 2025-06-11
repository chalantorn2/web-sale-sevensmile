import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build configuration สำหรับ production
  build: {
    // Output directory
    outDir: "dist",

    // Assets directory
    assetsDir: "assets",

    // Generate sourcemap (ปิดไว้ใน production เพื่อลดขนาด)
    sourcemap: false,

    // Minify options
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // ลบ console.log ใน production
        drop_debugger: true,
      },
    },

    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunks เพื่อ optimize loading
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: ["react-icons"],
          animations: ["framer-motion"],
        },

        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const extType = info[info.length - 1];

          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name].[hash][extname]`;
          }

          if (/\.(css)$/i.test(assetInfo.name)) {
            return `css/[name].[hash][extname]`;
          }

          return `assets/[name].[hash][extname]`;
        },

        // Chunk file naming
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
      },
    },

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1600,

    // ✅ Copy files from public directory
    copyPublicDir: true,
  },

  // 🎯 Public directory configuration
  publicDir: "public",

  // Server configuration สำหรับ development
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    open: true,
  },

  // Preview configuration
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: false,
  },

  // Base URL (ปรับตาม hosting environment)
  base: "/",

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-icons",
      "framer-motion",
    ],
  },

  // Environment variables prefix
  envPrefix: "VITE_",

  // esbuild options
  esbuild: {
    // Remove console.log in production
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },

  // ✅ Ensure all public files are copied
  assetsInclude: [
    "**/*.xml",
    "**/*.txt",
    "**/*.json",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
  ],
});
