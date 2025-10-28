import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../.storybook/public'],
  core: {
    disableTelemetry: true
  },
  typescript: {
    check: true
  },
  features: {
    // storyStoreV7 is enabled by default in Storybook 8
  },
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        include: ['lit', 'lit/decorators.js']
      },
      build: {
        sourcemap: true,
        target: 'esnext'
      }
    };
  }
};

export default config;
