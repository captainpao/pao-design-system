import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ButtonGroupType, ButtonGroupStyleType, SelectionType, ButtonProps } from './pao-button-group';
import { ButtonSize } from '../pao-button/pao-button';
import './pao-button-group';
import '../pao-button/pao-button';

interface ButtonGroupStoryArgs {
  buttons: ButtonProps[];
  className?: string;
  roundedCorners: boolean;
  type: ButtonGroupType;
  styleType: ButtonGroupStyleType;
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
    roundedCorners: false,
    type: 'primary',
    styleType: 'outline',
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
    roundedCorners: {
      control: 'boolean',
      description: 'Whether to apply rounded corners to the first/last button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'mixed'],
      description: 'Type (color) for all buttons, or use "mixed" for per-button types.',
      table: {
        type: { summary: 'ButtonGroupType' },
        defaultValue: { summary: 'primary' },
      },
    },
    styleType: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
      description: 'Style for all buttons (solid/outline).',
      table: {
        type: { summary: 'ButtonGroupStyleType' },
        defaultValue: { summary: 'outline' },
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
      .roundedCorners=${args.roundedCorners}
      .type=${args.type}
      .styleType=${args.styleType}
      .size=${args.size}
      .selectionType=${args.selectionType}
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
    type: 'primary',
    styleType: 'outline',
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
    styleType: 'outline',  
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

export const Rounded: Story = {
  args: {
    roundedCorners: true,
    styleType: 'solid',
    type: 'primary',
    defaultActive: [1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with rounded corners on the first and last buttons.',
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

export const Solid: Story = {
  args: {
    styleType: 'solid',
    type: 'secondary',
    defaultActive: [1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with solid (filled) style buttons.',
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
      { label: 'Success', type: 'success' },
      { label: 'Warning', type: 'warning' },
      { label: 'Danger', type: 'danger' },
    ],
    type: 'mixed',
    styleType: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with mixed button types - each button can have its own color type.',
      },
    },
  },
};