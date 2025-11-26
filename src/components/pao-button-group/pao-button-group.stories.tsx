import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { SelectionType, ButtonProps } from './pao-button-group';
import { ButtonSize } from '../pao-button/pao-button';
import './pao-button-group';
import '../pao-button/pao-button';

interface ButtonGroupStoryArgs {
  buttons: ButtonProps[];
  className?: string;
  pillShape: boolean;

  size: ButtonSize;
  selectionType: SelectionType;
  active: number[];
  defaultActive: number[];
}

const meta = {
  title: 'Components/Button Group',
  component: 'pao-button-group',
  args: {
    buttons: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
    ],
    pillShape: false,
    size: 'md',
    selectionType: 'single',
    active: [],
    defaultActive: [0],
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button group component that allows grouping multiple buttons with single or multiple selection modes.',
      },
    },
  },
  argTypes: {
    buttons: {
      control: 'object',
      description: 'Array of button props for each button in the group.',
      table: {
        type: { summary: 'ButtonProps[]' },
        defaultValue: { summary: '[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the group container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    pillShape: {
      control: 'boolean',
      description: 'Whether to apply pill shape (rounded corners) to the group.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm'],
      description: 'Size for all buttons.',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
    },
    selectionType: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Single or multiple selection mode.',
      table: {
        type: { summary: 'SelectionType' },
        defaultValue: { summary: 'single' },
      },
    },
    active: {
      control: 'object',
      description: '(Controlled) Indexes of active buttons.',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    defaultActive: {
      control: 'object',
      description: '(Uncontrolled) Initial indexes of active buttons.',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  render: (args: ButtonGroupStoryArgs) => html`
    <pao-button-group
      .buttons=${args.buttons}
      .className=${args.className}
      ?pillShape=${args.pillShape}
      size=${args.size}
      selectionType=${args.selectionType}
      .active=${args.active}
      .defaultActive=${args.defaultActive}
      @pao-selection-change=${(e: CustomEvent) => {
      console.log('Selection changed:', e.detail);
    }}
    ></pao-button-group>
  `,
} as Meta<ButtonGroupStoryArgs>;

export default meta;
type Story = StoryObj<ButtonGroupStoryArgs>;

export const Primary: Story = {
  args: {
    buttons: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
    ],
    defaultActive: [0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button group with outline style and single selection mode.',
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    buttons: [
      { label: 'Bold' },
      { label: 'Italic' },
      { label: 'Underline' },
    ],
    selectionType: 'multiple',
    defaultActive: [0, 2],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with multiple selection mode - allows selecting multiple buttons simultaneously.',
      },
    },
  },
};

export const Pill: Story = {
  args: {
    pillShape: true,
    defaultActive: [1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with pill shape (fully rounded corners).',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    defaultActive: [0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Small sized button group for compact interfaces.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    defaultActive: [0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Large sized button group for prominent placement.',
      },
    },
  },
};



export const WithDisabled: Story = {
  args: {
    buttons: [
      { label: 'Enabled' },
      { label: 'Disabled', disabled: true },
      { label: 'Enabled' },
    ],
    defaultActive: [0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with some disabled buttons.',
      },
    },
  },
};

export const Mixed: Story = {
  args: {
    buttons: [
      { label: 'Success', variant: 'success' },
      { label: 'Warning', variant: 'warning' },
      { label: 'Danger', variant: 'danger' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with mixed button variants - each button can have its own variant.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    buttons: [
      { label: 'Save', variant: 'success' },
      { label: 'Submit', variant: 'success' },
      { label: 'Confirm', variant: 'success' },
    ],
    defaultActive: [0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Success variant button group for positive actions.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    buttons: [
      { label: 'Caution', variant: 'warning' },
      { label: 'Review', variant: 'warning' },
      { label: 'Alert', variant: 'warning' },
    ],
    defaultActive: [1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant button group.',
      },
    },
  },
};

export const Danger: Story = {
  args: {
    buttons: [
      { label: 'Delete', variant: 'danger' },
      { label: 'Remove', variant: 'danger' },
      { label: 'Clear', variant: 'danger' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger variant button group for destructive actions.',
      },
    },
  },
};
