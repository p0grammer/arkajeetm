import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/')
          if (normalized.includes('/node_modules/@react-three/drei/')) return 'three-drei'
          if (normalized.includes('/node_modules/@react-three/fiber/')) return 'react-three-fiber'
          if (normalized.includes('/node_modules/three/')) return 'three-core'
        },
      },
    },
  },
})
