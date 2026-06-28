import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './pao-pagination';

interface PaginationStoryArgs {
  total: number;
  pageSize: number;
  current: number;
  siblingCount: number;
  showEdges: boolean;
}

const meta = {
  title: 'Components/Pagination',
  component: 'pao-pagination',
  args: {
    total: 100,
    pageSize: 10,
    current: 5,
    siblingCount: 1,
    showEdges: false,
  },
  argTypes: {
    total: { control: { type: 'number' } },
    pageSize: { control: { type: 'number' } },
    current: { control: { type: 'number' } },
    siblingCount: { control: { type: 'number' } },
    showEdges: { control: 'boolean' },
  },
  render: (args: PaginationStoryArgs) => html`
    <pao-pagination
      .total=${args.total}
      .pageSize=${args.pageSize}
      .current=${args.current}
      .siblingCount=${args.siblingCount}
      ?showEdges=${args.showEdges}
    ></pao-pagination>
  `,
} as Meta<PaginationStoryArgs>;

export default meta;
type Story = StoryObj<PaginationStoryArgs>;

export const Default: Story = {};

export const ManyPages: Story = {
  args: { total: 200, current: 10 },
};

export const WithEdges: Story = {
  args: { showEdges: true, current: 5 },
};

export const NearStart: Story = {
  args: { current: 2 },
};

export const NearEnd: Story = {
  args: { current: 9 },
};
