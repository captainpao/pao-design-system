import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonSize, ButtonVariant } from './pao-button';
import './pao-button';

interface ButtonStoryArgs {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  slot: string;
}

const meta = {
  title: 'Components/Button',
  component: 'pao-button',
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    slot: 'Button',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    slot: { control: 'text' },
  },
  render: (args: ButtonStoryArgs) => html`
    <pao-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    >${args.slot}</pao-button>
  `,
} as Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
