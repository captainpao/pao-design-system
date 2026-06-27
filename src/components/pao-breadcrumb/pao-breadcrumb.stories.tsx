import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './pao-breadcrumb';

interface BreadcrumbStoryArgs {
  separator: string;
}

const meta = {
  title: 'Components/Breadcrumb',
  component: 'pao-breadcrumb',
  args: {
    separator: '/',
  },
  argTypes: {
    separator: { control: 'text' },
  },
  render: (args: BreadcrumbStoryArgs) => html`
    <pao-breadcrumb separator=${args.separator}>
      <a href="#">Home</a>
      <a href="#">Products</a>
      <span aria-current="page">Widgets</span>
    </pao-breadcrumb>
  `,
} as Meta<BreadcrumbStoryArgs>;

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

export const Default: Story = {};

export const CustomSeparator: Story = {
  args: { separator: '›' },
};
