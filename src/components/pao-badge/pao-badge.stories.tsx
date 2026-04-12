import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeSize, BadgeVariant } from './pao-badge';
import './pao-badge';

interface BadgeStoryArgs {
  variant: BadgeVariant;
  size: BadgeSize;
  pill: boolean;
  outline: boolean;
  slot: string;
}

const meta = {
  title: 'Components/Badge',
  component: 'pao-badge',
  args: {
    variant: 'primary',
    size: 'md',
    pill: false,
    outline: false,
    slot: 'Badge',
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    pill: { control: 'boolean' },
    outline: { control: 'boolean' },
    slot: { control: 'text' },
  },
  render: (args: BadgeStoryArgs) => html`
    <pao-badge
      variant=${args.variant}
      size=${args.size}
      ?pill=${args.pill}
      ?outline=${args.outline}
    >${args.slot}</pao-badge>
  `,
} as Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <pao-badge variant="primary">Primary</pao-badge>
      <pao-badge variant="secondary">Secondary</pao-badge>
      <pao-badge variant="success">Success</pao-badge>
      <pao-badge variant="warning">Warning</pao-badge>
      <pao-badge variant="danger">Danger</pao-badge>
      <pao-badge variant="info">Info</pao-badge>
    </div>
  `,
};

export const OutlineVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <pao-badge variant="primary" outline>Primary</pao-badge>
      <pao-badge variant="secondary" outline>Secondary</pao-badge>
      <pao-badge variant="success" outline>Success</pao-badge>
      <pao-badge variant="warning" outline>Warning</pao-badge>
      <pao-badge variant="danger" outline>Danger</pao-badge>
      <pao-badge variant="info" outline>Info</pao-badge>
    </div>
  `,
};

export const PillShape: Story = {
  args: { pill: true, slot: 'New' },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <pao-badge size="sm">Small</pao-badge>
      <pao-badge size="md">Medium</pao-badge>
      <pao-badge size="lg">Large</pao-badge>
    </div>
  `,
};
