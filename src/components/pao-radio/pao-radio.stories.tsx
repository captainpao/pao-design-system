import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioSize } from './pao-radio';
import './pao-radio';

interface RadioStoryArgs {
  value: string;
  label: string;
  size: RadioSize;
  checked: boolean;
  disabled: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Radio',
  component: 'pao-radio',
  args: {
    value: 'option',
    label: 'Select this option',
    size: 'md',
    checked: false,
    disabled: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: RadioStoryArgs) => html`
    <pao-radio
      value=${args.value}
      label=${args.label}
      size=${args.size}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      error=${args.error}
      helperText=${args.helperText}
    ></pao-radio>
  `,
} as Meta<RadioStoryArgs>;

export default meta;
type Story = StoryObj<RadioStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <pao-radio size="sm" label="Small" value="sm"></pao-radio>
      <pao-radio size="md" label="Medium" value="md"></pao-radio>
      <pao-radio size="lg" label="Large" value="lg"></pao-radio>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Required selection', error: 'Please select an option.' },
};

export const WithHelperText: Story = {
  args: { label: 'Preferred plan', helperText: 'You can change this later.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled radio' },
};
