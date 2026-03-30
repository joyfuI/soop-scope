/// <reference types="vite-plugin-electron/electron-env" />
import type { ElectronApi } from './preload';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      APP_ROOT: string;
      VITE_PUBLIC: string;
    }
  }

  interface Window {
    electron: ElectronApi;
  }
}
