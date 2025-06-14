import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],


  server: {
    proxy: {
      // je api endpoint dia start hobe seta bujia diar jonno
      '/api/': {
        //target: 'http://localhost:5000',
        target: 'https://mern-task-manager-maom.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  },

})


