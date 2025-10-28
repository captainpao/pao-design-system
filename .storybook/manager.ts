import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Pao Design System',
  brandUrl: './',
  brandImage: '/pao.png', // This removes the default Storybook logo
});

addons.setConfig({
  theme,
});