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
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component built with Web Components and Lit.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style variant of the button.',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button.',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the button is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    slot: { 
      control: 'text',
      description: 'The text content of the button.',
      table: {
        type: { summary: 'string' },
      },
    },
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
    slot: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons are high-emphasis buttons that draw attention to important actions.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    slot: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons are medium-emphasis buttons that complement primary actions.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    slot: 'Ghost Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost buttons have minimal visual emphasis, useful for tertiary actions.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    slot: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small buttons are useful for compact UIs and inline actions.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    slot: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large buttons are useful for hero sections or when you want to emphasize an action.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    slot: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons indicate that an action is not currently available.',
      },
    },
  },
};
