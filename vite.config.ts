import path from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const ignore = [
  path.join(projectRoot, 'release'),
  path.join(projectRoot, 'soop-scope'),
];

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
  server: {
    watch: {
      ignored: (watchedPath) => {
        const absolutePath = path.isAbsolute(watchedPath)
          ? watchedPath
          : path.resolve(projectRoot, watchedPath);
        return ignore.some((directory) => {
          const relativePath = path.relative(directory, absolutePath);
          return (
            relativePath === '' ||
            (relativePath !== '..' &&
              !relativePath.startsWith(`..${path.sep}`) &&
              !path.isAbsolute(relativePath))
          );
        });
      },
    },
  },
});
