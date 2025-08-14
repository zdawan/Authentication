import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { webcrypto } from "node:crypto";

// crypto.subtle.digest() instead of crypto.hash.
// Vite asks for crypto.hash, it’s actually using the Web Crypto API available in Node 21.
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
