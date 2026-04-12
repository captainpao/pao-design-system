# New Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `pao-input`, `pao-badge`, and `pao-spinner` components to the pao-design-system library.

**Architecture:** Each component follows the established Lit element pattern: a `.ts` implementation file, a `.styles.ts` file using Lit `css` template literals importing foundation SCSS, a `.stories.tsx` for Storybook, an `.mdx` docs file, and a Jest test in `test/`. Each component is exported from `src/index.ts`. Tests use the same mock-Lit pattern as `pao-button`.

**Tech Stack:** Lit 3, TypeScript 5.3, Storybook 10, Jest 30 (jsdom, ts-jest)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/pao-input/pao-input.ts` | Create | Input component implementation |
| `src/components/pao-input/pao-input.styles.ts` | Create | Input styles (Lit css) |
| `src/components/pao-input/pao-input.stories.tsx` | Create | Storybook stories |
| `test/pao-input.jest.test.ts` | Create | Jest unit tests |
| `src/components/pao-badge/pao-badge.ts` | Create | Badge component implementation |
| `src/components/pao-badge/pao-badge.styles.ts` | Create | Badge styles (Lit css) |
| `src/components/pao-badge/pao-badge.stories.tsx` | Create | Storybook stories |
| `test/pao-badge.jest.test.ts` | Create | Jest unit tests |
| `src/components/pao-spinner/pao-spinner.ts` | Create | Spinner component implementation |
| `src/components/pao-spinner/pao-spinner.styles.ts` | Create | Spinner styles (Lit css) |
| `src/components/pao-spinner/pao-spinner.stories.tsx` | Create | Storybook stories |
| `test/pao-spinner.jest.test.ts` | Create | Jest unit tests |
| `src/index.ts` | Modify | Export all three new components |

---

## Task 1: pao-input — Tests

**Files:**
- Create: `test/pao-input.jest.test.ts`

- [ ] **Step 1: Create the test file**

```typescript
// test/pao-input.jest.test.ts
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

jest.mock('../src/components/pao-input/pao-input.styles', () => ({
  styles: [],
}));

import { PaoInput } from '../src/components/pao-input/pao-input';

