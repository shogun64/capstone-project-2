import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true
      }
    }
  }
})

/*server: {proxy: {
      // Proxy all requests except for files that actually exist in /public or /src
      '^/(?!@vite|src|node_modules|assets|favicon).*': {target: "http://localhost:5555", changeOrigin: true}}}*/