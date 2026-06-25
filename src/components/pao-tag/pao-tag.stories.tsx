import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagVariant, TagSize } from './pao-tag';
import './pao-tag';

interface TagStoryArgs {
  variant: TagVariant;
  size: TagSize;
  removable: boolean;
  label: string;
}

const meta = {
  title: 'Components/Tag',
  component: 'pao-tag',
  args: {
    variant: 'neutral',
    size: 'md',
    removable: false,
    label: 'Tag',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
    },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
    removable: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args: TagStoryArgs) => html`
    <pao-tag
      variant=${args.variant}
      size=${args.size}
      ?removable=${args.removable}
    >${args.label}</pao-tag>
  `,
} as Meta<TagStoryArgs>;

export default meta;
type Story = StoryObj<TagStoryArgs>;

export const Default: Story = {};

export const Removable: Story = {
  args: { removable: true },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      <pao-tag variant="primary">Primary</pao-tag>
      <pao-tag variant="secondary">Secondary</pao-tag>
      <pao-tag variant="success">Success</pao-tag>
      <pao-tag variant="warning">Warning</pao-tag>
      <pao-tag variant="danger">Danger</pao-tag>
      <pao-tag variant="neutral">Neutral</pao-tag>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <pao-tag size="sm">Small</pao-tag>
      <pao-tag size="md">Medium</pao-tag>
    </div>
  `,
};

export const RemovableVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      <pao-tag variant="primary" ?removable=${true}>Primary</pao-tag>
      <pao-tag variant="success" ?removable=${true}>Success</pao-tag>
      <pao-tag variant="danger" ?removable=${true}>Danger</pao-tag>
      <pao-tag variant="neutral" ?removable=${true}>Neutral</pao-tag>
    </div>
  `,
};
