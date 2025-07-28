import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  optimizeDeps: {
    include: ['lit', 'lit/decorators.js'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Use modern Sass API
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `pao-design-system.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.woff2')) {
            return 'assets/fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
});
