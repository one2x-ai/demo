import {fileURLToPath, URL } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  define: {
    __DEV__: true,
  },
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('lib', import.meta.url)),
      'axii-ui': fileURLToPath(new URL('node_modules/axii-ui/src/index.ts', import.meta.url)),
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [tsconfigPaths()],
}
