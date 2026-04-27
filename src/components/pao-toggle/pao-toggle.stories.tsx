import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToggleSize } from './pao-toggle';
import './pao-toggle';

interface ToggleStoryArgs {
  value: string;
  label: string;
  size: ToggleSize;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Toggle',
  component: 'pao-toggle',
  args: {
    value: 'option',
    label: 'Enable notifications',
    size: 'md',
    checked: false,
    disabled: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: ToggleStoryArgs) => html`
    <pao-toggle
      value=${args.value}
      label=${args.label}
      size=${args.size}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
    ></pao-toggle>
  `,
} as Meta<ToggleStoryArgs>;

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <pao-toggle size="sm" label="Small" value="sm"></pao-toggle>
      <pao-toggle size="md" label="Medium" value="md"></pao-toggle>
      <pao-toggle size="lg" label="Large" value="lg"></pao-toggle>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Accept terms', error: 'You must accept the terms to continue.' },
};

export const WithHelperText: Story = {
  args: { label: 'Marketing emails', helperText: 'We will only send relevant updates.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled toggle' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled and on' },
};
