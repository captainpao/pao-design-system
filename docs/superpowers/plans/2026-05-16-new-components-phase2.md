# Phase 2 Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `pao-progress`, `pao-card`, `pao-tab`, `pao-tabs`, `pao-accordion-item`, and `pao-accordion` Lit web components to the pao design system.

**Architecture:** Standalone components (`pao-progress`, `pao-card`) are single Lit elements. Compound components use the established slot-coordination pattern: `pao-tabs` reads metadata from slotted `pao-tab` children to render the tab bar, then sets `active` on each child. `pao-accordion` listens for `paoToggle` events bubbling from `pao-accordion-item` children and enforces single-open behaviour when `allowMultiple` is false. All components follow the `.ts` / `.styles.ts` / `.stories.tsx` / `.mdx` file structure and are tested with mocked Lit in Jest.

**Tech Stack:** Lit 3, TypeScript 5.3, Storybook 10, Jest 30 (jsdom, ts-jest)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/components/pao-progress/pao-progress.ts` | Create | Progress bar component |
| `src/components/pao-progress/pao-progress.styles.ts` | Create | Progress bar styles |
| `src/components/pao-progress/pao-progress.stories.tsx` | Create | Storybook stories |
| `src/components/pao-progress/pao-progress.mdx` | Create | Component docs |
| `test/pao-progress.test.ts` | Create | Jest unit tests |
| `src/components/pao-card/pao-card.ts` | Create | Card container component |
| `src/components/pao-card/pao-card.styles.ts` | Create | Card styles |
| `src/components/pao-card/pao-card.stories.tsx` | Create | Storybook stories |
| `src/components/pao-card/pao-card.mdx` | Create | Component docs |
| `test/pao-card.test.ts` | Create | Jest unit tests |
| `src/components/pao-tab/pao-tab.ts` | Create | Tab panel child element |
| `src/components/pao-tab/pao-tab.styles.ts` | Create | Tab panel styles |
| `test/pao-tab.test.ts` | Create | Jest unit tests |
| `src/components/pao-tabs/pao-tabs.ts` | Create | Tabs container — renders tab bar, coordinates children |
| `src/components/pao-tabs/pao-tabs.styles.ts` | Create | Tab bar and trigger styles |
| `src/components/pao-tabs/pao-tabs.stories.tsx` | Create | Storybook stories |
| `src/components/pao-tabs/pao-tabs.mdx` | Create | Component docs |
| `test/pao-tabs.test.ts` | Create | Jest unit tests |
| `src/components/pao-accordion-item/pao-accordion-item.ts` | Create | Accordion item child element |
| `src/components/pao-accordion-item/pao-accordion-item.styles.ts` | Create | Accordion item styles |
| `test/pao-accordion-item.test.ts` | Create | Jest unit tests |
| `src/components/pao-accordion/pao-accordion.ts` | Create | Accordion container — enforces single-open |
| `src/components/pao-accordion/pao-accordion.styles.ts` | Create | Accordion wrapper styles |
| `src/components/pao-accordion/pao-accordion.stories.tsx` | Create | Storybook stories |
| `src/components/pao-accordion/pao-accordion.mdx` | Create | Component docs |
| `test/pao-accordion.test.ts` | Create | Jest unit tests |
| `src/index.ts` | Modify | Export all 6 new elements |

---

## Task 1: pao-progress

**Files:**
- Create: `test/pao-progress.test.ts`
- Create: `src/components/pao-progress/pao-progress.styles.ts`
- Create: `src/components/pao-progress/pao-progress.ts`
- Create: `src/components/pao-progress/pao-progress.stories.tsx`
- Create: `src/components/pao-progress/pao-progress.mdx`

- [ ] **Step 1: Write the failing test**

Create `test/pao-progress.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-progress/pao-progress.styles', () => ({
  styles: [],
}));

import { PaoProgress } from '../src/components/pao-progress/pao-progress';
import type { ProgressVariant, ProgressSize } from '../src/components/pao-progress/pao-progress';

