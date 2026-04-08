import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // 本番環境（build時）のみリポジトリ名をベースパスに設定
  base: command === 'build' ? '/jvnpey-port/' : '/',
}))
