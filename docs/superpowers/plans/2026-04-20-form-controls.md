# Form Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `pao-checkbox`, `pao-checkbox-group`, `pao-radio`, `pao-radio-group`, `pao-select`, and `pao-select-option` Lit web components to the pao design system.

**Architecture:** Each component is a Lit element with `@customElement`, typed `@property` decorators, and `paoChange` custom events (`bubbles: true, composed: true`). Group components (`pao-checkbox-group`, `pao-radio-group`) coordinate with slotted children via `slotchange` — pushing `name`/`disabled` down and collecting results on child events. `pao-select` is a custom dropdown that manages `open` state internally and delegates option selection to slotted `pao-select-option` elements via `paoSelectOption` events.

**Tech Stack:** Lit 3, TypeScript, Jest (jsdom), Storybook (`@storybook/web-components-vite`), CSS custom properties (`--pao-*` tokens)

---

## File Map

```
src/components/pao-checkbox/
  pao-checkbox.ts            ← Lit element: value, name, checked, indeterminate, disabled, required, size, label, error, helperText
  pao-checkbox.styles.ts     ← Hidden native input + custom square control, checkmark/dash via ::after
  pao-checkbox.stories.tsx   ← Default, Sizes, Indeterminate, Disabled, WithError, Group usage
  pao-checkbox.mdx           ← Props table, events, usage

src/components/pao-checkbox-group/
  pao-checkbox-group.ts      ← Fieldset wrapper; slotchange pushes name/disabled; re-emits { values: string[] }
  pao-checkbox-group.styles.ts ← Fieldset reset, legend label, vertical/horizontal flex layout
  pao-checkbox-group.stories.tsx
  pao-checkbox-group.mdx

src/components/pao-radio/
  pao-radio.ts               ← Lit element: value, name, checked, disabled, size, label, error, helperText
  pao-radio.styles.ts        ← Hidden native input + custom circle control, inner dot via ::after
  pao-radio.stories.tsx
  pao-radio.mdx

src/components/pao-radio-group/
  pao-radio-group.ts         ← Fieldset wrapper; slotchange pushes name/disabled; enforces single selection; re-emits { value: string }
  pao-radio-group.styles.ts  ← Same structure as checkbox-group styles
  pao-radio-group.stories.tsx
  pao-radio-group.mdx

src/components/pao-select-option/
  pao-select-option.ts       ← Option element: value, disabled, selected; fires paoSelectOption on click
  pao-select-option.styles.ts ← Option row: hover, selected, disabled states

src/components/pao-select/
  pao-select.ts              ← Custom dropdown: open state, single/multi-select, keyboard nav, click-outside
  pao-select.styles.ts       ← Trigger (mirrors pao-input), absolute panel, chevron rotation
  pao-select.stories.tsx
  pao-select.mdx

test/
  pao-checkbox.test.ts
  pao-checkbox-group.test.ts
  pao-radio.test.ts
  pao-radio-group.test.ts
  pao-select-option.test.ts
  pao-select.test.ts

src/index.ts                 ← Add exports for all 6 new components
```

---

## Task 1: pao-checkbox

**Files:**
- Create: `src/components/pao-checkbox/pao-checkbox.ts`
- Create: `src/components/pao-checkbox/pao-checkbox.styles.ts`
- Create: `src/components/pao-checkbox/pao-checkbox.stories.tsx`
- Create: `src/components/pao-checkbox/pao-checkbox.mdx`
- Create: `test/pao-checkbox.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-checkbox.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-checkbox/pao-checkbox.styles', () => ({
  styles: [],
}));

import { PaoCheckbox } from '../src/components/pao-checkbox/pao-checkbox';
import type { CheckboxSize } from '../src/components/pao-checkbox/pao-checkbox';

describe('PaoCheckbox', () => {
  it('has correct default properties', () => {
    const el = new PaoCheckbox();
    expect(el.value).toBe('');
    expect(el.name).toBe('');
    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('accepts all size values', () => {
    const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoCheckbox();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('emits paoChange when handleChange is called', () => {
    const el = new PaoCheckbox();
    el.value = 'apple';
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'apple', checked: true, indeterminate: false },
      })
    );
    expect(el.checked).toBe(true);
    expect(el.indeterminate).toBe(false);
  });

  it('clears indeterminate when handleChange is called', () => {
    const el = new PaoCheckbox();
    el.indeterminate = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.indeterminate).toBe(false);
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoCheckbox();
    el.disabled = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoCheckbox();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-checkbox.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-checkbox/pao-checkbox'`

- [ ] **Step 3: Create component directory and write pao-checkbox.ts**

```bash
mkdir -p src/components/pao-checkbox
```