describe('PaoProgress', () => {
  it('has correct default properties', () => {
    const el = new PaoProgress();
    expect(el.value).toBe(0);
    expect(el.max).toBe(100);
    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.indeterminate).toBe(false);
    expect(el.label).toBe('');
    expect(el.showValue).toBe(false);
  });

  it('accepts all variants', () => {
    const variants: ProgressVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
    for (const v of variants) {
      const el = new PaoProgress();
      el.variant = v;
      expect(el.variant).toBe(v);
    }
  });

  it('accepts all sizes', () => {
    const sizes: ProgressSize[] = ['sm', 'md', 'lg'];
    for (const s of sizes) {
      const el = new PaoProgress();
      el.size = s;
      expect(el.size).toBe(s);
    }
  });

  it('renders', () => {
    const el = new PaoProgress();
    expect(el.render()).toBeDefined();
  });

  it('renders indeterminate', () => {
    const el = new PaoProgress();
    el.indeterminate = true;
    expect(el.render()).toBeDefined();
  });

  it('renders showValue', () => {
    const el = new PaoProgress();
    el.value = 50;
    el.showValue = true;
    expect(el.render()).toBeDefined();
  });

  it('clamps value below 0', () => {
    const el = new PaoProgress();
    el.value = -10;
    expect(el.render()).toBeDefined();
  });

  it('clamps value above max', () => {
    const el = new PaoProgress();
    el.value = 150;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoProgress.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-progress.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-progress/pao-progress'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-progress/pao-progress.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-progress-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pao-progress-track {
    flex: 1;
    background-color: var(--pao-gray-200);
    border-radius: 50px;
    overflow: hidden;
  }

  .pao-progress-track.sm { height: 4px; }
  .pao-progress-track.md { height: 8px; }
  .pao-progress-track.lg { height: 14px; }

  .pao-progress-fill {
    height: 100%;
    border-radius: 50px;
    transition: width 0.3s ease;
  }

  .pao-progress-fill.primary   { background-color: var(--pao-color-primary); }
  .pao-progress-fill.secondary { background-color: var(--pao-color-secondary); }
  .pao-progress-fill.success   { background-color: var(--pao-color-success); }
  .pao-progress-fill.warning   { background-color: var(--pao-color-warning); }
  .pao-progress-fill.danger    { background-color: var(--pao-color-danger); }

  .pao-progress-fill.indeterminate {
    width: 40%;
    animation: pao-progress-slide 1.4s ease-in-out infinite;
  }

  @keyframes pao-progress-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  .pao-progress-value {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    white-space: nowrap;
    flex-shrink: 0;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-progress/pao-progress.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-progress.styles';

export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'sm' | 'md' | 'lg';

@customElement('pao-progress')
export class PaoProgress extends LitElement {
  static styles = styles;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) variant: ProgressVariant = 'primary';
  @property({ type: String }) size: ProgressSize = 'md';
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showValue = false;

  render() {
    const clamped = Math.min(Math.max(this.value, 0), this.max);
    const pct = Math.round((clamped / this.max) * 100);
    const trackClasses = ['pao-progress-track', this.size].join(' ');
    const fillClasses = [
      'pao-progress-fill',
      this.variant,
      this.indeterminate ? 'indeterminate' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="pao-progress-wrapper" part="wrapper">
        <div
          class=${trackClasses}
          part="track"
          role="progressbar"
          aria-valuenow=${this.indeterminate ? '' : clamped}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-label=${this.label || 'Progress'}
        >
          <div
            class=${fillClasses}
            part="fill"
            style=${this.indeterminate ? '' : `width: ${pct}%`}
          ></div>
        </div>
        ${this.showValue && !this.indeterminate
          ? html`<span class="pao-progress-value" part="value">${pct}%</span>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-progress': PaoProgress;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-progress.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 9 tests PASS

- [ ] **Step 6: Create stories file**

Create `src/components/pao-progress/pao-progress.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressVariant, ProgressSize } from './pao-progress';
import './pao-progress';

interface ProgressStoryArgs {
  value: number;
  max: number;
  variant: ProgressVariant;
  size: ProgressSize;
  indeterminate: boolean;
  label: string;
  showValue: boolean;
}

const meta = {
  title: 'Components/Progress',
  component: 'pao-progress',
  args: {
    value: 60,
    max: 100,
    variant: 'primary',
    size: 'md',
    indeterminate: false,
    label: 'Loading...',
    showValue: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number' } },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args: ProgressStoryArgs) => html`
    <pao-progress
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
      label=${args.label}
      ?showValue=${args.showValue}
      style="max-width: 400px"
    ></pao-progress>
  `,
} as Meta<ProgressStoryArgs>;

export default meta;
type Story = StoryObj<ProgressStoryArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { showValue: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-progress size="sm" value="60" label="Small"></pao-progress>
      <pao-progress size="md" value="60" label="Medium"></pao-progress>
      <pao-progress size="lg" value="60" label="Large"></pao-progress>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-progress variant="primary"   value="80" ?showValue=${true} label="Primary"></pao-progress>
      <pao-progress variant="secondary" value="65" ?showValue=${true} label="Secondary"></pao-progress>
      <pao-progress variant="success"   value="100" ?showValue=${true} label="Success"></pao-progress>
      <pao-progress variant="warning"   value="45" ?showValue=${true} label="Warning"></pao-progress>
      <pao-progress variant="danger"    value="20" ?showValue=${true} label="Danger"></pao-progress>
    </div>
  `,
};
```

- [ ] **Step 7: Create MDX documentation**

Create `src/components/pao-progress/pao-progress.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as ProgressStories from './pao-progress.stories';

<Meta of={ProgressStories} />

# Progress

A linear progress bar for communicating task completion or loading state.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current progress (0 to `max`) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Bar colour |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Bar height (4px / 8px / 14px) |
| `indeterminate` | `boolean` | `false` | Animated sliding bar for unknown progress — hides `aria-valuenow` |
| `label` | `string` | `''` | Accessible label (used as `aria-label`) |
| `showValue` | `boolean` | `false` | Renders `N%` text beside the bar; ignored when `indeterminate` |
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-progress/ test/pao-progress.test.ts
git commit -m "feat: add pao-progress component with variants, sizes, and indeterminate mode"
```

---

## Task 2: pao-card

**Files:**
- Create: `test/pao-card.test.ts`
- Create: `src/components/pao-card/pao-card.styles.ts`
- Create: `src/components/pao-card/pao-card.ts`
- Create: `src/components/pao-card/pao-card.stories.tsx`
- Create: `src/components/pao-card/pao-card.mdx`

- [ ] **Step 1: Write the failing test**

Create `test/pao-card.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-card/pao-card.styles', () => ({
  styles: [],
}));

import { PaoCard } from '../src/components/pao-card/pao-card';

describe('PaoCard', () => {
  it('has correct default properties', () => {
    const el = new PaoCard();
    expect(el.shadow).toBe(false);
    expect(el.padded).toBe(true);
    expect((el as any)._hasHeader).toBe(false);
    expect((el as any)._hasFooter).toBe(false);
  });

  it('sets shadow prop', () => {
    const el = new PaoCard();
    el.shadow = true;
    expect(el.shadow).toBe(true);
  });

  it('sets padded prop', () => {
    const el = new PaoCard();
    el.padded = false;
    expect(el.padded).toBe(false);
  });

  it('handleHeaderSlotChange sets _hasHeader true when slot has nodes', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => [document.createTextNode('x')]) };
    (el as any).handleHeaderSlotChange({ target: mockSlot });
    expect((el as any)._hasHeader).toBe(true);
  });

  it('handleHeaderSlotChange sets _hasHeader false when slot is empty', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => []) };
    (el as any).handleHeaderSlotChange({ target: mockSlot });
    expect((el as any)._hasHeader).toBe(false);
  });

  it('handleFooterSlotChange sets _hasFooter true when slot has nodes', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => [document.createTextNode('x')]) };
    (el as any).handleFooterSlotChange({ target: mockSlot });
    expect((el as any)._hasFooter).toBe(true);
  });

  it('handleFooterSlotChange sets _hasFooter false when slot is empty', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => []) };
    (el as any).handleFooterSlotChange({ target: mockSlot });
    expect((el as any)._hasFooter).toBe(false);
  });

  it('renders', () => {
    const el = new PaoCard();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoCard.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-card.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-card/pao-card'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-card/pao-card.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    border-radius: 8px;
    border: 1px solid var(--pao-border-color);
    background-color: var(--pao-body-bg);
    overflow: hidden;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  :host([shadow]) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .pao-card-header {
    border-bottom: 1px solid var(--pao-border-color);
    font-weight: 600;
    font-size: 1rem;
    color: var(--pao-body-color);
  }

  .pao-card-header.hidden {
    display: none;
  }

  .pao-card-header.padded {
    padding: 1rem 1.25rem;
  }

  .pao-card-body {
    color: var(--pao-body-color);
    font-size: 0.9375rem;
  }

  .pao-card-body.padded {
    padding: 1rem 1.25rem;
  }

  .pao-card-footer {
    border-top: 1px solid var(--pao-border-color);
    background-color: var(--pao-gray-50);
  }

  .pao-card-footer.hidden {
    display: none;
  }

  .pao-card-footer.padded {
    padding: 0.75rem 1.25rem;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-card/pao-card.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-card.styles';

@customElement('pao-card')
export class PaoCard extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) shadow = false;
  @property({ type: Boolean }) padded = true;

  @state() private _hasHeader = false;
  @state() private _hasFooter = false;

  private handleHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const padClass = this.padded ? 'padded' : '';
    return html`
      <div class="pao-card" part="card">
        <div class="pao-card-header ${this._hasHeader ? padClass : 'hidden'}" part="header">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="pao-card-body ${padClass}" part="body">
          <slot></slot>
        </div>
        <div class="pao-card-footer ${this._hasFooter ? padClass : 'hidden'}" part="footer">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-card': PaoCard;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-card.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 9 tests PASS

- [ ] **Step 6: Create stories file**

Create `src/components/pao-card/pao-card.stories.tsx`:

```typescript
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
```

- [ ] **Step 7: Create MDX documentation**

Create `src/components/pao-card/pao-card.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as CardStories from './pao-card.stories';

<Meta of={CardStories} />

# Card

A content container with optional header, body, and footer zones. Purely presentational — no events.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `shadow` | `boolean` | `false` | Adds a drop shadow |
| `padded` | `boolean` | `true` | Adds internal padding to header, body, and footer |

## Slots

| Slot | Description |
|---|---|
| `header` | Card title area — rendered above the body with a bottom border. Hidden when empty. |
| *(default)* | Card body content |
| `footer` | Card action area — rendered below the body with a top border. Hidden when empty. |

## Usage

```html
<pao-card shadow>
  <span slot="header">Card Title</span>
  <p>Card body content goes here.</p>
  <div slot="footer">Footer actions</div>
</pao-card>
```
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-card/ test/pao-card.test.ts
git commit -m "feat: add pao-card component with header, body, footer slots"
```

---

## Task 3: pao-tab

**Files:**
- Create: `test/pao-tab.test.ts`
- Create: `src/components/pao-tab/pao-tab.styles.ts`
- Create: `src/components/pao-tab/pao-tab.ts`

pao-tab is a child-only element. It does not have its own stories or MDX — it is documented inside pao-tabs.

- [ ] **Step 1: Write the failing test**

Create `test/pao-tab.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-tab/pao-tab.styles', () => ({
  styles: [],
}));

