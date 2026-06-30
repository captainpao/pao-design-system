import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './pao-menu';
import '../pao-menu-item/pao-menu-item';
import '../pao-button/pao-button';

interface MenuStoryArgs {
  open: boolean;
  placement: 'bottom-start' | 'bottom-end';
}

const meta = {
  title: 'Components/Menu',
  component: 'pao-menu',
  args: {
    open: false,
    placement: 'bottom-start',
  },
  argTypes: {
    open: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end'],
    },
  },
  render: (args: MenuStoryArgs) => html`
    <pao-menu ?open=${args.open} placement=${args.placement} style="margin: 2rem;">
      <pao-button slot="trigger" variant="secondary">Actions ▾</pao-button>
      <pao-menu-item value="edit" label="Edit">Edit</pao-menu-item>
      <pao-menu-item value="duplicate" label="Duplicate">Duplicate</pao-menu-item>
      <pao-menu-item value="archive" label="Archive">Archive</pao-menu-item>
      <pao-menu-item value="delete" label="Delete" ?disabled=${true}>Delete (disabled)</pao-menu-item>
    </pao-menu>
  `,
} as Meta<MenuStoryArgs>;

export default meta;
type Story = StoryObj<MenuStoryArgs>;

export const Default: Story = {};

export const OpenByDefault: Story = {
  args: { open: true },
};

export const BottomEnd: Story = {
  args: { placement: 'bottom-end' },
  render: () => html`
    <div style="display: flex; justify-content: flex-end; margin: 2rem;">
      <pao-menu placement="bottom-end">
        <pao-button slot="trigger" variant="secondary">Options ▾</pao-button>
        <pao-menu-item value="settings" label="Settings">Settings</pao-menu-item>
        <pao-menu-item value="profile" label="Profile">Profile</pao-menu-item>
        <pao-menu-item value="logout" label="Logout">Logout</pao-menu-item>
      </pao-menu>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <pao-menu style="margin: 2rem;">
      <pao-button slot="trigger" variant="primary">File ▾</pao-button>
      <pao-menu-item value="new" label="New">New</pao-menu-item>
      <pao-menu-item value="open" label="Open">Open</pao-menu-item>
      <pao-menu-item value="save" label="Save">Save</pao-menu-item>
      <pao-menu-item value="export" label="Export" ?disabled=${true}>Export (disabled)</pao-menu-item>
      <pao-menu-item value="print" label="Print" ?disabled=${true}>Print (disabled)</pao-menu-item>
    </pao-menu>
  `,
};
