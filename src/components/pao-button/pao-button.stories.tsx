import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './pao-button';
import { PaoButton } from './pao-button';

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => html`
    <pao-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      @paoClick=${args.onClick}
    >
      ${args.slot}
    </pao-button>
  `,
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
} satisfies Meta<PaoButton>;

export default meta;
type Story = StoryObj<PaoButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    slot: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    slot: 'Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: false,
    slot: 'Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    slot: 'Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    slot: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    slot: 'Button',
  },
};
