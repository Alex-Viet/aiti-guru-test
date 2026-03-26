import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Вендоры разбиты на отдельные стабильные чанки
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('react-router')) return 'vendor-router'
            if (id.includes('@tanstack')) return 'vendor-query'
            if (id.includes('zustand')) return 'vendor-zustand'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (
              id.includes('react-hook-form') ||
              id.includes('@hookform') ||
              id.includes('zod')
            ) return 'vendor-forms'
            if (
              id.includes('lucide-react') ||
              id.includes('sonner') ||
              id.includes('class-variance-authority') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge')
            ) return 'vendor-ui'
          }
        },
      },
    },
  },
})
