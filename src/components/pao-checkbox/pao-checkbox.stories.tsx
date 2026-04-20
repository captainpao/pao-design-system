import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxSize } from './pao-checkbox';
import './pao-checkbox';

interface CheckboxStoryArgs {
  value: string;
  label: string;
  size: CheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Checkbox',
  component: 'pao-checkbox',
  args: {
    value: 'option',
    label: 'Accept terms and conditions',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: CheckboxStoryArgs) => html`
    <pao-checkbox
      value=${args.value}
      label=${args.label}
      size=${args.size}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
    ></pao-checkbox>
  `,
} as Meta<CheckboxStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all' },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <pao-checkbox size="sm" label="Small" value="sm"></pao-checkbox>
      <pao-checkbox size="md" label="Medium" value="md"></pao-checkbox>
      <pao-checkbox size="lg" label="Large" value="lg"></pao-checkbox>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Required field', error: 'This field is required.' },
};

export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'You can unsubscribe at any time.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled and checked' },
};
