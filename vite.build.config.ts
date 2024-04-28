import {fileURLToPath, URL } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  define: {
    __DEV__: false,
  },
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('lib', import.meta.url)),
      'axii-ui': fileURLToPath(new URL('node_modules/axii-ui/src/index.ts', import.meta.url)),
    }
  },
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        init: resolve(__dirname, 'init.html'),
        prompt: resolve(__dirname, 'prompt.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
}
