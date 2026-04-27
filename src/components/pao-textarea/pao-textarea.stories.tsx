import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaSize, TextareaResize } from './pao-textarea';
import './pao-textarea';

interface TextareaStoryArgs {
  value: string;
  placeholder: string;
  label: string;
  name: string;
  size: TextareaSize;
  resize: TextareaResize;
  error: string;
  helperText: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  rows: number;
  maxlength: number;
}

const meta = {
  title: 'Components/Textarea',
  component: 'pao-textarea',
  args: {
    value: '',
    placeholder: 'Enter text...',
    label: 'Description',
    name: 'description',
    size: 'md',
    resize: 'vertical',
    error: '',
    helperText: '',
    disabled: false,
    readonly: false,
    required: false,
    rows: 3,
    maxlength: 0,
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    resize: { control: { type: 'select' }, options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    maxlength: { control: { type: 'number', min: 0 } },
  },
  render: (args: TextareaStoryArgs) => html`
    <pao-textarea
      value=${args.value}
      placeholder=${args.placeholder}
      label=${args.label}
      name=${args.name}
      size=${args.size}
      resize=${args.resize}
      error=${args.error}
      helperText=${args.helperText}
      rows=${args.rows}
      maxlength=${args.maxlength}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
    ></pao-textarea>
  `,
} as Meta<TextareaStoryArgs>;

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Maximum 500 characters.' },
};

export const WithError: Story = {
  args: { label: 'Bio', error: 'Description is required.' },
};

export const WithCharacterCount: Story = {
  args: { label: 'Bio', maxlength: 200, helperText: '' },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <pao-textarea size="sm" label="Small" placeholder="Small textarea" rows=${3}></pao-textarea>
      <pao-textarea size="md" label="Medium" placeholder="Medium textarea" rows=${3}></pao-textarea>
      <pao-textarea size="lg" label="Large" placeholder="Large textarea" rows=${3}></pao-textarea>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true, value: 'This content cannot be edited.' },
};

export const Readonly: Story = {
  args: { readonly: true, value: 'This content is read-only.' },
};

export const ResizeNone: Story = {
  args: { resize: 'none', label: 'Fixed height', helperText: 'This textarea cannot be resized.' },
};
