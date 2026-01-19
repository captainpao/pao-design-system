import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: '\u003cdiv class="pao-brand-container"\u003e\u003cimg src="/pao.png" class="pao-brand-image" alt="Pao Design System" /\u003e\u003cspan class="pao-brand-text"\u003ePao Design System\u003c/span\u003e\u003c/div\u003e',
  brandUrl: './',
  // Remove brandImage since we're using HTML in brandTitle
});

addons.setConfig({
  theme,
});