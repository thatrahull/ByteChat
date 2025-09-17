import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,    // allow access from any browser/device
    port: 3000,
    open: true,    // auto open browser
    proxy: {
      "/api": {
        target: "http://localhost:5001", // backend server
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
