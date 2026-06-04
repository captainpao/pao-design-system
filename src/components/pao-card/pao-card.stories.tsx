import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './pao-card';

interface CardStoryArgs {
  shadow: boolean;
  padded: boolean;
}

const meta = {
  title: 'Components/Card',
  component: 'pao-card',
  args: {
    shadow: false,
    padded: true,
  },
  argTypes: {
    shadow: { control: 'boolean' },
    padded: { control: 'boolean' },
  },
  render: (args: CardStoryArgs) => html`
    <pao-card ?shadow=${args.shadow} ?padded=${args.padded} style="max-width: 400px;">
      <span slot="header">Card Title</span>
      <p style="margin: 0; font-family: system-ui; font-size: 0.9rem; color: #495057;">
        This is the card body content. It can contain any HTML elements.
      </p>
      <div slot="footer" style="display: flex; gap: 0.5rem;">
        <button style="padding: 0.375rem 0.875rem; background: var(--pao-color-primary, #007bff); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">Save</button>
        <button style="padding: 0.375rem 0.875rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">Cancel</button>
      </div>
    </pao-card>
  `,
} as Meta<CardStoryArgs>;

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {};

export const WithShadow: Story = {
  args: { shadow: true },
};

export const HeaderOnly: Story = {
  render: () => html`
    <pao-card style="max-width: 400px;">
      <span slot="header">Header Only</span>
      <p style="margin: 0; font-family: system-ui;">Card body with no footer slot.</p>
    </pao-card>
  `,
};

export const BodyOnly: Story = {
  render: () => html`
    <pao-card style="max-width: 400px;">
      <p style="margin: 0; font-family: system-ui;">A simple card with body content only — no header or footer.</p>
    </pao-card>
  `,
};

export const Unpadded: Story = {
  args: { padded: false },
  render: () => html`
    <pao-card ?padded=${false} style="max-width: 400px;">
      <div style="background: var(--pao-color-primary, #007bff); height: 120px; display: flex; align-items: center; justify-content: center; color: white; font-family: system-ui; font-size: 0.875rem;">
        Full-bleed content area
      </div>
      <div style="padding: 1rem; font-family: system-ui;">
        <strong>Custom padding</strong>
        <p style="margin: 0.5rem 0 0; color: #6c757d; font-size: 0.875rem;">You control the padding within the body.</p>
      </div>
    </pao-card>
  `,
};
