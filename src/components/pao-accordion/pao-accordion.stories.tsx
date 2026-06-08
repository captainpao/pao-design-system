import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './pao-accordion';
import '../pao-accordion-item/pao-accordion-item';

interface AccordionStoryArgs {
  allowMultiple: boolean;
}

const meta = {
  title: 'Components/Accordion',
  component: 'pao-accordion',
  args: {
    allowMultiple: false,
  },
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
  render: (args: AccordionStoryArgs) => html`
    <pao-accordion ?allowMultiple=${args.allowMultiple} style="max-width: 480px;">
      <pao-accordion-item label="What is pao design system?">
        A framework-agnostic Web Component library built with Lit for use with React, Angular, Vue, and plain HTML.
      </pao-accordion-item>
      <pao-accordion-item label="How do I install it?">
        Run <code>npm install pao-design-system</code> then import the components you need.
      </pao-accordion-item>
      <pao-accordion-item label="Is it accessible?">
        Yes. Components include proper ARIA attributes and keyboard navigation support.
      </pao-accordion-item>
    </pao-accordion>
  `,
} as Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Default: Story = {};

export const AllowMultiple: Story = {
  args: { allowMultiple: true },
};

export const PreOpened: Story = {
  render: () => html`
    <pao-accordion style="max-width: 480px;">
      <pao-accordion-item label="This item starts open" ?open=${true}>
        This section was pre-expanded via the <code>open</code> property.
      </pao-accordion-item>
      <pao-accordion-item label="This item is collapsed">
        Click the header to expand this section.
      </pao-accordion-item>
    </pao-accordion>
  `,
};

export const WithDisabledItem: Story = {
  render: () => html`
    <pao-accordion style="max-width: 480px;">
      <pao-accordion-item label="Available item">
        This item can be toggled.
      </pao-accordion-item>
      <pao-accordion-item label="Disabled item" ?disabled=${true}>
        This item cannot be expanded.
      </pao-accordion-item>
      <pao-accordion-item label="Another item">
        Click to expand.
      </pao-accordion-item>
    </pao-accordion>
  `,
};