Create `src/components/pao-checkbox/pao-checkbox.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-checkbox.styles';

export type CheckboxSize = 'sm' | 'md' | 'lg';

@customElement('pao-checkbox')
export class PaoCheckbox extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) size: CheckboxSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  updated(changed: Map<string, unknown>) {
    if (changed.has('indeterminate')) {
      const input = this.shadowRoot?.querySelector('input');
      if (input) input.indeterminate = this.indeterminate;
    }
  }

  private handleChange(e: Event) {
    if (this.disabled) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, checked: this.checked, indeterminate: false },
    }));
  }

  render() {
    const wrapperClasses = ['pao-checkbox-wrapper', this.size, this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <label class=${wrapperClasses} part="wrapper">
        <input
          type="checkbox"
          class="pao-checkbox-input"
          .checked=${this.checked}
          name=${this.name}
          value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange}
        />
        <span class="pao-checkbox-control" part="control"></span>
        ${this.label ? html`<span class="pao-checkbox-label" part="label">${this.label}</span>` : ''}
      </label>
      ${this.error ? html`<span class="pao-checkbox-error" part="error" role="alert">${this.error}</span>` : ''}
      ${this.helperText && !this.error ? html`<span class="pao-checkbox-helper" part="helper">${this.helperText}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-checkbox': PaoCheckbox;
  }
}
```

- [ ] **Step 4: Write pao-checkbox.styles.ts**

Create `src/components/pao-checkbox/pao-checkbox.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-checkbox-wrapper {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .pao-checkbox-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pao-checkbox-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    margin: 0;
  }

  .pao-checkbox-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--pao-border-color);
    border-radius: 4px;
    background-color: var(--pao-body-bg);
    transition: all 0.15s ease;
    position: relative;
  }

  .pao-checkbox-wrapper.sm .pao-checkbox-control { width: 14px; height: 14px; }
  .pao-checkbox-wrapper.md .pao-checkbox-control { width: 16px; height: 16px; }
  .pao-checkbox-wrapper.lg .pao-checkbox-control { width: 20px; height: 20px; }

  .pao-checkbox-input:checked ~ .pao-checkbox-control {
    background-color: var(--pao-color-primary);
    border-color: var(--pao-color-primary);
  }

  .pao-checkbox-input:checked ~ .pao-checkbox-control::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 60%;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg) translate(-10%, -10%);
  }

  .pao-checkbox-input:indeterminate ~ .pao-checkbox-control {
    background-color: var(--pao-color-primary);
    border-color: var(--pao-color-primary);
  }

  .pao-checkbox-input:indeterminate ~ .pao-checkbox-control::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: white;
  }

  .pao-checkbox-input:focus-visible ~ .pao-checkbox-control {
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-checkbox-wrapper.disabled .pao-checkbox-control {
    background-color: var(--pao-color-disabled-background);
    border-color: var(--pao-color-disabled-border);
  }

  .pao-checkbox-label {
    font-size: 0.875rem;
    color: var(--pao-body-color);
    padding-top: 1px;
  }

  .pao-checkbox-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.25rem;
  }

  .pao-checkbox-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.25rem;
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-checkbox.test.ts --no-coverage
```

Expected: PASS — 6 tests passing

- [ ] **Step 6: Write pao-checkbox.stories.tsx**

Create `src/components/pao-checkbox/pao-checkbox.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxSize } from './pao-checkbox';
import './pao-checkbox';

interface CheckboxStoryArgs {
  value: string;
  label: string;
  size: CheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Checkbox',
  component: 'pao-checkbox',
  args: {
    value: 'option',
    label: 'Accept terms and conditions',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: CheckboxStoryArgs) => html`
    <pao-checkbox
      value=${args.value}
      label=${args.label}
      size=${args.size}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
    ></pao-checkbox>
  `,
} as Meta<CheckboxStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all' },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <pao-checkbox size="sm" label="Small" value="sm"></pao-checkbox>
      <pao-checkbox size="md" label="Medium" value="md"></pao-checkbox>
      <pao-checkbox size="lg" label="Large" value="lg"></pao-checkbox>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Required field', error: 'This field is required.' },
};

export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'You can unsubscribe at any time.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled and checked' },
};
```

- [ ] **Step 7: Write pao-checkbox.mdx**

Create `src/components/pao-checkbox/pao-checkbox.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as CheckboxStories from './pao-checkbox.stories';

<Meta of={CheckboxStories} />

# Checkbox

A form control for boolean or indeterminate selections.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Value submitted with forms |
| `name` | `string` | `''` | Input name — set automatically by `pao-checkbox-group` |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Indeterminate state (dash) — typically used for "select all" |
| `disabled` | `boolean` | `false` | Disables interaction |
| `required` | `boolean` | `false` | Marks as required |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size |
| `label` | `string` | `''` | Label text displayed beside the checkbox |
| `error` | `string` | `''` | Error message shown in red below the control |
| `helperText` | `string` | `''` | Helper text shown below the control when no error |

## Events

- `paoChange`: Fired on change. `event.detail = { value: string, checked: boolean, indeterminate: boolean }`
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-checkbox/ test/pao-checkbox.test.ts
git commit -m "feat: add pao-checkbox component with indeterminate support"
```

---

## Task 2: pao-checkbox-group

**Files:**
- Create: `src/components/pao-checkbox-group/pao-checkbox-group.ts`
- Create: `src/components/pao-checkbox-group/pao-checkbox-group.styles.ts`
- Create: `src/components/pao-checkbox-group/pao-checkbox-group.stories.tsx`
- Create: `src/components/pao-checkbox-group/pao-checkbox-group.mdx`
- Create: `test/pao-checkbox-group.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-checkbox-group.test.ts`:

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
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-checkbox-group/pao-checkbox-group.styles', () => ({
  styles: [],
}));

import { PaoCheckboxGroup } from '../src/components/pao-checkbox-group/pao-checkbox-group';
import type { CheckboxGroupOrientation } from '../src/components/pao-checkbox-group/pao-checkbox-group';

describe('PaoCheckboxGroup', () => {
  it('has correct default properties', () => {
    const el = new PaoCheckboxGroup();
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
    expect(el.orientation).toBe('vertical');
  });

  it('accepts orientation values', () => {
    const orientations: CheckboxGroupOrientation[] = ['vertical', 'horizontal'];
    for (const o of orientations) {
      const el = new PaoCheckboxGroup();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('handleSlotChange sets name on child checkboxes', () => {
    const el = new PaoCheckboxGroup();
    el.name = 'fruits';
    const child1 = { name: '', disabled: false };
    const child2 = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child1, child2] as any);

    (el as any).handleSlotChange();

    expect(child1.name).toBe('fruits');
    expect(child2.name).toBe('fruits');
  });

  it('handleSlotChange sets disabled on children when group is disabled', () => {
    const el = new PaoCheckboxGroup();
    el.disabled = true;
    const child1 = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child1] as any);

    (el as any).handleSlotChange();

    expect(child1.disabled).toBe(true);
  });

  it('handleChildChange emits paoChange with checked values', () => {
    const el = new PaoCheckboxGroup();
    const child1 = { checked: true, value: 'apple' };
    const child2 = { checked: false, value: 'banana' };
    const child3 = { checked: true, value: 'cherry' };
    el.querySelectorAll = jest.fn(() => [child1, child2, child3] as any);

    (el as any).handleChildChange();

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { values: ['apple', 'cherry'] },
      })
    );
  });

  it('render returns defined result', () => {
    const el = new PaoCheckboxGroup();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-checkbox-group.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-checkbox-group/pao-checkbox-group'`