describe('PaoInput', () => {
  let element: PaoInput;

  beforeEach(() => {
    element = new PaoInput();
    element.shadowRoot = { querySelector: jest.fn() } as any;
    const listeners: { [k: string]: Function[] } = {};
    element.addEventListener = jest.fn((e: string, h: Function) => {
      (listeners[e] ??= []).push(h);
    });
    element.dispatchEvent = jest.fn((e: CustomEvent) => {
      (listeners[e.type] ?? []).forEach(h => h(e));
      return true;
    });
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.type).toBe('text');
    expect(element.value).toBe('');
    expect(element.placeholder).toBe('');
    expect(element.label).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.required).toBe(false);
    expect(element.error).toBe('');
    expect(element.helperText).toBe('');
    expect(element.size).toBe('md');
    expect(element.name).toBe('');
  });

  it('accepts all input types', () => {
    element.type = 'password';
    expect(element.type).toBe('password');
    element.type = 'email';
    expect(element.type).toBe('email');
    element.type = 'number';
    expect(element.type).toBe('number');
    element.type = 'search';
    expect(element.type).toBe('search');
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('renders with error state', () => {
    element.error = 'This field is required';
    expect(element.render()).toBeDefined();
  });

  it('renders with helper text', () => {
    element.helperText = 'Enter your full name';
    expect(element.render()).toBeDefined();
  });

  it('renders disabled', () => {
    element.disabled = true;
    expect(element.render()).toBeDefined();
  });

  it('renders readonly', () => {
    element.readonly = true;
    expect(element.render()).toBeDefined();
  });

  it('emits paoInput on handleInput', () => {
    const handler = jest.fn();
    element.addEventListener('paoInput', handler);
    const fakeEvent = { target: { value: 'hello' } } as unknown as InputEvent;
    (element as any).handleInput(fakeEvent);
    expect(handler).toHaveBeenCalled();
    expect(element.value).toBe('hello');
  });

  it('emits paoChange on handleChange', () => {
    const handler = jest.fn();
    element.addEventListener('paoChange', handler);
    const fakeEvent = { target: { value: 'world' } } as unknown as Event;
    (element as any).handleChange(fakeEvent);
    expect(handler).toHaveBeenCalled();
  });

  it('does not emit events when disabled', () => {
    element.disabled = true;
    const handler = jest.fn();
    element.addEventListener('paoInput', handler);
    const fakeEvent = { target: { value: 'hi' } } as unknown as InputEvent;
    (element as any).handleInput(fakeEvent);
    expect(handler).not.toHaveBeenCalled();
  });

  it('has static styles', () => {
    expect(PaoInput.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure (module not found)**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-input.jest.test.ts --no-coverage 2>&1 | tail -20
```

Expected: `Cannot find module '../src/components/pao-input/pao-input'`

---

## Task 2: pao-input — Implementation

**Files:**
- Create: `src/components/pao-input/pao-input.styles.ts`
- Create: `src/components/pao-input/pao-input.ts`

- [ ] **Step 1: Create styles file**

```typescript
// src/components/pao-input/pao-input.styles.ts
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    --pao-input-border-radius: 6px;
    --pao-input-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pao-input-label {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
  }

  .pao-input-label .required-mark {
    color: var(--pao-color-danger);
    margin-left: 0.25rem;
  }

  .pao-input {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    width: 100%;
    border: 1px solid var(--pao-border-color);
    border-radius: var(--pao-input-border-radius);
    background-color: var(--pao-body-bg);
    color: var(--pao-body-color);
    transition: var(--pao-input-transition);
    outline: none;
    box-sizing: border-box;
  }

  .pao-input:focus {
    border-color: var(--pao-color-primary);
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-input:disabled {
    background-color: var(--pao-color-disabled-background);
    color: var(--pao-color-disabled-text);
    border-color: var(--pao-color-disabled-border);
    cursor: not-allowed;
  }

  .pao-input[readonly] {
    background-color: var(--pao-gray-100);
    cursor: default;
  }

  .pao-input.error {
    border-color: var(--pao-color-danger);
    box-shadow: none;
  }

  .pao-input.error:focus {
    box-shadow: 0 0 0 3px var(--pao-color-danger-light);
  }

  /* Sizes */
  .pao-input.sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    min-height: 2rem;
  }

  .pao-input.md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    min-height: 2.5rem;
  }

  .pao-input.lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    min-height: 3rem;
  }

  .pao-input-helper {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
  }

  .pao-input-error {
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
  }
`;
```

- [ ] **Step 2: Create component file**

```typescript
// src/components/pao-input/pao-input.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-input.styles';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

@customElement('pao-input')
export class PaoInput extends LitElement {
  static styles = styles;

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  @property({ type: String }) size: InputSize = 'md';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) required = false;

  private handleInput(e: InputEvent) {
    if (this.disabled) return;
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('paoInput', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, originalEvent: e },
    }));
  }

  private handleChange(e: Event) {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: (e.target as HTMLInputElement).value, originalEvent: e },
    }));
  }

  render() {
    const inputClasses = ['pao-input', this.size, this.error ? 'error' : ''].filter(Boolean).join(' ');
    const helperId = this.helperText ? 'helper' : undefined;
    const errorId = this.error ? 'error' : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return html`
      <div class="pao-input-wrapper" part="wrapper">
        ${this.label ? html`
          <label class="pao-input-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" aria-hidden="true">*</span>` : ''}
          </label>
        ` : ''}
        <input
          part="input"
          class=${inputClasses}
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${this.name}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-describedby=${describedBy ?? ''}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${this.error ? html`
          <span id="error" class="pao-input-error" part="error" role="alert">${this.error}</span>
        ` : ''}
        ${this.helperText && !this.error ? html`
          <span id="helper" class="pao-input-helper" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-input': PaoInput;
  }
}
```

- [ ] **Step 3: Run tests — expect pass**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-input.jest.test.ts --no-coverage 2>&1 | tail -20
```

Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/pao-input/ test/pao-input.jest.test.ts
git commit -m "feat: add pao-input component with label, validation states, and sizes"
```

---

## Task 3: pao-input — Storybook & Export

**Files:**
- Create: `src/components/pao-input/pao-input.stories.tsx`
- Modify: `src/index.ts`

- [ ] **Step 1: Create stories file**

```typescript
// src/components/pao-input/pao-input.stories.tsx
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputSize, InputType } from './pao-input';
import './pao-input';

