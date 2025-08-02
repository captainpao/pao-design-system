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
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
      description: 'The visual and semantic variant of the button.',
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

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    slot: 'Tertiary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary buttons have minimal visual emphasis, useful for low-priority actions.',
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

export const Success: Story = {
  args: {
    variant: 'success',
    slot: 'Success Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success buttons indicate positive actions or confirmations.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    slot: 'Warning Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning buttons indicate caution or actions that require attention.',
      },
    },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    slot: 'Danger Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger buttons indicate destructive or high-risk actions.',
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

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <pao-button variant="primary">Primary</pao-button>
      <pao-button variant="secondary">Secondary</pao-button>
      <pao-button variant="tertiary">Tertiary</pao-button>
      <pao-button variant="success">Success</pao-button>
      <pao-button variant="warning">Warning</pao-button>
      <pao-button variant="danger">Danger</pao-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A showcase of all button variants.',
      },
    },
  },
};