- [ ] **Step 3: Create directory and write pao-checkbox-group.ts**

```bash
mkdir -p src/components/pao-checkbox-group
```

Create `src/components/pao-checkbox-group/pao-checkbox-group.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-checkbox-group.styles';

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

@customElement('pao-checkbox-group')
export class PaoCheckboxGroup extends LitElement {
  static styles = styles;

  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) orientation: CheckboxGroupOrientation = 'vertical';

  private handleSlotChange() {
    const children = this.querySelectorAll('pao-checkbox');
    children.forEach(child => {
      if (this.name) (child as any).name = this.name;
      if (this.disabled) (child as any).disabled = true;
    });
  }

  private handleChildChange() {
    const children = Array.from(this.querySelectorAll('pao-checkbox'));
    const values = children
      .filter(child => (child as any).checked)
      .map(child => (child as any).value);

    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { values },
    }));
  }

  render() {
    return html`
      <fieldset class="pao-checkbox-group" part="fieldset">
        ${this.label ? html`<legend class="pao-checkbox-group-legend" part="legend">${this.label}</legend>` : ''}
        <div class="pao-checkbox-group-items ${this.orientation}" part="items" @paoChange=${this.handleChildChange}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.error ? html`<span class="pao-checkbox-group-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error ? html`<span class="pao-checkbox-group-helper" part="helper">${this.helperText}</span>` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-checkbox-group': PaoCheckboxGroup;
  }
}
```

- [ ] **Step 4: Write pao-checkbox-group.styles.ts**

Create `src/components/pao-checkbox-group/pao-checkbox-group.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-checkbox-group {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .pao-checkbox-group-legend {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
    margin-bottom: 0.5rem;
    padding: 0;
  }

  .pao-checkbox-group-items {
    display: flex;
    gap: 0.75rem;
  }

  .pao-checkbox-group-items.vertical {
    flex-direction: column;
  }

  .pao-checkbox-group-items.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .pao-checkbox-group-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.5rem;
  }

  .pao-checkbox-group-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.5rem;
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-checkbox-group.test.ts --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 6: Write pao-checkbox-group.stories.tsx**

Create `src/components/pao-checkbox-group/pao-checkbox-group.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxGroupOrientation } from './pao-checkbox-group';
import './pao-checkbox-group';
import '../pao-checkbox/pao-checkbox';

interface CheckboxGroupStoryArgs {
  name: string;
  label: string;
  disabled: boolean;
  error: string;
  helperText: string;
  orientation: CheckboxGroupOrientation;
}

