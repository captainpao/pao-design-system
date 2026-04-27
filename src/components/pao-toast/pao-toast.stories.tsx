import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastVariant } from './pao-toast';
import './pao-toast';

interface ToastStoryArgs {
  variant: ToastVariant;
  title: string;
  message: string;
  open: boolean;
  dismissible: boolean;
  duration: number;
}

const meta = {
  title: 'Components/Toast',
  component: 'pao-toast',
  args: {
    variant: 'primary',
    title: '',
    message: 'This is a notification message.',
    open: true,
    dismissible: true,
    duration: 0,
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] },
    open: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    duration: { control: { type: 'number', min: 0, step: 500 } },
  },
  render: (args: ToastStoryArgs) => html`
    <pao-toast
      variant=${args.variant}
      title=${args.title}
      message=${args.message}
      ?open=${args.open}
      ?dismissible=${args.dismissible}
      duration=${args.duration}
    ></pao-toast>
  `,
} as Meta<ToastStoryArgs>;

export default meta;
type Story = StoryObj<ToastStoryArgs>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: { title: 'Heads up!', message: 'Your session will expire in 5 minutes.' },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 480px;">
      <pao-toast variant="primary"   open title="Primary"   message="A primary notification."></pao-toast>
      <pao-toast variant="secondary" open title="Secondary" message="A secondary notification."></pao-toast>
      <pao-toast variant="success"   open title="Success"   message="Your changes were saved."></pao-toast>
      <pao-toast variant="warning"   open title="Warning"   message="Please review before submitting."></pao-toast>
      <pao-toast variant="danger"    open title="Error"     message="Something went wrong."></pao-toast>
      <pao-toast variant="info"      open title="Info"      message="New features are available."></pao-toast>
    </div>
  `,
};

export const NonDismissible: Story = {
  args: { dismissible: false, title: 'Notice', message: 'Scheduled maintenance at midnight.' },
};

export const AutoDismiss: Story = {
  args: { duration: 3000, title: 'Auto-closing', message: 'This toast will close in 3 seconds.' },
};

export const MessageOnly: Story = {
  args: { variant: 'success', message: 'Profile updated successfully.' },
};
