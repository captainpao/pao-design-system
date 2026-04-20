import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupOrientation } from './pao-radio-group';
import './pao-radio-group';
import '../pao-radio/pao-radio';

interface RadioGroupStoryArgs {
  name: string;
  label: string;
  disabled: boolean;
  error: string;
  helperText: string;
  orientation: RadioGroupOrientation;
}

const meta = {
  title: 'Components/RadioGroup',
  component: 'pao-radio-group',
  args: {
    name: 'plan',
    label: 'Select a Plan',
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
  render: (args: RadioGroupStoryArgs) => html`
    <pao-radio-group
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      error=${args.error}
      helperText=${args.helperText}
      orientation=${args.orientation}
    >
      <pao-radio value="free" label="Free"></pao-radio>
      <pao-radio value="pro" label="Pro"></pao-radio>
      <pao-radio value="enterprise" label="Enterprise"></pao-radio>
    </pao-radio-group>
  `,
} as Meta<RadioGroupStoryArgs>;

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const WithError: Story = {
  args: { error: 'Please select a plan.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'You can upgrade or downgrade at any time.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
