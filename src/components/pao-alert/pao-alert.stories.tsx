import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { AlertVariant } from './pao-alert';
import './pao-alert';

interface AlertStoryArgs {
  variant: AlertVariant;
  heading: string;
  dismissible: boolean;
  icon: boolean;
}

const meta = {
  title: 'Components/Alert',
  component: 'pao-alert',
  args: {
    variant: 'info',
    heading: '',
    dismissible: false,
    icon: true,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
    },
    heading: { control: 'text' },
    dismissible: { control: 'boolean' },
    icon: { control: 'boolean' },
  },
  render: (args: AlertStoryArgs) => html`
    <pao-alert
      variant=${args.variant}
      heading=${args.heading}
      ?dismissible=${args.dismissible}
      ?icon=${args.icon}
    >
      This is an alert message providing important information to the user.
    </pao-alert>
  `,
} as Meta<AlertStoryArgs>;

export default meta;
type Story = StoryObj<AlertStoryArgs>;

export const Default: Story = {};

export const WithHeading: Story = {
  args: { heading: 'Heads up!', variant: 'info' },
};

export const Dismissible: Story = {
  args: {
    heading: 'Dismissible Alert',
    dismissible: true,
    variant: 'success',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 560px;">
      <pao-alert variant="info" heading="Info">This is an informational alert.</pao-alert>
      <pao-alert variant="success" heading="Success">Your changes have been saved successfully.</pao-alert>
      <pao-alert variant="warning" heading="Warning">Please review your input before proceeding.</pao-alert>
      <pao-alert variant="danger" heading="Error">Something went wrong. Please try again.</pao-alert>
    </div>
  `,
};

export const NoIcon: Story = {
  args: { icon: false, heading: 'No Icon', variant: 'warning' },
};
