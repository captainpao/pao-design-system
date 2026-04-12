import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputSize, InputType } from './pao-input';
import './pao-input';

interface InputStoryArgs {
  type: InputType;
  value: string;
  placeholder: string;
  label: string;
  size: InputSize;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Input',
  component: 'pao-input',
  args: {
    type: 'text',
    value: '',
    placeholder: 'Enter text...',
    label: 'Label',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
  render: (args: InputStoryArgs) => html`
    <pao-input
      type=${args.type}
      value=${args.value}
      placeholder=${args.placeholder}
      label=${args.label}
      size=${args.size}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
      style="max-width: 400px"
    ></pao-input>
  `,
} as Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Full Name', placeholder: 'John Doe' },
};

export const Required: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
};

export const WithHelperText: Story = {
  args: { label: 'Username', helperText: 'Must be 3–20 characters, letters and numbers only.' },
};

export const WithError: Story = {
  args: { label: 'Email', value: 'notanemail', error: 'Please enter a valid email address.' },
};

export const Disabled: Story = {
  args: { label: 'Disabled Input', value: 'Cannot edit this', disabled: true },
};

export const Readonly: Story = {
  args: { label: 'Read-only', value: 'Read-only value', readonly: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-input size="sm" label="Small" placeholder="Small input"></pao-input>
      <pao-input size="md" label="Medium" placeholder="Medium input"></pao-input>
      <pao-input size="lg" label="Large" placeholder="Large input"></pao-input>
    </div>
  `,
};

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
};