import { PaoTab } from '../src/components/pao-tab/pao-tab';

describe('PaoTab', () => {
  it('has correct default properties', () => {
    const el = new PaoTab();
    expect(el.value).toBe('');
    expect(el.label).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.active).toBe(false);
  });

  it('sets value', () => {
    const el = new PaoTab();
    el.value = 'tab1';
    expect(el.value).toBe('tab1');
  });

  it('sets label', () => {
    const el = new PaoTab();
    el.label = 'Overview';
    expect(el.label).toBe('Overview');
  });

  it('sets active', () => {
    const el = new PaoTab();
    el.active = true;
    expect(el.active).toBe(true);
  });

  it('sets disabled', () => {
    const el = new PaoTab();
    el.disabled = true;
    expect(el.disabled).toBe(true);
  });

  it('renders when active', () => {
    const el = new PaoTab();
    el.active = true;
    expect(el.render()).toBeDefined();
  });

  it('renders when inactive', () => {
    const el = new PaoTab();
    el.active = false;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoTab.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-tab.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-tab/pao-tab'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-tab/pao-tab.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-tab-panel {
    outline: none;
  }

  .pao-tab-panel[hidden] {
    display: none;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-tab/pao-tab.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-tab.styles';

@customElement('pao-tab')
export class PaoTab extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`
      <div
        class="pao-tab-panel"
        part="panel"
        role="tabpanel"
        ?hidden=${!this.active}
        aria-hidden=${!this.active}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tab': PaoTab;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-tab.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 8 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/pao-tab/ test/pao-tab.test.ts
git commit -m "feat: add pao-tab child element for use with pao-tabs"
```

---

## Task 4: pao-tabs

**Files:**
- Create: `test/pao-tabs.test.ts`
- Create: `src/components/pao-tabs/pao-tabs.styles.ts`
- Create: `src/components/pao-tabs/pao-tabs.ts`
- Create: `src/components/pao-tabs/pao-tabs.stories.tsx`
- Create: `src/components/pao-tabs/pao-tabs.mdx`

- [ ] **Step 1: Write the failing test**

Create `test/pao-tabs.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-tabs/pao-tabs.styles', () => ({
  styles: [],
}));

import { PaoTabs } from '../src/components/pao-tabs/pao-tabs';
import type { TabsOrientation, TabsVariant } from '../src/components/pao-tabs/pao-tabs';

describe('PaoTabs', () => {
  it('has correct default properties', () => {
    const el = new PaoTabs();
    expect(el.value).toBe('');
    expect(el.orientation).toBe('horizontal');
    expect(el.variant).toBe('line');
    expect((el as any)._tabs).toEqual([]);
  });

  it('accepts all orientation values', () => {
    const orientations: TabsOrientation[] = ['horizontal', 'vertical'];
    for (const o of orientations) {
      const el = new PaoTabs();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('accepts all variant values', () => {
    const variants: TabsVariant[] = ['line', 'pill'];
    for (const v of variants) {
      const el = new PaoTabs();
      el.variant = v;
      expect(el.variant).toBe(v);
    }
  });

  it('handleSlotChange populates _tabs from slotted pao-tab elements', () => {
    const el = new PaoTabs();
    el.value = 'a';
    const tab1 = { value: 'a', label: 'Tab A', disabled: false, active: false };
    const tab2 = { value: 'b', label: 'Tab B', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any).handleSlotChange();

    expect((el as any)._tabs).toEqual([
      { value: 'a', label: 'Tab A', disabled: false },
      { value: 'b', label: 'Tab B', disabled: false },
    ]);
  });

  it('handleSlotChange auto-activates first non-disabled tab when value is empty', () => {
    const el = new PaoTabs();
    const tab1 = { value: 'a', label: 'Tab A', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1] as any);

    (el as any).handleSlotChange();

    expect(el.value).toBe('a');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoChange', detail: { value: 'a' } })
    );
  });

  it('handleSlotChange skips disabled tabs when auto-activating', () => {
    const el = new PaoTabs();
    const tab1 = { value: 'a', label: 'Tab A', disabled: true, active: false };
    const tab2 = { value: 'b', label: 'Tab B', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any).handleSlotChange();

    expect(el.value).toBe('b');
  });

  it('handleTabClick activates tab and emits paoChange', () => {
    const el = new PaoTabs();
    const tab = { value: 'b', active: false };
    el.querySelectorAll = jest.fn(() => [tab] as any);

    (el as any).handleTabClick('b', false);

    expect(el.value).toBe('b');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoChange', detail: { value: 'b' } })
    );
  });

  it('handleTabClick does nothing when tab is disabled', () => {
    const el = new PaoTabs();

    (el as any).handleTabClick('b', true);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
    expect(el.value).toBe('');
  });

  it('_syncActive sets active=true on matching tab and false on others', () => {
    const el = new PaoTabs();
    el.value = 'b';
    const tab1 = { value: 'a', active: false };
    const tab2 = { value: 'b', active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any)._syncActive();

    expect(tab1.active).toBe(false);
    expect(tab2.active).toBe(true);
  });

  it('renders', () => {
    const el = new PaoTabs();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoTabs.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-tabs.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-tabs/pao-tabs'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-tabs/pao-tabs.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-tabs-wrapper {
    display: flex;
    flex-direction: column;
  }

  .pao-tabs-wrapper.vertical {
    flex-direction: row;
  }

  /* ── Line variant ─────────────────────────────── */
  .pao-tabs-list.line {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid var(--pao-gray-200);
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line {
    flex-direction: column;
    border-bottom: none;
    border-right: 2px solid var(--pao-gray-200);
  }

  .pao-tabs-list.line .pao-tab-trigger {
    padding: 0.75rem 1.25rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-gray-600);
    transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    white-space: nowrap;
  }

  .pao-tabs-list.line .pao-tab-trigger:hover:not([disabled]) {
    color: var(--pao-color-primary);
    background-color: var(--pao-gray-50);
  }

  .pao-tabs-list.line .pao-tab-trigger.active {
    color: var(--pao-color-primary);
    border-bottom-color: var(--pao-color-primary);
    font-weight: 600;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line .pao-tab-trigger {
    border-bottom: none;
    border-right: 2px solid transparent;
    margin-bottom: 0;
    margin-right: -2px;
    text-align: left;
    width: 100%;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line .pao-tab-trigger.active {
    border-right-color: var(--pao-color-primary);
  }

  /* ── Pill variant ─────────────────────────────── */
  .pao-tabs-list.pill {
    display: flex;
    flex-direction: row;
    background-color: var(--pao-gray-100);
    border-radius: 50px;
    padding: 4px;
    gap: 4px;
    align-self: flex-start;
  }

  .pao-tabs-list.pill .pao-tab-trigger {
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 50px;
    background: transparent;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-gray-600);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .pao-tabs-list.pill .pao-tab-trigger.active {
    background-color: var(--pao-body-bg);
    color: var(--pao-color-primary);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* ── Disabled ─────────────────────────────────── */
  .pao-tab-trigger[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ── Content area ─────────────────────────────── */
  .pao-tabs-content {
    flex: 1;
    padding-top: 1rem;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-content {
    padding-top: 0;
    padding-left: 1.25rem;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-tabs/pao-tabs.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-tabs.styles';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsVariant = 'line' | 'pill';

interface TabMeta {
  value: string;
  label: string;
  disabled: boolean;
}

@customElement('pao-tabs')
export class PaoTabs extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) orientation: TabsOrientation = 'horizontal';
  @property({ type: String }) variant: TabsVariant = 'line';

  @state() private _tabs: TabMeta[] = [];

  private handleSlotChange() {
    const children = Array.from(this.querySelectorAll('pao-tab'));
    this._tabs = children.map(tab => ({
      value: (tab as any).value,
      label: (tab as any).label,
      disabled: (tab as any).disabled,
    }));
    if (!this.value) {
      const first = this._tabs.find(t => !t.disabled);
      if (first) this._activate(first.value);
    } else {
      this._syncActive();
    }
  }

  private _activate(value: string) {
    this.value = value;
    this._syncActive();
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value },
    }));
  }

  private _syncActive() {
    const children = this.querySelectorAll('pao-tab');
    children.forEach(tab => {
      (tab as any).active = (tab as any).value === this.value;
    });
  }

  private handleTabClick(value: string, disabled: boolean) {
    if (disabled) return;
    this._activate(value);
  }

  render() {
    const wrapperClasses = ['pao-tabs-wrapper', this.orientation].join(' ');
    const tablistClasses = ['pao-tabs-list', this.variant].join(' ');

    return html`
      <div class=${wrapperClasses} part="wrapper">
        <div
          class=${tablistClasses}
          part="tablist"
          role="tablist"
          aria-orientation=${this.orientation}
        >
          ${this._tabs.map(tab => html`
            <button
              class="pao-tab-trigger ${tab.value === this.value ? 'active' : ''}"
              part="tab"
              role="tab"
              aria-selected=${tab.value === this.value}
              ?disabled=${tab.disabled}
              tabindex=${tab.value === this.value ? '0' : '-1'}
              @click=${() => this.handleTabClick(tab.value, tab.disabled)}
            >${tab.label}</button>
          `)}
        </div>
        <div class="pao-tabs-content" part="content">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tabs': PaoTabs;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-tabs.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 10 tests PASS

- [ ] **Step 6: Create stories file**

Create `src/components/pao-tabs/pao-tabs.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabsVariant, TabsOrientation } from './pao-tabs';
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
```

- [ ] **Step 7: Create MDX documentation**

Create `src/components/pao-tabs/pao-tabs.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as TabsStories from './pao-tabs.stories';

<Meta of={TabsStories} />

# Tabs

Tab navigation for switching between related content panels. Uses `pao-tabs` as the container with `pao-tab` elements as individual panels.

## Interactive Demo

<Primary />

## Properties

<Controls />

## pao-tabs Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Value of the active tab — auto-selects first non-disabled tab if empty |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the tab bar |
| `variant` | `'line' \| 'pill'` | `'line'` | Visual style of the tab triggers |

## pao-tab Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Unique identifier — matched against `pao-tabs` value |
| `label` | `string` | `''` | Text shown in the tab trigger button |
| `disabled` | `boolean` | `false` | Prevents this tab from being selected |
| `active` | `boolean` | `false` | Set automatically by `pao-tabs` — do not set manually |

## Events

- `paoChange` on `pao-tabs`: Fired when the active tab changes. `event.detail = { value: string }`

## Usage

```html
<pao-tabs value="overview">
  <pao-tab value="overview" label="Overview">Overview content.</pao-tab>
  <pao-tab value="details" label="Details">Details content.</pao-tab>
  <pao-tab value="settings" label="Settings" disabled>Settings (locked).</pao-tab>
</pao-tabs>
```
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-tabs/ test/pao-tabs.test.ts
git commit -m "feat: add pao-tabs component with line/pill variants and horizontal/vertical orientation"
```

---

## Task 5: pao-accordion-item

**Files:**
- Create: `test/pao-accordion-item.test.ts`
- Create: `src/components/pao-accordion-item/pao-accordion-item.styles.ts`
- Create: `src/components/pao-accordion-item/pao-accordion-item.ts`

pao-accordion-item is a child element documented inside pao-accordion. No separate stories or MDX.

- [ ] **Step 1: Write the failing test**

Create `test/pao-accordion-item.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-accordion-item/pao-accordion-item.styles', () => ({
  styles: [],
}));

import { PaoAccordionItem } from '../src/components/pao-accordion-item/pao-accordion-item';

describe('PaoAccordionItem', () => {
  it('has correct default properties', () => {
    const el = new PaoAccordionItem();
    expect(el.label).toBe('');
    expect(el.open).toBe(false);
    expect(el.disabled).toBe(false);
  });

  it('handleToggle opens when closed', () => {
    const el = new PaoAccordionItem();
    (el as any).handleToggle();
    expect(el.open).toBe(true);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoToggle', detail: { open: true } })
    );
  });

  it('handleToggle closes when open', () => {
    const el = new PaoAccordionItem();
    el.open = true;
    (el as any).handleToggle();
    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoToggle', detail: { open: false } })
    );
  });

  it('handleToggle does nothing when disabled', () => {
    const el = new PaoAccordionItem();
    el.disabled = true;
    (el as any).handleToggle();
    expect(el.open).toBe(false);
    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('renders when closed', () => {
    const el = new PaoAccordionItem();
    expect(el.render()).toBeDefined();
  });

  it('renders when open', () => {
    const el = new PaoAccordionItem();
    el.open = true;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoAccordionItem.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-accordion-item.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-accordion-item/pao-accordion-item'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-accordion-item/pao-accordion-item.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    border-bottom: 1px solid var(--pao-border-color);
  }

  :host(:first-child) {
    border-top: 1px solid var(--pao-border-color);
  }

  .pao-accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--pao-body-color);
    text-align: left;
    transition: background-color 0.15s ease;
  }

  .pao-accordion-trigger:hover:not(:disabled) {
    background-color: var(--pao-gray-50);
  }

  .pao-accordion-trigger:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pao-accordion-chevron {
    display: inline-block;
    font-size: 0.875rem;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .pao-accordion-chevron.open {
    transform: rotate(180deg);
  }

  .pao-accordion-panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .pao-accordion-panel.open {
    max-height: 1000px;
  }

  .pao-accordion-content {
    padding: 0 1.25rem 1rem;
    color: var(--pao-gray-700);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-accordion-item/pao-accordion-item.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-accordion-item.styles';

@customElement('pao-accordion-item')
export class PaoAccordionItem extends LitElement {
  static styles = styles;

  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleToggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('paoToggle', {
      bubbles: true,
      composed: true,
      detail: { open: this.open },
    }));
  }

  render() {
    return html`
      <div class="pao-accordion-item" part="item">
        <button
          class="pao-accordion-trigger"
          part="trigger"
          ?disabled=${this.disabled}
          aria-expanded=${this.open}
          @click=${this.handleToggle}
        >
          <span class="pao-accordion-label" part="label">${this.label}</span>
          <span class="pao-accordion-chevron ${this.open ? 'open' : ''}" part="chevron" aria-hidden="true">▾</span>
        </button>
        <div
          class="pao-accordion-panel ${this.open ? 'open' : ''}"
          part="panel"
          aria-hidden=${!this.open}
        >
          <div class="pao-accordion-content" part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-accordion-item': PaoAccordionItem;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-accordion-item.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 7 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/pao-accordion-item/ test/pao-accordion-item.test.ts
git commit -m "feat: add pao-accordion-item child element with toggle animation"
```

---

## Task 6: pao-accordion

**Files:**
- Create: `test/pao-accordion.test.ts`
- Create: `src/components/pao-accordion/pao-accordion.styles.ts`
- Create: `src/components/pao-accordion/pao-accordion.ts`
- Create: `src/components/pao-accordion/pao-accordion.stories.tsx`
- Create: `src/components/pao-accordion/pao-accordion.mdx`

- [ ] **Step 1: Write the failing test**

Create `test/pao-accordion.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    querySelectorAll = jest.fn(() => []);
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-accordion/pao-accordion.styles', () => ({
  styles: [],
}));

