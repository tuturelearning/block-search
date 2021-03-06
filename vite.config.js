import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base: process.env.BASE_URL || '/',
            title: envMap.VITE_APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      port: process.env.BLOCKLET_PORT,
    },
  });
};
