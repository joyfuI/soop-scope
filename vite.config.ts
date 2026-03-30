import path from 'node:path';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    electron({
      main: { entry: 'electron/main.ts' },
      preload: { input: path.join(__dirname, 'electron/preload.ts') },
    }),
  ],
});
