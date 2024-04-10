import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:3300',
        changeOrigin: true
      }
    }
  },
})
