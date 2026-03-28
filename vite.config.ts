import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: { port: 5173, strictPort: true },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
