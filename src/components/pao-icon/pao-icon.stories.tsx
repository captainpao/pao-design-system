import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './pao-icon';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'pao-icon',
  argTypes: {
    name: {
      control: 'text',
      options: ['check', 'times', 'user'],
      description: 'FontAwesome icon name (e.g., check, times, user)',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon: sm, md, or lg',
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
      description: 'Color style for the icon',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    name: 'check',
    size: 'md',
    color: 'primary',
  },
  render: (args) => html`<pao-icon name=${args.name} size=${args.size} color=${args.color}></pao-icon>`,
};

export const Check: Story = {
  args: { name: 'check' },
  render: (args) => html`<pao-icon name=${args.name}></pao-icon>`,
};
export const Times: Story = {
  args: { name: 'times' },
  render: (args) => html`<pao-icon name=${args.name}></pao-icon>`,
};
export const User: Story = {
  args: { name: 'user' },
  render: (args) => html`<pao-icon name=${args.name}></pao-icon>`,
};

export const Small: Story = {
  args: { name: 'user', size: 'sm' },
  render: (args) => html`<pao-icon name=${args.name} size=${args.size}></pao-icon>`,
};
export const Medium: Story = {
  args: { name: 'user', size: 'md' },
  render: (args) => html`<pao-icon name=${args.name} size=${args.size}></pao-icon>`,
};
export const Large: Story = {
  args: { name: 'user', size: 'lg' },
  render: (args) => html`<pao-icon name=${args.name} size=${args.size}></pao-icon>`,
};

export const Success: Story = {
  args: { name: 'check', color: 'success' },
  render: (args) => html`<pao-icon name=${args.name} color=${args.color}></pao-icon>`,
};
export const Danger: Story = {
  args: { name: 'times', color: 'danger' },
  render: (args) => html`<pao-icon name=${args.name} color=${args.color}></pao-icon>`,
};
export const PrimaryColor: Story = {
  args: { name: 'user', color: 'primary' },
  render: (args) => html`<pao-icon name=${args.name} color=${args.color}></pao-icon>`,
}; 