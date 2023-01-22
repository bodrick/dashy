import { defineConfig } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue2';
import content from '@originjs/vite-plugin-content';
import { fileURLToPath } from 'node:url';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';
import packageJson from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get current version
process.env.VITE_APP_VERSION = packageJson.version;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [vue(), content(), createSvgPlugin()],
  server: {
    open: true,
  },
});
