import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectSize } from './pao-select';
import './pao-select';
import '../pao-select-option/pao-select-option';

interface SelectStoryArgs {
  label: string;
  placeholder: string;
  size: SelectSize;
  multiple: boolean;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Select',
  component: 'pao-select',
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    size: 'md',
    multiple: false,
    disabled: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: SelectStoryArgs) => html`
    <pao-select
      label=${args.label}
      placeholder=${args.placeholder}
      size=${args.size}
      ?multiple=${args.multiple}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
      style="max-width: 320px"
    >
      <pao-select-option value="au">Australia</pao-select-option>
      <pao-select-option value="ca">Canada</pao-select-option>
      <pao-select-option value="fr">France</pao-select-option>
      <pao-select-option value="de">Germany</pao-select-option>
      <pao-select-option value="jp">Japan</pao-select-option>
      <pao-select-option value="gb">United Kingdom</pao-select-option>
      <pao-select-option value="us">United States</pao-select-option>
    </pao-select>
  `,
} as Meta<SelectStoryArgs>;

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Default: Story = {};

export const MultiSelect: Story = {
  render: () => html`
    <pao-select label="Skills" placeholder="Select skills..." multiple style="max-width: 320px">
      <pao-select-option value="ts">TypeScript</pao-select-option>
      <pao-select-option value="react">React</pao-select-option>
      <pao-select-option value="vue">Vue</pao-select-option>
      <pao-select-option value="lit">Lit</pao-select-option>
      <pao-select-option value="node">Node.js</pao-select-option>
    </pao-select>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <pao-select size="sm" label="Small" placeholder="Small select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
      <pao-select size="md" label="Medium" placeholder="Medium select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
      <pao-select size="lg" label="Large" placeholder="Large select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Country', error: 'Please select a country.' },
};

export const WithHelperText: Story = {
  args: { label: 'Country', helperText: 'Select the country you reside in.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled Select' },
};

export const WithDisabledOption: Story = {
  render: () => html`
    <pao-select label="Role" placeholder="Select a role..." style="max-width: 320px">
      <pao-select-option value="admin">Admin</pao-select-option>
      <pao-select-option value="editor">Editor</pao-select-option>
      <pao-select-option value="viewer" disabled>Viewer (unavailable)</pao-select-option>
    </pao-select>
  `,
};