const meta = {
  title: 'Components/CheckboxGroup',
  component: 'pao-checkbox-group',
  args: {
    name: 'fruits',
    label: 'Favourite Fruits',
    disabled: false,
    error: '',
    helperText: '',
    orientation: 'vertical',
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: CheckboxGroupStoryArgs) => html`
    <pao-checkbox-group
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      error=${args.error}
      helperText=${args.helperText}
      orientation=${args.orientation}
    >
      <pao-checkbox value="apple" label="Apple"></pao-checkbox>
      <pao-checkbox value="banana" label="Banana"></pao-checkbox>
      <pao-checkbox value="cherry" label="Cherry"></pao-checkbox>
    </pao-checkbox-group>
  `,
} as Meta<CheckboxGroupStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxGroupStoryArgs>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const WithError: Story = {
  args: { error: 'Please select at least one option.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Select all that apply.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

- [ ] **Step 7: Write pao-checkbox-group.mdx**

Create `src/components/pao-checkbox-group/pao-checkbox-group.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as CheckboxGroupStories from './pao-checkbox-group.stories';

<Meta of={CheckboxGroupStories} />

# Checkbox Group

A fieldset wrapper that coordinates a set of `pao-checkbox` elements.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `''` | Propagated to all child checkboxes as their `name` attribute |
| `label` | `string` | `''` | Group label rendered as a `<legend>` |
| `disabled` | `boolean` | `false` | Disables all child checkboxes |
| `error` | `string` | `''` | Error message shown below the group |
| `helperText` | `string` | `''` | Helper text shown below the group when no error |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the checkboxes |

## Events

- `paoChange`: Fired when any child checkbox changes. `event.detail = { values: string[] }` — array of all currently checked values.
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-checkbox-group/ test/pao-checkbox-group.test.ts
git commit -m "feat: add pao-checkbox-group component"
```

---

## Task 3: pao-radio

**Files:**
- Create: `src/components/pao-radio/pao-radio.ts`
- Create: `src/components/pao-radio/pao-radio.styles.ts`
- Create: `src/components/pao-radio/pao-radio.stories.tsx`
- Create: `src/components/pao-radio/pao-radio.mdx`
- Create: `test/pao-radio.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-radio.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-radio/pao-radio.styles', () => ({
  styles: [],
}));

import { PaoRadio } from '../src/components/pao-radio/pao-radio';
import type { RadioSize } from '../src/components/pao-radio/pao-radio';

describe('PaoRadio', () => {
  it('has correct default properties', () => {
    const el = new PaoRadio();
    expect(el.value).toBe('');
    expect(el.name).toBe('');
    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('accepts all size values', () => {
    const sizes: RadioSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoRadio();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('emits paoChange when handleChange is called', () => {
    const el = new PaoRadio();
    el.value = 'option-a';
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'option-a', checked: true },
      })
    );
    expect(el.checked).toBe(true);
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoRadio();
    el.disabled = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoRadio();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-radio.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-radio/pao-radio'`

- [ ] **Step 3: Create directory and write pao-radio.ts**

```bash
mkdir -p src/components/pao-radio
```

Create `src/components/pao-radio/pao-radio.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-radio.styles';

export type RadioSize = 'sm' | 'md' | 'lg';

@customElement('pao-radio')
export class PaoRadio extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) size: RadioSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  private handleChange(e: Event) {
    if (this.disabled) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, checked: this.checked },
    }));
  }

  render() {
    const wrapperClasses = ['pao-radio-wrapper', this.size, this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <label class=${wrapperClasses} part="wrapper">
        <input
          type="radio"
          class="pao-radio-input"
          .checked=${this.checked}
          name=${this.name}
          value=${this.value}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="pao-radio-control" part="control"></span>
        ${this.label ? html`<span class="pao-radio-label" part="label">${this.label}</span>` : ''}
      </label>
      ${this.error ? html`<span class="pao-radio-error" part="error" role="alert">${this.error}</span>` : ''}
      ${this.helperText && !this.error ? html`<span class="pao-radio-helper" part="helper">${this.helperText}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-radio': PaoRadio;
  }
}
```

- [ ] **Step 4: Write pao-radio.styles.ts**

Create `src/components/pao-radio/pao-radio.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-radio-wrapper {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .pao-radio-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pao-radio-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    margin: 0;
  }

  .pao-radio-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--pao-border-color);
    border-radius: 50%;
    background-color: var(--pao-body-bg);
    transition: all 0.15s ease;
    position: relative;
  }

  .pao-radio-wrapper.sm .pao-radio-control { width: 14px; height: 14px; }
  .pao-radio-wrapper.md .pao-radio-control { width: 16px; height: 16px; }
  .pao-radio-wrapper.lg .pao-radio-control { width: 20px; height: 20px; }

  .pao-radio-input:checked ~ .pao-radio-control {
    border-color: var(--pao-color-primary);
  }

  .pao-radio-input:checked ~ .pao-radio-control::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--pao-color-primary);
  }

  .pao-radio-input:focus-visible ~ .pao-radio-control {
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-radio-wrapper.disabled .pao-radio-control {
    background-color: var(--pao-color-disabled-background);
    border-color: var(--pao-color-disabled-border);
  }

  .pao-radio-label {
    font-size: 0.875rem;
    color: var(--pao-body-color);
    padding-top: 1px;
  }

  .pao-radio-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.25rem;
  }

  .pao-radio-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.25rem;
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-radio.test.ts --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 6: Write pao-radio.stories.tsx**

Create `src/components/pao-radio/pao-radio.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioSize } from './pao-radio';
import './pao-radio';

interface RadioStoryArgs {
  value: string;
  label: string;
  size: RadioSize;
  checked: boolean;
  disabled: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Radio',
  component: 'pao-radio',
  args: {
    value: 'option',
    label: 'Option A',
    size: 'md',
    checked: false,
    disabled: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: RadioStoryArgs) => html`
    <pao-radio
      value=${args.value}
      label=${args.label}
      size=${args.size}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      error=${args.error}
      helperText=${args.helperText}
    ></pao-radio>
  `,
} as Meta<RadioStoryArgs>;

export default meta;
type Story = StoryObj<RadioStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <pao-radio size="sm" label="Small" value="sm"></pao-radio>
      <pao-radio size="md" label="Medium" value="md"></pao-radio>
      <pao-radio size="lg" label="Large" value="lg"></pao-radio>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled radio' },
};

export const WithError: Story = {
  args: { label: 'Option A', error: 'Please select an option.' },
};
```

- [ ] **Step 7: Write pao-radio.mdx**

Create `src/components/pao-radio/pao-radio.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as RadioStories from './pao-radio.stories';

<Meta of={RadioStories} />

# Radio

A form control for selecting a single option from a set. Use inside `pao-radio-group` to enforce mutual exclusion.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Value submitted with forms |
| `name` | `string` | `''` | Input name — set automatically by `pao-radio-group` |
| `checked` | `boolean` | `false` | Whether this radio is selected |
| `disabled` | `boolean` | `false` | Disables interaction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size |
| `label` | `string` | `''` | Label text displayed beside the radio |
| `error` | `string` | `''` | Error message shown in red below the control |
| `helperText` | `string` | `''` | Helper text shown below the control when no error |

## Events

- `paoChange`: Fired on selection. `event.detail = { value: string, checked: boolean }`
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-radio/ test/pao-radio.test.ts
git commit -m "feat: add pao-radio component"
```

---

## Task 4: pao-radio-group

