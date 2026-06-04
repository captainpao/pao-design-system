import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressVariant, ProgressSize } from './pao-progress';
import './pao-progress';

interface ProgressStoryArgs {
  value: number;
  max: number;
  variant: ProgressVariant;
  size: ProgressSize;
  indeterminate: boolean;
  label: string;
  showValue: boolean;
}

const meta = {
  title: 'Components/Progress',
  component: 'pao-progress',
  args: {
    value: 60,
    max: 100,
    variant: 'primary',
    size: 'md',
    indeterminate: false,
    label: 'Loading...',
    showValue: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number' } },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args: ProgressStoryArgs) => html`
    <pao-progress
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
      label=${args.label}
      ?showValue=${args.showValue}
      style="max-width: 400px"
    ></pao-progress>
  `,
} as Meta<ProgressStoryArgs>;

export default meta;
type Story = StoryObj<ProgressStoryArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { showValue: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-progress size="sm" value="60" label="Small"></pao-progress>
      <pao-progress size="md" value="60" label="Medium"></pao-progress>
      <pao-progress size="lg" value="60" label="Large"></pao-progress>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-progress variant="primary"   value="80" ?showValue=${true} label="Primary"></pao-progress>
      <pao-progress variant="secondary" value="65" ?showValue=${true} label="Secondary"></pao-progress>
      <pao-progress variant="success"   value="100" ?showValue=${true} label="Success"></pao-progress>
      <pao-progress variant="warning"   value="45" ?showValue=${true} label="Warning"></pao-progress>
      <pao-progress variant="danger"    value="20" ?showValue=${true} label="Danger"></pao-progress>
    </div>
  `,
};
