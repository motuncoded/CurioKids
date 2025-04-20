import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: "/CurioKids/",
  plugins: [
    react(),
  ],
});
