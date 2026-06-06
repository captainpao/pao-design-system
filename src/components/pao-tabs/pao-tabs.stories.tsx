import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TabsVariant, TabsOrientation } from './pao-tabs';
import './pao-tabs';
import '../pao-tab/pao-tab';

interface TabsStoryArgs {
  value: string;
  orientation: TabsOrientation;
  variant: TabsVariant;
}

const meta = {
  title: 'Components/Tabs',
  component: 'pao-tabs',
  args: {
    value: '',
    orientation: 'horizontal',
    variant: 'line',
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
    variant: { control: { type: 'select' }, options: ['line', 'pill'] },
    value: { control: 'text' },
  },
  render: (args: TabsStoryArgs) => html`
    <pao-tabs value=${args.value} orientation=${args.orientation} variant=${args.variant}>
      <pao-tab value="tab1" label="Overview">
        <p style="font-family: system-ui; margin: 0; color: #495057;">This is the Overview tab content.</p>
      </pao-tab>
      <pao-tab value="tab2" label="Details">
        <p style="font-family: system-ui; margin: 0; color: #495057;">This is the Details tab content.</p>
      </pao-tab>
      <pao-tab value="tab3" label="Settings">
        <p style="font-family: system-ui; margin: 0; color: #495057;">This is the Settings tab content.</p>
      </pao-tab>
    </pao-tabs>
  `,
} as Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<TabsStoryArgs>;

export const Default: Story = {};

export const PillVariant: Story = {
  args: { variant: 'pill' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => html`
    <pao-tabs orientation="vertical" style="min-height: 180px;">
      <pao-tab value="tab1" label="Overview">
        <p style="font-family: system-ui; margin: 0; color: #495057;">Overview content.</p>
      </pao-tab>
      <pao-tab value="tab2" label="Details">
        <p style="font-family: system-ui; margin: 0; color: #495057;">Details content.</p>
      </pao-tab>
      <pao-tab value="tab3" label="Settings">
        <p style="font-family: system-ui; margin: 0; color: #495057;">Settings content.</p>
      </pao-tab>
    </pao-tabs>
  `,
};

export const WithDisabledTab: Story = {
  render: () => html`
    <pao-tabs>
      <pao-tab value="tab1" label="Active">
        <p style="font-family: system-ui; margin: 0; color: #495057;">First tab content.</p>
      </pao-tab>
      <pao-tab value="tab2" label="Disabled" ?disabled=${true}>
        <p style="font-family: system-ui; margin: 0; color: #495057;">This tab is disabled.</p>
      </pao-tab>
      <pao-tab value="tab3" label="Another">
        <p style="font-family: system-ui; margin: 0; color: #495057;">Third tab content.</p>
      </pao-tab>
    </pao-tabs>
  `,
};