interface InputStoryArgs {
  type: InputType;
  value: string;
  placeholder: string;
  label: string;
  size: InputSize;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: string;
  helperText: string;
}

const meta = {
  title: 'Components/Input',
  component: 'pao-input',
  args: {
    type: 'text',
    value: '',
    placeholder: 'Enter text...',
    label: 'Label',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    error: '',
    helperText: '',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
  render: (args: InputStoryArgs) => html`
    <pao-input
      type=${args.type}
      value=${args.value}
      placeholder=${args.placeholder}
      label=${args.label}
      size=${args.size}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      error=${args.error}
      helperText=${args.helperText}
      style="max-width: 400px"
    ></pao-input>
  `,
} as Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Full Name', placeholder: 'John Doe' },
};

export const Required: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
};

export const WithHelperText: Story = {
  args: { label: 'Username', helperText: 'Must be 3–20 characters, letters and numbers only.' },
};

export const WithError: Story = {
  args: { label: 'Email', value: 'notanemail', error: 'Please enter a valid email address.' },
};

export const Disabled: Story = {
  args: { label: 'Disabled Input', value: 'Cannot edit this', disabled: true },
};

export const Readonly: Story = {
  args: { label: 'Read-only', value: 'Read-only value', readonly: true },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pao-input size="sm" label="Small" placeholder="Small input"></pao-input>
      <pao-input size="md" label="Medium" placeholder="Medium input"></pao-input>
      <pao-input size="lg" label="Large" placeholder="Large input"></pao-input>
    </div>
  `,
};

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
};
```

- [ ] **Step 2: Export from index.ts**

In `src/index.ts`, add after the existing exports:
```typescript
export * from './components/pao-input/pao-input';
```

Final `src/index.ts`:
```typescript
// Import foundation styles to ensure fonts and base styles are loaded
import './styles/index.scss';

export * from './components/pao-button/pao-button';
export * from './components/pao-button-group/pao-button-group';
export * from './components/pao-input/pao-input';
```

- [ ] **Step 3: Verify Storybook builds without error**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx tsc --noEmit 2>&1 | head -30
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/pao-input/pao-input.stories.tsx src/index.ts
git commit -m "feat: add pao-input stories and export from library"
```

---

## Task 4: pao-badge — Tests

**Files:**
- Create: `test/pao-badge.jest.test.ts`

- [ ] **Step 1: Create test file**

```typescript
// test/pao-badge.jest.test.ts
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

jest.mock('../src/components/pao-badge/pao-badge.styles', () => ({
  styles: [],
}));

import { PaoBadge } from '../src/components/pao-badge/pao-badge';

describe('PaoBadge', () => {
  let element: PaoBadge;

  beforeEach(() => {
    element = new PaoBadge();
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.variant).toBe('primary');
    expect(element.size).toBe('md');
    expect(element.pill).toBe(false);
    expect(element.outline).toBe(false);
  });

  it('accepts all variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
    for (const v of variants) {
      element.variant = v;
      expect(element.variant).toBe(v);
    }
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('sets pill shape', () => {
    element.pill = true;
    expect(element.pill).toBe(true);
  });

  it('sets outline mode', () => {
    element.outline = true;
    expect(element.outline).toBe(true);
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('renders pill', () => {
    element.pill = true;
    expect(element.render()).toBeDefined();
  });

  it('renders outline', () => {
    element.outline = true;
    expect(element.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoBadge.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure (module not found)**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-badge.jest.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-badge/pao-badge'`

---

## Task 5: pao-badge — Implementation

**Files:**
- Create: `src/components/pao-badge/pao-badge.styles.ts`
- Create: `src/components/pao-badge/pao-badge.ts`

- [ ] **Step 1: Create styles file**

```typescript
// src/components/pao-badge/pao-badge.styles.ts
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-flex;
  }

  .pao-badge {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 4px;
    border: 1px solid transparent;
    line-height: 1;
    white-space: nowrap;
  }

  /* Pill shape */
  .pao-badge.pill {
    border-radius: 50px;
  }

  /* Sizes */
  .pao-badge.sm {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  }

  .pao-badge.md {
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
  }

  .pao-badge.lg {
    padding: 0.375rem 0.875rem;
    font-size: 0.9375rem;
  }

  /* Solid variants */
  .pao-badge.primary   { background-color: var(--pao-color-primary);   color: #fff; border-color: var(--pao-color-primary); }
  .pao-badge.secondary { background-color: var(--pao-color-secondary); color: #fff; border-color: var(--pao-color-secondary); }
  .pao-badge.success   { background-color: var(--pao-color-success);   color: #fff; border-color: var(--pao-color-success); }
  .pao-badge.warning   { background-color: var(--pao-color-warning);   color: var(--pao-gray-900); border-color: var(--pao-color-warning); }
  .pao-badge.danger    { background-color: var(--pao-color-danger);    color: #fff; border-color: var(--pao-color-danger); }
  .pao-badge.info      { background-color: var(--pao-color-info);      color: var(--pao-gray-900); border-color: var(--pao-color-info); }

  /* Outline variants */
  .pao-badge.outline.primary   { background-color: var(--pao-color-primary-light);  color: var(--pao-color-primary-dark);  border-color: var(--pao-color-primary); }
  .pao-badge.outline.secondary { background-color: var(--pao-color-secondary-light); color: var(--pao-color-secondary-dark); border-color: var(--pao-color-secondary); }
  .pao-badge.outline.success   { background-color: var(--pao-color-success-light);  color: var(--pao-color-success-dark);  border-color: var(--pao-color-success); }
  .pao-badge.outline.warning   { background-color: var(--pao-color-warning-light);  color: var(--pao-color-warning-dark);  border-color: var(--pao-color-warning); }
  .pao-badge.outline.danger    { background-color: var(--pao-color-danger-light);   color: var(--pao-color-danger-dark);   border-color: var(--pao-color-danger); }
  .pao-badge.outline.info      { background-color: var(--pao-color-info-light);     color: var(--pao-color-info-dark);     border-color: var(--pao-color-info); }
`;
```

- [ ] **Step 2: Create component file**

```typescript
// src/components/pao-badge/pao-badge.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-badge.styles';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@customElement('pao-badge')
export class PaoBadge extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: BadgeVariant = 'primary';
  @property({ type: String }) size: BadgeSize = 'md';
  @property({ type: Boolean, reflect: true }) pill = false;
  @property({ type: Boolean, reflect: true }) outline = false;

  render() {
    const classes = [
      'pao-badge',
      this.variant,
      this.size,
      this.pill ? 'pill' : '',
      this.outline ? 'outline' : '',
    ].filter(Boolean).join(' ');

    return html`
      <span class=${classes} part="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-badge': PaoBadge;
  }
}
```

- [ ] **Step 3: Run tests — expect pass**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-badge.jest.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/pao-badge/ test/pao-badge.jest.test.ts
git commit -m "feat: add pao-badge component with variants, sizes, pill and outline modes"
```

---

## Task 6: pao-badge — Storybook & Export

**Files:**
- Create: `src/components/pao-badge/pao-badge.stories.tsx`
- Modify: `src/index.ts`

- [ ] **Step 1: Create stories file**

```typescript
// src/components/pao-badge/pao-badge.stories.tsx
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeSize, BadgeVariant } from './pao-badge';
import './pao-badge';

interface BadgeStoryArgs {
  variant: BadgeVariant;
  size: BadgeSize;
  pill: boolean;
  outline: boolean;
  slot: string;
}

const meta = {
  title: 'Components/Badge',
  component: 'pao-badge',
  args: {
    variant: 'primary',
    size: 'md',
    pill: false,
    outline: false,
    slot: 'Badge',
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    pill: { control: 'boolean' },
    outline: { control: 'boolean' },
    slot: { control: 'text' },
  },
  render: (args: BadgeStoryArgs) => html`
    <pao-badge
      variant=${args.variant}
      size=${args.size}
      ?pill=${args.pill}
      ?outline=${args.outline}
    >${args.slot}</pao-badge>
  `,
} as Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <pao-badge variant="primary">Primary</pao-badge>
      <pao-badge variant="secondary">Secondary</pao-badge>
      <pao-badge variant="success">Success</pao-badge>
      <pao-badge variant="warning">Warning</pao-badge>
      <pao-badge variant="danger">Danger</pao-badge>
      <pao-badge variant="info">Info</pao-badge>
    </div>
  `,
};

export const OutlineVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <pao-badge variant="primary" outline>Primary</pao-badge>
      <pao-badge variant="secondary" outline>Secondary</pao-badge>
      <pao-badge variant="success" outline>Success</pao-badge>
      <pao-badge variant="warning" outline>Warning</pao-badge>
      <pao-badge variant="danger" outline>Danger</pao-badge>
      <pao-badge variant="info" outline>Info</pao-badge>
    </div>
  `,
};

export const PillShape: Story = {
  args: { pill: true, slot: 'New' },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <pao-badge size="sm">Small</pao-badge>
      <pao-badge size="md">Medium</pao-badge>
      <pao-badge size="lg">Large</pao-badge>
    </div>
  `,
};
```

- [ ] **Step 2: Export from index.ts**

Update `src/index.ts`:
```typescript
// Import foundation styles to ensure fonts and base styles are loaded
import './styles/index.scss';

export * from './components/pao-button/pao-button';
export * from './components/pao-button-group/pao-button-group';
export * from './components/pao-input/pao-input';
export * from './components/pao-badge/pao-badge';
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/pao-badge/pao-badge.stories.tsx src/index.ts
git commit -m "feat: add pao-badge stories and export from library"
```

---

## Task 7: pao-spinner — Tests

**Files:**
- Create: `test/pao-spinner.jest.test.ts`

- [ ] **Step 1: Create test file**

```typescript
// test/pao-spinner.jest.test.ts
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

jest.mock('../src/components/pao-spinner/pao-spinner.styles', () => ({
  styles: [],
}));

import { PaoSpinner } from '../src/components/pao-spinner/pao-spinner';

describe('PaoSpinner', () => {
  let element: PaoSpinner;

  beforeEach(() => {
    element = new PaoSpinner();
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.size).toBe('md');
    expect(element.variant).toBe('primary');
    expect(element.label).toBe('Loading...');
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('accepts all variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'light'] as const;
    for (const v of variants) {
      element.variant = v;
      expect(element.variant).toBe(v);
    }
  });

  it('accepts custom label', () => {
    element.label = 'Please wait';
    expect(element.label).toBe('Please wait');
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoSpinner.styles).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect failure (module not found)**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-spinner.jest.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '../src/components/pao-spinner/pao-spinner'`

---

## Task 8: pao-spinner — Implementation

**Files:**
- Create: `src/components/pao-spinner/pao-spinner.styles.ts`
- Create: `src/components/pao-spinner/pao-spinner.ts`

- [ ] **Step 1: Create styles file**

```typescript
// src/components/pao-spinner/pao-spinner.styles.ts
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pao-spinner {
    border-radius: 50%;
    border-style: solid;
    border-bottom-color: transparent !important;
    animation: pao-spin 0.75s linear infinite;
    flex-shrink: 0;
  }

  @keyframes pao-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Sizes */
  .pao-spinner.sm { width: 1rem;    height: 1rem;    border-width: 2px; }
  .pao-spinner.md { width: 1.5rem;  height: 1.5rem;  border-width: 2px; }
  .pao-spinner.lg { width: 2.5rem;  height: 2.5rem;  border-width: 3px; }

  /* Variants */
  .pao-spinner.primary   { border-color: var(--pao-color-primary); }
  .pao-spinner.secondary { border-color: var(--pao-color-secondary); }
  .pao-spinner.success   { border-color: var(--pao-color-success); }
  .pao-spinner.warning   { border-color: var(--pao-color-warning); }
  .pao-spinner.danger    { border-color: var(--pao-color-danger); }
  .pao-spinner.light     { border-color: var(--pao-color-light-dark); }
`;
```

- [ ] **Step 2: Create component file**

```typescript
// src/components/pao-spinner/pao-spinner.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-spinner.styles';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light';

@customElement('pao-spinner')
export class PaoSpinner extends LitElement {
  static styles = styles;

  @property({ type: String }) size: SpinnerSize = 'md';
  @property({ type: String }) variant: SpinnerVariant = 'primary';
  @property({ type: String }) label = 'Loading...';

  render() {
    const classes = ['pao-spinner', this.size, this.variant].join(' ');
    return html`
      <span
        class=${classes}
        part="spinner"
        role="status"
        aria-label=${this.label}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-spinner': PaoSpinner;
  }
}
```

- [ ] **Step 3: Run tests — expect pass**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest test/pao-spinner.jest.test.ts --no-coverage 2>&1 | tail -15
```

Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/pao-spinner/ test/pao-spinner.jest.test.ts
git commit -m "feat: add pao-spinner component with sizes and variants"
```

---

## Task 9: pao-spinner — Storybook & Export

**Files:**
- Create: `src/components/pao-spinner/pao-spinner.stories.tsx`
- Modify: `src/index.ts`

- [ ] **Step 1: Create stories file**

```typescript
// src/components/pao-spinner/pao-spinner.stories.tsx
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SpinnerSize, SpinnerVariant } from './pao-spinner';
import './pao-spinner';

interface SpinnerStoryArgs {
  size: SpinnerSize;
  variant: SpinnerVariant;
  label: string;
}

const meta = {
  title: 'Components/Spinner',
  component: 'pao-spinner',
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading...',
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'success', 'warning', 'danger', 'light'] },
    label: { control: 'text' },
  },
  render: (args: SpinnerStoryArgs) => html`
    <pao-spinner
      size=${args.size}
      variant=${args.variant}
      label=${args.label}
    ></pao-spinner>
  `,
} as Meta<SpinnerStoryArgs>;

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <pao-spinner size="sm"></pao-spinner>
      <pao-spinner size="md"></pao-spinner>
      <pao-spinner size="lg"></pao-spinner>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
      <pao-spinner variant="primary"></pao-spinner>
      <pao-spinner variant="secondary"></pao-spinner>
      <pao-spinner variant="success"></pao-spinner>
      <pao-spinner variant="warning"></pao-spinner>
      <pao-spinner variant="danger"></pao-spinner>
      <div style="background: #212529; padding: 0.5rem; border-radius: 4px;">
        <pao-spinner variant="light"></pao-spinner>
      </div>
    </div>
  `,
};

export const WithLoadingButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <pao-spinner size="sm" variant="primary"></pao-spinner>
      <span style="font-family: system-ui; font-size: 0.875rem; color: #495057;">Loading data...</span>
    </div>
  `,
};
```

- [ ] **Step 2: Export from index.ts**

Update `src/index.ts`:
```typescript
// Import foundation styles to ensure fonts and base styles are loaded
import './styles/index.scss';

export * from './components/pao-button/pao-button';
export * from './components/pao-button-group/pao-button-group';
export * from './components/pao-input/pao-input';
export * from './components/pao-badge/pao-badge';
export * from './components/pao-spinner/pao-spinner';
```

- [ ] **Step 3: Run all tests to verify nothing broken**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx jest --no-coverage 2>&1 | tail -20
```

Expected: All test suites PASS, coverage threshold met

- [ ] **Step 4: Final TypeScript check**

```bash
cd /Users/kokwaileong/Documents/Works/Repos/pao-design-system
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/pao-spinner/pao-spinner.stories.tsx src/index.ts
git commit -m "feat: add pao-spinner stories and complete new components export"
```

---

## Self-Review Checklist

- [x] All 3 components (pao-input, pao-badge, pao-spinner) have implementation, styles, stories, and tests
- [x] All types are consistent across tasks (InputType, InputSize, BadgeVariant, BadgeSize, SpinnerSize, SpinnerVariant)
- [x] All file paths are exact and consistent
- [x] No TBD or placeholder steps — all code is complete
- [x] Each task ends with a commit
- [x] `src/index.ts` exports accumulate correctly — final version includes all 5 components
- [x] Test mock pattern matches pao-button.jest.test.ts exactly
- [x] SCSS imports in styles files match pao-button pattern
