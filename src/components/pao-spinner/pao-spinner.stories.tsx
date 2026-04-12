import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SpinnerSize, SpinnerVariant } from './pao-spinner';
import './pao-spinner';

interface SpinnerStoryArgs {
  size: SpinnerSize;
  variant: SpinnerVariant;
  label: string;
}

const meta = {
  title: 'Components/Spinner',
  component: 'pao-spinner',
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading...',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger', 'light'] },
    label: { control: 'text' },
  },
  render: (args: SpinnerStoryArgs) => html`
    <pao-spinner
      size=${args.size}
      variant=${args.variant}
      label=${args.label}
    ></pao-spinner>
  `,
} as Meta<SpinnerStoryArgs>;

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <pao-spinner size="sm"></pao-spinner>
      <pao-spinner size="md"></pao-spinner>
      <pao-spinner size="lg"></pao-spinner>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
      <pao-spinner variant="primary"></pao-spinner>
      <pao-spinner variant="secondary"></pao-spinner>
      <pao-spinner variant="success"></pao-spinner>
      <pao-spinner variant="warning"></pao-spinner>
      <pao-spinner variant="danger"></pao-spinner>
      <div style="background: #212529; padding: 0.5rem; border-radius: 4px;">
        <pao-spinner variant="light"></pao-spinner>
      </div>
    </div>
  `,
};

export const WithLoadingText: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <pao-spinner size="sm" variant="primary"></pao-spinner>
      <span style="font-family: system-ui; font-size: 0.875rem; color: #495057;">Loading data...</span>
    </div>
  `,
};
