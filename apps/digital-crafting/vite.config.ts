import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ["!**/src/**"]
    }
  },
  resolve: {
    alias: {
      "@zoria-ui/react": path.resolve(__dirname, "../../packages/zoria/react/src"),
      "@zoria-ui/forms": path.resolve(__dirname, "../../packages/zoria/forms/src"),
      "@zoria-ui": path.resolve(__dirname, "../../packages/zoria/ui/src")
    }
  }
})
