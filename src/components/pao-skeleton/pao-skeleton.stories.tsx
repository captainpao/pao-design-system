import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SkeletonVariant } from './pao-skeleton';
import './pao-skeleton';

interface SkeletonStoryArgs {
  variant: SkeletonVariant;
  width: string;
  height: string;
  animated: boolean;
}

const meta = {
  title: 'Components/Skeleton',
  component: 'pao-skeleton',
  args: {
    variant: 'text',
    width: '100%',
    height: '',
    animated: true,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circle', 'rect'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    animated: { control: 'boolean' },
  },
  render: (args: SkeletonStoryArgs) => html`
    <pao-skeleton
      variant=${args.variant}
      width=${args.width}
      height=${args.height}
      ?animated=${args.animated}
    ></pao-skeleton>
  `,
} as Meta<SkeletonStoryArgs>;

export default meta;
type Story = StoryObj<SkeletonStoryArgs>;

export const Default: Story = {};

export const Circle: Story = {
  args: { variant: 'circle' },
};

export const Rect: Story = {
  args: { variant: 'rect', height: '120px' },
};

export const Static: Story = {
  args: { animated: false },
};

export const CardPlaceholder: Story = {
  render: () => html`
    <div style="max-width: 320px; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; flex-direction: column; gap: 0.75rem;">
      <pao-skeleton variant="rect" height="160px"></pao-skeleton>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <pao-skeleton variant="circle" height="40px" style="flex-shrink: 0;"></pao-skeleton>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <pao-skeleton variant="text" width="60%"></pao-skeleton>
          <pao-skeleton variant="text" width="40%"></pao-skeleton>
        </div>
      </div>
      <pao-skeleton variant="text"></pao-skeleton>
      <pao-skeleton variant="text"></pao-skeleton>
      <pao-skeleton variant="text" width="75%"></pao-skeleton>
    </div>
  `,
};
