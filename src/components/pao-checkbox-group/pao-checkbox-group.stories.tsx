import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxGroupOrientation } from './pao-checkbox-group';
import './pao-checkbox-group';
import '../pao-checkbox/pao-checkbox';

interface CheckboxGroupStoryArgs {
  name: string;
  label: string;
  disabled: boolean;
  error: string;
  helperText: string;
  orientation: CheckboxGroupOrientation;
}

const meta = {
  title: 'Components/CheckboxGroup',
  component: 'pao-checkbox-group',
  args: {
    name: 'fruits',
    label: 'Favourite Fruits',
    disabled: false,
    error: '',
    helperText: '',
    orientation: 'vertical',
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: CheckboxGroupStoryArgs) => html`
    <pao-checkbox-group
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      error=${args.error}
      helperText=${args.helperText}
      orientation=${args.orientation}
    >
      <pao-checkbox value="apple" label="Apple"></pao-checkbox>
      <pao-checkbox value="banana" label="Banana"></pao-checkbox>
      <pao-checkbox value="cherry" label="Cherry"></pao-checkbox>
    </pao-checkbox-group>
  `,
} as Meta<CheckboxGroupStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxGroupStoryArgs>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const WithError: Story = {
  args: { error: 'Please select at least one option.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Select all that apply.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
