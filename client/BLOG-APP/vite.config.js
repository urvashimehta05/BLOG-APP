import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    },
    cors: {
      origin: 'http://localhost:5173',
      credentials: true, // ✅ CRITICAL: enable cookies/sessions
    }
  }
});


