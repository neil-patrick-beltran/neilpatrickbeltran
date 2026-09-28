import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repositoryName = 'neilpatrickbeltran'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${repositoryName}/` : '/',
}))
