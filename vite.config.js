import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    host: "local.dev",
    port: 8888,
  },
  plugins: [mkcert()]
  // esbuild: {
  //   drop: ['debugger'],
  //   pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace'],
  // },
});