**Files:**
- Create: `src/components/pao-radio-group/pao-radio-group.ts`
- Create: `src/components/pao-radio-group/pao-radio-group.styles.ts`
- Create: `src/components/pao-radio-group/pao-radio-group.stories.tsx`
- Create: `src/components/pao-radio-group/pao-radio-group.mdx`
- Create: `test/pao-radio-group.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-radio-group.test.ts`:

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
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-radio-group/pao-radio-group.styles', () => ({
  styles: [],
}));

import { PaoRadioGroup } from '../src/components/pao-radio-group/pao-radio-group';
import type { RadioGroupOrientation } from '../src/components/pao-radio-group/pao-radio-group';

describe('PaoRadioGroup', () => {
  it('has correct default properties', () => {
    const el = new PaoRadioGroup();
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.value).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
    expect(el.orientation).toBe('vertical');
  });

  it('accepts orientation values', () => {
    const orientations: RadioGroupOrientation[] = ['vertical', 'horizontal'];
    for (const o of orientations) {
      const el = new PaoRadioGroup();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('handleSlotChange sets name and disabled on child radios', () => {
    const el = new PaoRadioGroup();
    el.name = 'plan';
    el.disabled = true;
    const child = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child] as any);

    (el as any).handleSlotChange();

    expect(child.name).toBe('plan');
    expect(child.disabled).toBe(true);
  });

  it('handleChildChange unchecks all siblings and checks the selected radio', () => {
    const el = new PaoRadioGroup();
    const child1 = { value: 'a', checked: true };
    const child2 = { value: 'b', checked: true };
    const child3 = { value: 'c', checked: false };
    el.querySelectorAll = jest.fn(() => [child1, child2, child3] as any);

    const fakeEvent = new CustomEvent('paoChange', { detail: { value: 'b', checked: true } });
    (el as any).handleChildChange(fakeEvent);

    expect(child1.checked).toBe(false);
    expect(child2.checked).toBe(true);
    expect(child3.checked).toBe(false);
  });

  it('handleChildChange updates own value and emits paoChange', () => {
    const el = new PaoRadioGroup();
    const child = { value: 'pro', checked: false };
    el.querySelectorAll = jest.fn(() => [child] as any);

    const fakeEvent = new CustomEvent('paoChange', { detail: { value: 'pro', checked: true } });
    (el as any).handleChildChange(fakeEvent);

    expect(el.value).toBe('pro');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'pro' },
      })
    );
  });

  it('render returns defined result', () => {
    const el = new PaoRadioGroup();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-radio-group.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-radio-group/pao-radio-group'`

- [ ] **Step 3: Create directory and write pao-radio-group.ts**

```bash
mkdir -p src/components/pao-radio-group
```

Create `src/components/pao-radio-group/pao-radio-group.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-radio-group.styles';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

@customElement('pao-radio-group')
export class PaoRadioGroup extends LitElement {
  static styles = styles;

  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) orientation: RadioGroupOrientation = 'vertical';

  private handleSlotChange() {
    const children = this.querySelectorAll('pao-radio');
    children.forEach(child => {
      if (this.name) (child as any).name = this.name;
      if (this.disabled) (child as any).disabled = true;
    });
  }

  private handleChildChange(e: CustomEvent) {
    const selectedValue = e.detail.value;
    const children = Array.from(this.querySelectorAll('pao-radio'));
    children.forEach(child => {
      (child as any).checked = (child as any).value === selectedValue;
    });
    this.value = selectedValue;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: selectedValue },
    }));
  }

  render() {
    return html`
      <fieldset class="pao-radio-group" part="fieldset" ?aria-required=${this.required}>
        ${this.label ? html`<legend class="pao-radio-group-legend" part="legend">${this.label}</legend>` : ''}
        <div class="pao-radio-group-items ${this.orientation}" part="items" @paoChange=${this.handleChildChange}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.error ? html`<span class="pao-radio-group-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error ? html`<span class="pao-radio-group-helper" part="helper">${this.helperText}</span>` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-radio-group': PaoRadioGroup;
  }
}
```

- [ ] **Step 4: Write pao-radio-group.styles.ts**

Create `src/components/pao-radio-group/pao-radio-group.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-radio-group {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .pao-radio-group-legend {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
    margin-bottom: 0.5rem;
    padding: 0;
  }

  .pao-radio-group-items {
    display: flex;
    gap: 0.75rem;
  }

  .pao-radio-group-items.vertical {
    flex-direction: column;
  }

  .pao-radio-group-items.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .pao-radio-group-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.5rem;
  }

  .pao-radio-group-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.5rem;
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-radio-group.test.ts --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 6: Write pao-radio-group.stories.tsx**

Create `src/components/pao-radio-group/pao-radio-group.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupOrientation } from './pao-radio-group';
import './pao-radio-group';
import '../pao-radio/pao-radio';

interface RadioGroupStoryArgs {
  name: string;
  label: string;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
  orientation: RadioGroupOrientation;
}

const meta = {
  title: 'Components/RadioGroup',
  component: 'pao-radio-group',
  args: {
    name: 'plan',
    label: 'Select a plan',
    disabled: false,
    required: false,
    error: '',
    helperText: '',
    orientation: 'vertical',
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: RadioGroupStoryArgs) => html`
    <pao-radio-group
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
      orientation=${args.orientation}
    >
      <pao-radio value="free" label="Free"></pao-radio>
      <pao-radio value="pro" label="Pro"></pao-radio>
      <pao-radio value="enterprise" label="Enterprise"></pao-radio>
    </pao-radio-group>
  `,
} as Meta<RadioGroupStoryArgs>;

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const WithError: Story = {
  args: { error: 'Please select a plan.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'You can change your plan at any time.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

- [ ] **Step 7: Write pao-radio-group.mdx**

Create `src/components/pao-radio-group/pao-radio-group.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as RadioGroupStories from './pao-radio-group.stories';

<Meta of={RadioGroupStories} />

# Radio Group

A fieldset wrapper that coordinates a set of `pao-radio` elements, enforcing single selection.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `''` | Propagated to all child radios as their `name` attribute |
| `label` | `string` | `''` | Group label rendered as a `<legend>` |
| `value` | `string` | `''` | Currently selected value |
| `disabled` | `boolean` | `false` | Disables all child radios |
| `required` | `boolean` | `false` | Marks the group as required |
| `error` | `string` | `''` | Error message shown below the group |
| `helperText` | `string` | `''` | Helper text shown below the group when no error |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the radios |

## Events

- `paoChange`: Fired when selection changes. `event.detail = { value: string }` — the selected radio's value.
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-radio-group/ test/pao-radio-group.test.ts
git commit -m "feat: add pao-radio-group component"
```

---

## Task 5: pao-select-option

**Files:**
- Create: `src/components/pao-select-option/pao-select-option.ts`
- Create: `src/components/pao-select-option/pao-select-option.styles.ts`
- Create: `test/pao-select-option.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-select-option.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-select-option/pao-select-option.styles', () => ({
  styles: [],
}));

import { PaoSelectOption } from '../src/components/pao-select-option/pao-select-option';

describe('PaoSelectOption', () => {
  it('has correct default properties', () => {
    const el = new PaoSelectOption();
    expect(el.value).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.selected).toBe(false);
  });

  it('emits paoSelectOption when handleClick is called', () => {
    const el = new PaoSelectOption();
    el.value = 'option-a';

    (el as any).handleClick();

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoSelectOption',
        detail: { value: 'option-a' },
      })
    );
  });

  it('does not emit paoSelectOption when disabled', () => {
    const el = new PaoSelectOption();
    el.disabled = true;

    (el as any).handleClick();

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoSelectOption();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-select-option.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-select-option/pao-select-option'`

- [ ] **Step 3: Create directory and write pao-select-option.ts**

```bash
mkdir -p src/components/pao-select-option
```

Create `src/components/pao-select-option/pao-select-option.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-select-option.styles';

@customElement('pao-select-option')
export class PaoSelectOption extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoSelectOption', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  render() {
    const classes = ['pao-select-option', this.selected ? 'selected' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <div
        class=${classes}
        part="option"
        role="option"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.selected ? html`<span class="pao-select-option-check" part="check" aria-hidden="true">✓</span>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-select-option': PaoSelectOption;
  }
}
```

- [ ] **Step 4: Write pao-select-option.styles.ts**

Create `src/components/pao-select-option/pao-select-option.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-select-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-body-color);
    transition: background-color 0.1s ease;
  }

  .pao-select-option:hover:not(.disabled) {
    background-color: var(--pao-gray-100);
  }

  .pao-select-option.selected {
    background-color: var(--pao-color-primary-light);
    color: var(--pao-color-primary-dark);
    font-weight: 500;
  }

  .pao-select-option.disabled {
    color: var(--pao-color-disabled-text);
    cursor: not-allowed;
    pointer-events: none;
  }

  .pao-select-option-check {
    font-size: 0.75rem;
    color: var(--pao-color-primary);
    width: 1rem;
    text-align: center;
    flex-shrink: 0;
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-select-option.test.ts --no-coverage
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/pao-select-option/ test/pao-select-option.test.ts
git commit -m "feat: add pao-select-option component"
```

---

## Task 6: pao-select

**Files:**
- Create: `src/components/pao-select/pao-select.ts`
- Create: `src/components/pao-select/pao-select.styles.ts`
- Create: `src/components/pao-select/pao-select.stories.tsx`
- Create: `src/components/pao-select/pao-select.mdx`
- Create: `test/pao-select.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/pao-select.test.ts`:

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
    contains = jest.fn(() => false);
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-select/pao-select.styles', () => ({
  styles: [],
}));

import { PaoSelect } from '../src/components/pao-select/pao-select';
import type { SelectSize } from '../src/components/pao-select/pao-select';

describe('PaoSelect', () => {
  it('has correct default properties', () => {
    const el = new PaoSelect();
    expect(el.value).toBe('');
    expect(el.values).toEqual([]);
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.placeholder).toBe('Select...');
    expect(el.multiple).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.size).toBe('md');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('open is false by default', () => {
    const el = new PaoSelect();
    expect((el as any).open).toBe(false);
  });

  it('accepts all size values', () => {
    const sizes: SelectSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoSelect();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('handleTriggerClick opens the dropdown', () => {
    const el = new PaoSelect();
    const addEventSpy = jest.spyOn(document, 'addEventListener');

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(true);
    expect(addEventSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addEventSpy.mockRestore();
  });

  it('handleTriggerClick does not open when disabled', () => {
    const el = new PaoSelect();
    el.disabled = true;

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(false);
  });

  it('handleTriggerClick closes when already open', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(false);
    removeEventSpy.mockRestore();
  });

  it('_selectValue (single) sets value and closes dropdown', () => {
    const el = new PaoSelect();
    (el as any).open = true;

    (el as any)._selectValue('orange');

    expect(el.value).toBe('orange');
    expect((el as any).open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'orange', values: [] },
      })
    );
  });

  it('_selectValue (multiple) toggles values and stays open', () => {
    const el = new PaoSelect();
    el.multiple = true;
    (el as any).open = true;

    (el as any)._selectValue('apple');
    expect(el.values).toEqual(['apple']);
    expect((el as any).open).toBe(true);

    (el as any)._selectValue('banana');
    expect(el.values).toEqual(['apple', 'banana']);

    (el as any)._selectValue('apple');
    expect(el.values).toEqual(['banana']);
  });

  it('handleKeydown Escape closes the dropdown', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    (el as any).handleKeydown({ key: 'Escape', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any).open).toBe(false);
    removeEventSpy.mockRestore();
  });

  it('render returns defined result', () => {
    const el = new PaoSelect();
    expect(el.render()).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest test/pao-select.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '../src/components/pao-select/pao-select'`

- [ ] **Step 3: Create directory and write pao-select.ts**

```bash
mkdir -p src/components/pao-select
```

Create `src/components/pao-select/pao-select.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-select.styles';

export type SelectSize = 'sm' | 'md' | 'lg';

@customElement('pao-select')
export class PaoSelect extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: Array }) values: string[] = [];
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) size: SelectSize = 'md';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  @state() private open = false;
  @state() private _focusedIndex = -1;

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node) && !this.shadowRoot?.contains(e.target as Node)) {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    }
  };

  private handleTriggerClick() {
    if (this.disabled) return;
    if (this.open) {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    } else {
      this.open = true;
      this._focusedIndex = -1;
      document.addEventListener('mousedown', this._handleOutsideClick);
    }
  }

  private _syncOptions() {
    const options = this.querySelectorAll('pao-select-option');
    options.forEach(opt => {
      const v = (opt as any).value;
      (opt as any).selected = this.multiple ? this.values.includes(v) : v === this.value;
    });
  }

  private _selectValue(value: string) {
    if (this.multiple) {
      const newValues = [...this.values];
      const idx = newValues.indexOf(value);
      if (idx === -1) newValues.push(value);
      else newValues.splice(idx, 1);
      this.values = newValues;
    } else {
      this.value = value;
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    }
    this._syncOptions();
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, values: this.values },
    }));
  }

  private handleOptionSelect(e: CustomEvent) {
    this._selectValue(e.detail.value);
  }

  private handleKeydown(e: KeyboardEvent) {
    const options = Array.from(this.querySelectorAll('pao-select-option:not([disabled])'));
    if (e.key === 'Escape') {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, options.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
    } else if ((e.key === 'Enter' || e.key === ' ') && this._focusedIndex >= 0) {
      e.preventDefault();
      const option = options[this._focusedIndex] as any;
      if (option) this._selectValue(option.value);
    }
  }

  private getDisplayText(): string {
    if (this.multiple) {
      if (this.values.length === 0) return '';
      if (this.values.length === 1) {
        const opt = Array.from(this.querySelectorAll('pao-select-option'))
          .find(o => (o as any).value === this.values[0]);
        return opt?.textContent?.trim() || this.values[0];
      }
      return `${this.values.length} selected`;
    }
    if (!this.value) return '';
    const opt = Array.from(this.querySelectorAll('pao-select-option'))
      .find(o => (o as any).value === this.value);
    return opt?.textContent?.trim() || this.value;
  }

  render() {
    const triggerClasses = ['pao-select-trigger', this.size, this.error ? 'error' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    const displayText = this.getDisplayText();

    return html`
      <div class="pao-select-wrapper" part="wrapper" @keydown=${this.handleKeydown}>
        ${this.label ? html`
          <label class="pao-select-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" aria-hidden="true">*</span>` : ''}
          </label>
        ` : ''}
        <div
          class=${triggerClasses}
          part="trigger"
          role="combobox"
          aria-expanded=${this.open}
          aria-haspopup="listbox"
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleTriggerClick}
        >
          <span class="pao-select-display ${displayText ? '' : 'placeholder'}" part="display">
            ${displayText || this.placeholder}
          </span>
          <span class="pao-select-chevron ${this.open ? 'open' : ''}" part="chevron" aria-hidden="true">▾</span>
        </div>
        ${this.open ? html`
          <div class="pao-select-panel" part="panel" role="listbox" aria-multiselectable=${this.multiple}>
            <slot @paoSelectOption=${this.handleOptionSelect}></slot>
          </div>
        ` : ''}
        ${this.error ? html`<span class="pao-select-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error ? html`<span class="pao-select-helper" part="helper">${this.helperText}</span>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-select': PaoSelect;
  }
}
```

- [ ] **Step 4: Write pao-select.styles.ts**

Create `src/components/pao-select/pao-select.styles.ts`:

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    --pao-select-z-index: 1000;
  }

  .pao-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
  }

  .pao-select-label {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
  }

  .pao-select-label .required-mark {
    color: var(--pao-color-danger);
    margin-left: 0.25rem;
  }

  .pao-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid var(--pao-border-color);
    border-radius: 6px;
    background-color: var(--pao-body-bg);
    color: var(--pao-body-color);
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    user-select: none;
  }

  .pao-select-trigger:focus {
    border-color: var(--pao-color-primary);
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-select-trigger.error {
    border-color: var(--pao-color-danger);
  }

  .pao-select-trigger.error:focus {
    box-shadow: 0 0 0 3px var(--pao-color-danger-light);
  }

  .pao-select-trigger.disabled {
    background-color: var(--pao-color-disabled-background);
    color: var(--pao-color-disabled-text);
    border-color: var(--pao-color-disabled-border);
    cursor: not-allowed;
  }

  .pao-select-trigger.sm { padding: 0.375rem 0.75rem; font-size: 0.875rem; min-height: 2rem; }
  .pao-select-trigger.md { padding: 0.5rem 1rem; font-size: 1rem; min-height: 2.5rem; }
  .pao-select-trigger.lg { padding: 0.75rem 1.25rem; font-size: 1.125rem; min-height: 3rem; }

  .pao-select-display {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pao-select-display.placeholder {
    color: var(--pao-gray-500);
  }

  .pao-select-chevron {
    display: inline-block;
    transition: transform 0.2s ease;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  .pao-select-chevron.open {
    transform: rotate(180deg);
  }

  .pao-select-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background-color: var(--pao-body-bg);
    border: 1px solid var(--pao-border-color);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: var(--pao-select-z-index);
    overflow: hidden;
    max-height: 200px;
    overflow-y: auto;
  }

  .pao-select-error {
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
  }

  .pao-select-helper {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
  }
`;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx jest test/pao-select.test.ts --no-coverage
```

Expected: PASS — 9 tests passing

- [ ] **Step 6: Write pao-select.stories.tsx**

Create `src/components/pao-select/pao-select.stories.tsx`:

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectSize } from './pao-select';
import './pao-select';
import '../pao-select-option/pao-select-option';

interface SelectStoryArgs {
  label: string;
  placeholder: string;
  size: SelectSize;
  multiple: boolean;
  disabled: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Select',
  component: 'pao-select',
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    size: 'md',
    multiple: false,
    disabled: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  render: (args: SelectStoryArgs) => html`
    <pao-select
      label=${args.label}
      placeholder=${args.placeholder}
      size=${args.size}
      ?multiple=${args.multiple}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
      style="max-width: 320px"
    >
      <pao-select-option value="au">Australia</pao-select-option>
      <pao-select-option value="ca">Canada</pao-select-option>
      <pao-select-option value="fr">France</pao-select-option>
      <pao-select-option value="de">Germany</pao-select-option>
      <pao-select-option value="jp">Japan</pao-select-option>
      <pao-select-option value="gb">United Kingdom</pao-select-option>
      <pao-select-option value="us">United States</pao-select-option>
    </pao-select>
  `,
} as Meta<SelectStoryArgs>;

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Default: Story = {};

export const MultiSelect: Story = {
  args: { label: 'Skills', placeholder: 'Select skills...', multiple: true },
  render: () => html`
    <pao-select label="Skills" placeholder="Select skills..." multiple style="max-width: 320px">
      <pao-select-option value="ts">TypeScript</pao-select-option>
      <pao-select-option value="react">React</pao-select-option>
      <pao-select-option value="vue">Vue</pao-select-option>
      <pao-select-option value="lit">Lit</pao-select-option>
      <pao-select-option value="node">Node.js</pao-select-option>
    </pao-select>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <pao-select size="sm" label="Small" placeholder="Small select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
      <pao-select size="md" label="Medium" placeholder="Medium select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
      <pao-select size="lg" label="Large" placeholder="Large select...">
        <pao-select-option value="a">Option A</pao-select-option>
        <pao-select-option value="b">Option B</pao-select-option>
      </pao-select>
    </div>
  `,
};

export const WithError: Story = {
  args: { label: 'Country', error: 'Please select a country.' },
};

export const WithHelperText: Story = {
  args: { label: 'Country', helperText: 'Select the country you reside in.' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled Select' },
};

export const WithDisabledOption: Story = {
  render: () => html`
    <pao-select label="Role" placeholder="Select a role..." style="max-width: 320px">
      <pao-select-option value="admin">Admin</pao-select-option>
      <pao-select-option value="editor">Editor</pao-select-option>
      <pao-select-option value="viewer" disabled>Viewer (unavailable)</pao-select-option>
    </pao-select>
  `,
};
```

