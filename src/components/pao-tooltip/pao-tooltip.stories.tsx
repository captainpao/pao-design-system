import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TooltipPosition } from './pao-tooltip';
import './pao-tooltip';

interface TooltipStoryArgs {
  content: string;
  position: TooltipPosition;
  disabled: boolean;
  delay: number;
  open: boolean;
}

const meta = {
  title: 'Components/Tooltip',
  component: 'pao-tooltip',
  args: {
    content: 'This is a tooltip',
    position: 'top',
    disabled: false,
    delay: 0,
    open: true,
  },
  argTypes: {
    position: { control: { type: 'select' }, options: ['top', 'bottom', 'left', 'right'] },
    disabled: { control: 'boolean' },
    delay: { control: { type: 'number', min: 0, step: 100 } },
    open: { control: 'boolean' },
    content: { control: 'text' },
  },
  render: (args: TooltipStoryArgs) => html`
    <pao-tooltip
      content=${args.content}
      position=${args.position}
      ?disabled=${args.disabled}
      delay=${args.delay}
      ?open=${args.open}
    >
      <span style="border-bottom: 1px dashed var(--pao-color-primary, #0d6efd); cursor: help; padding: 0.25rem;">
        Hover or focus me
      </span>
    </pao-tooltip>
  `,
} as Meta<TooltipStoryArgs>;

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; justify-content: center; padding: 3rem 1rem;">
      <pao-tooltip open position="top" content="Tooltip on top">
        <span style="border-bottom: 1px dashed #0d6efd; cursor: help;">Top</span>
      </pao-tooltip>
      <pao-tooltip open position="bottom" content="Tooltip on bottom">
        <span style="border-bottom: 1px dashed #0d6efd; cursor: help;">Bottom</span>
      </pao-tooltip>
      <pao-tooltip open position="left" content="Tooltip on left">
        <span style="border-bottom: 1px dashed #0d6efd; cursor: help;">Left</span>
      </pao-tooltip>
      <pao-tooltip open position="right" content="Tooltip on right">
        <span style="border-bottom: 1px dashed #0d6efd; cursor: help;">Right</span>
      </pao-tooltip>
    </div>
  `,
};

export const WithDelay: Story = {
  args: { delay: 500, content: 'Appears after 500ms delay' },
};

export const Disabled: Story = {
  args: { disabled: true, content: 'This tooltip is disabled' },
};

export const HoverToSee: Story = {
  args: { open: false, content: 'Hover over the text to see me!' },
};
