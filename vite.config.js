import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Cambia 'build' a 'dist' o el nombre que prefieras
  },
 rollupOptions: {
      input: {
        main: 'src/main.js', // Asegúrate de que los entry points sean correctos
      },
    },
  
})
