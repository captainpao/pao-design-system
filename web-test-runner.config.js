import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  rootDir: './',
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
  ],
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
};