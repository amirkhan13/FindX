import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': 'https://findx-zvqm.onrender.com', // used only in dev mode
    },
  },
  define: {
    __API_URL__: JSON.stringify(
      mode === 'development'
        ? '/api/v1' // local dev proxy
        : 'https://findx-zvqm.onrender.com/api/v1' // production backend
    ),
  },
}))
