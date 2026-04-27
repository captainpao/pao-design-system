import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalSize } from './pao-modal';
import './pao-modal';

interface ModalStoryArgs {
  open: boolean;
  title: string;
  dismissible: boolean;
  size: ModalSize;
}

const meta = {
  title: 'Components/Modal',
  component: 'pao-modal',
  args: {
    open: false,
    title: 'Modal Title',
    dismissible: true,
    size: 'md',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    open: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
  render: (args: ModalStoryArgs) => html`
    <div style="min-height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 2rem;">
      <pao-modal
        ?open=${args.open}
        title=${args.title}
        ?dismissible=${args.dismissible}
        size=${args.size}
      >
        <div style="padding: 1rem 0;">
          <p>Modal content goes here. You can put any HTML or components in this slot.</p>
          <p>Press <strong>Escape</strong>, click the backdrop, or use the close button to dismiss.</p>
        </div>
      </pao-modal>
      <p style="margin: 0; color: var(--pao-gray-600, #6c757d); font-size: 0.875rem;">Click the button below to open the modal</p>
      <button
        style="padding: 0.75rem 1.5rem; font-family: inherit; font-size: 1rem; font-weight: 500; border: none; border-radius: 6px; background: var(--pao-color-primary, #0d6efd); color: white; cursor: pointer; box-shadow: 0 2px 8px rgba(13,110,253,0.3);"
        @click=${(e: MouseEvent) => {
          const btn = e.target as HTMLElement;
          const modal = btn.parentElement?.querySelector('pao-modal') as any;
          modal?.showModal();
        }}
      >
        Open Modal
      </button>
    </div>
  `,
} as Meta<ModalStoryArgs>;

export default meta;
type Story = StoryObj<ModalStoryArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; min-height: 500px; padding: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-weight: 600;">Small (sm)</p>
        <pao-modal size="sm" title="Small Modal">
          <p>Compact modal for quick confirmations or short messages.</p>
        </pao-modal>
        <button
          style="padding: 0.5rem 1rem; font-family: inherit; font-size: 0.875rem; border: none; border-radius: 6px; background: var(--pao-color-primary, #0d6efd); color: white; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const btn = e.target as HTMLElement;
            const modal = btn.parentElement?.querySelector('pao-modal') as any;
            modal?.showModal();
          }}
        >Open Small</button>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-weight: 600;">Medium (md)</p>
        <pao-modal size="md" title="Medium Modal">
          <p>The default size works well for most use cases.</p>
        </pao-modal>
        <button
          style="padding: 0.5rem 1rem; font-family: inherit; font-size: 0.875rem; border: none; border-radius: 6px; background: var(--pao-color-primary, #0d6efd); color: white; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const btn = e.target as HTMLElement;
            const modal = btn.parentElement?.querySelector('pao-modal') as any;
            modal?.showModal();
          }}
        >Open Medium</button>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-weight: 600;">Large (lg)</p>
        <pao-modal size="lg" title="Large Modal">
          <p>Best suited for forms, detailed content, or data tables.</p>
        </pao-modal>
        <button
          style="padding: 0.5rem 1rem; font-family: inherit; font-size: 0.875rem; border: none; border-radius: 6px; background: var(--pao-color-primary, #0d6efd); color: white; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const btn = e.target as HTMLElement;
            const modal = btn.parentElement?.querySelector('pao-modal') as any;
            modal?.showModal();
          }}
        >Open Large</button>
      </div>
    </div>
  `,
};

export const NonDismissible: Story = {
  args: { dismissible: false, title: 'Important Notice', open: false },
  render: (args: ModalStoryArgs) => html`
    <div style="min-height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 2rem;">
      <pao-modal
        ?open=${args.open}
        title=${args.title}
        ?dismissible=${args.dismissible}
        size=${args.size}
      >
        <div style="padding: 1rem 0;">
          <p>This modal cannot be dismissed by clicking the backdrop or pressing Escape.</p>
          <p>Use the <strong>open</strong> control to toggle visibility.</p>
        </div>
      </pao-modal>
      <button
        style="padding: 0.75rem 1.5rem; font-family: inherit; font-size: 1rem; font-weight: 500; border: none; border-radius: 6px; background: var(--pao-color-primary, #0d6efd); color: white; cursor: pointer;"
        @click=${(e: MouseEvent) => {
          const btn = e.target as HTMLElement;
          const modal = btn.parentElement?.querySelector('pao-modal') as any;
          modal?.showModal();
        }}
      >
        Open Non-Dismissible Modal
      </button>
    </div>
  `,
};

export const WithSlottedContent: Story = {
  args: { title: 'Confirm Action', open: false },
  render: (args: ModalStoryArgs) => html`
    <div style="min-height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 2rem;">
      <pao-modal
        ?open=${args.open}
        title=${args.title}
        ?dismissible=${args.dismissible}
        size=${args.size}
      >
        <div style="padding: 1rem 0;">
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </div>
        <div slot="footer" style="display: flex; justify-content: flex-end; gap: 0.5rem; border-top: 1px solid var(--pao-border-color, #dee2e6); padding-top: 1rem;">
          <button style="padding: 0.5rem 1rem; border: 1px solid var(--pao-border-color, #dee2e6); border-radius: 6px; background: white; cursor: pointer;">Cancel</button>
          <button style="padding: 0.5rem 1rem; border: none; border-radius: 6px; background: var(--pao-color-danger, #dc3545); color: white; cursor: pointer;">Delete</button>
        </div>
      </pao-modal>
      <button
        style="padding: 0.75rem 1.5rem; font-family: inherit; font-size: 1rem; font-weight: 500; border: none; border-radius: 6px; background: var(--pao-color-danger, #dc3545); color: white; cursor: pointer; box-shadow: 0 2px 8px rgba(220,53,69,0.3);"
        @click=${(e: MouseEvent) => {
          const btn = e.target as HTMLElement;
          const modal = btn.parentElement?.querySelector('pao-modal') as any;
          modal?.showModal();
        }}
      >
        Delete Item
      </button>
    </div>
  `,
};

export const Closed: Story = {
  args: { open: false, title: 'Hidden Modal' },
};