import { PaoAccordion } from '../src/components/pao-accordion/pao-accordion';

describe('PaoAccordion', () => {
  it('has correct default properties', () => {
    const el = new PaoAccordion();
    expect(el.allowMultiple).toBe(false);
  });

  it('accepts allowMultiple=true', () => {
    const el = new PaoAccordion();
    el.allowMultiple = true;
    expect(el.allowMultiple).toBe(true);
  });

  it('handleChildToggle closes siblings when allowMultiple is false and an item opens', () => {
    const el = new PaoAccordion();
    const item1 = { open: true };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: true }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(false);
  });

  it('handleChildToggle does nothing when allowMultiple is true', () => {
    const el = new PaoAccordion();
    el.allowMultiple = true;
    const item1 = { open: true };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: true }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(true);
  });

  it('handleChildToggle does nothing when event detail.open is false (a close event)', () => {
    const el = new PaoAccordion();
    const item1 = { open: false };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: false }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item2.open).toBe(true);
  });

  it('renders', () => {
    const el = new PaoAccordion();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoAccordion.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npx jest test/pao-accordion.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-accordion/pao-accordion'`

- [ ] **Step 3: Create styles file**

Create `src/components/pao-accordion/pao-accordion.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-accordion {
    display: block;
  }
`;
```

- [ ] **Step 4: Create component file**

Create `src/components/pao-accordion/pao-accordion.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-accordion.styles';

@customElement('pao-accordion')
export class PaoAccordion extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) allowMultiple = false;

  private handleChildToggle(e: CustomEvent) {
    if (this.allowMultiple) return;
    if (!e.detail.open) return;
    const source = e.target as Element;
    const items = Array.from(this.querySelectorAll('pao-accordion-item'));
    items.forEach(item => {
      if (item !== source) (item as any).open = false;
    });
  }

  render() {
    return html`
      <div class="pao-accordion" part="accordion" @paoToggle=${this.handleChildToggle}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-accordion': PaoAccordion;
  }
}
```

- [ ] **Step 5: Run test — expect pass**

```bash
npx jest test/pao-accordion.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All 7 tests PASS

- [ ] **Step 6: Create stories file**

Create `src/components/pao-accordion/pao-accordion.stories.tsx`:

```typescript
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
```

- [ ] **Step 7: Create MDX documentation**

Create `src/components/pao-accordion/pao-accordion.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as AccordionStories from './pao-accordion.stories';

<Meta of={AccordionStories} />

# Accordion

Expandable/collapsible content sections. Uses `pao-accordion` as the container with `pao-accordion-item` elements for each section.

## Interactive Demo

<Primary />

## Properties

<Controls />

## pao-accordion Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowMultiple` | `boolean` | `false` | When false, opening one item automatically closes all others |

## pao-accordion-item Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Text shown in the trigger header |
| `open` | `boolean` | `false` | Whether the content panel is expanded |
| `disabled` | `boolean` | `false` | Prevents toggling |

## Events

- `paoToggle` on `pao-accordion-item`: Fired on toggle. `event.detail = { open: boolean }`

## Usage

```html
<pao-accordion>
  <pao-accordion-item label="Section 1">Content for section 1.</pao-accordion-item>
  <pao-accordion-item label="Section 2" open>Starts expanded.</pao-accordion-item>
  <pao-accordion-item label="Section 3" disabled>Cannot expand.</pao-accordion-item>
</pao-accordion>
```
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-accordion/ test/pao-accordion.test.ts
git commit -m "feat: add pao-accordion component with single/multiple open modes"
```

---

## Task 7: Export all components and verify

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Update src/index.ts**

Open `src/index.ts` and add the 6 new exports. The final file should be:

```typescript
// Import foundation styles to ensure fonts and base styles are loaded
import './styles/index.scss';

export * from './components/pao-button/pao-button';
export * from './components/pao-button-group/pao-button-group';
export * from './components/pao-input/pao-input';
export * from './components/pao-badge/pao-badge';
export * from './components/pao-spinner/pao-spinner';
export * from './components/pao-checkbox/pao-checkbox';
export * from './components/pao-checkbox-group/pao-checkbox-group';
export * from './components/pao-radio/pao-radio';
export * from './components/pao-radio-group/pao-radio-group';
export * from './components/pao-select-option/pao-select-option';
export * from './components/pao-select/pao-select';
export * from './components/pao-toggle/pao-toggle';
export * from './components/pao-textarea/pao-textarea';
export * from './components/pao-toast/pao-toast';
export * from './components/pao-modal/pao-modal';
export * from './components/pao-tooltip/pao-tooltip';
export * from './components/pao-progress/pao-progress';
export * from './components/pao-card/pao-card';
export * from './components/pao-tab/pao-tab';
export * from './components/pao-tabs/pao-tabs';
export * from './components/pao-accordion-item/pao-accordion-item';
export * from './components/pao-accordion/pao-accordion';
```

- [ ] **Step 2: Run full test suite**

```bash
npm test -- --no-coverage 2>&1 | tail -20
```

Expected: All test suites PASS, no collision warnings

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/index.ts
git commit -m "feat: export pao-progress, pao-card, pao-tab, pao-tabs, pao-accordion-item, pao-accordion from library"
```

---

## Self-Review Checklist

- [x] All 6 elements have implementation, styles, tests — pao-progress, pao-card, pao-tab, pao-tabs, pao-accordion-item, pao-accordion
- [x] pao-tabs and pao-accordion have stories + MDX; child elements (pao-tab, pao-accordion-item) do not
- [x] All types consistent: `ProgressVariant`, `ProgressSize`, `TabsOrientation`, `TabsVariant` — defined and imported correctly
- [x] `TabMeta` interface in pao-tabs is local to the file — not exported (consumers don't need it)
- [x] `handleTabClick(value, disabled)` signature matches how it is called in the `render()` template
- [x] `handleChildToggle` in pao-accordion uses plain object casting (`{ detail, target }`) — compatible with mock env
- [x] `_syncActive` is called from both `handleSlotChange` (when value already set) and `_activate` — no double-dispatch
- [x] `pao-card` `padded` defaults to `true` — test asserts `expect(el.padded).toBe(true)` ✓
- [x] `pao-card` `shadow` has `reflect: true` so `:host([shadow])` CSS works ✓
- [x] `src/index.ts` final version includes all prior exports — nothing dropped ✓
- [x] No TBDs, no "similar to Task N" references, no placeholder steps
