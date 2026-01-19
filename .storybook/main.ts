import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
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
  managerHead: (head) => `\n${head}
\u003cstyle\u003e
  /* Custom styling for brand container */
  .pao-brand-container {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 8px 0 !important;
  }

  /* Make logo smaller */
  .pao-brand-image {
    width: 32px !important;
    height: 32px !important;
    flex-shrink: 0 !important;
  }

  /* Style for "Pao Design System" text */
  .pao-brand-text {
    font-size: 16px !important;
    font-weight: 500 !important;
    color: #333 !important;
    white-space: nowrap !important;
  }

  /* Override any existing sidebar header styling */
  .sidebar-header a[href="./"] {
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
  }
\u003c/style\u003e\n`,
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