- [ ] **Step 7: Write pao-select.mdx**

Create `src/components/pao-select/pao-select.mdx`:

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as SelectStories from './pao-select.stories';

<Meta of={SelectStories} />

# Select

A custom dropdown for single or multi-option selection. Styled to match `pao-input`, with keyboard navigation and click-outside support.

## Interactive Demo

<Primary />

## Properties

<Controls />

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Selected value (single-select mode) |
| `values` | `string[]` | `[]` | Selected values (multi-select mode) |
| `name` | `string` | `''` | Input name for form submission |
| `label` | `string` | `''` | Label displayed above the trigger |
| `placeholder` | `string` | `'Select...'` | Placeholder shown when nothing is selected |
| `multiple` | `boolean` | `false` | Enables multi-select mode |
| `disabled` | `boolean` | `false` | Disables the select |
| `required` | `boolean` | `false` | Marks as required (adds * to label) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger size |
| `error` | `string` | `''` | Error message shown below the trigger |
| `helperText` | `string` | `''` | Helper text shown below the trigger when no error |

## Events

- `paoChange`: Fired on selection. `event.detail = { value: string, values: string[] }` — both always present.

## pao-select-option

Options are slotted `<pao-select-option>` elements.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The value emitted on selection |
| `disabled` | `boolean` | `false` | Prevents this option from being selected |
| `selected` | `boolean` | `false` | Set automatically by `pao-select` — do not set manually |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowDown` | Move focus to next option |
| `ArrowUp` | Move focus to previous option |
| `Enter` / `Space` | Select focused option |
| `Escape` | Close dropdown |
```

- [ ] **Step 8: Commit**

```bash
git add src/components/pao-select/ test/pao-select.test.ts
git commit -m "feat: add pao-select and pao-select-option components"
```

---

## Task 7: Export all components from index.ts

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Update src/index.ts to export all 6 new components**

Open `src/index.ts` and add the 6 new exports. The file should look like this after modification:

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
```

- [ ] **Step 2: Run the full test suite to confirm no regressions**

```bash
npm test -- --no-coverage
```

Expected: All tests passing (existing + new 6 test files)

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: export pao-checkbox, pao-checkbox-group, pao-radio, pao-radio-group, pao-select, pao-select-option from library"
```
