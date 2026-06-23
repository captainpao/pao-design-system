# Phase 3 Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **Commit after each task. Do NOT push** — the user pulls manually.

**Goal:** Add `pao-alert`, `pao-tag`, `pao-skeleton`, `pao-breadcrumb`, `pao-pagination`, `pao-menu-item`, and `pao-menu` Lit web components to the pao design system.

**Architecture:** `pao-alert`, `pao-tag`, `pao-skeleton`, `pao-breadcrumb` are standalone single elements. `pao-pagination` is standalone with a pure, separately-tested `getPageRange` helper in `pao-pagination.utils.ts`. `pao-menu`/`pao-menu-item` is a compound pair using the established slot-coordination pattern: `pao-menu-item` emits a bubbling `paoSelect`; `pao-menu` owns open state, keyboard focus, and outside-click/Escape (mirroring `pao-modal`). All components follow the `.ts` / `.styles.ts` / `.stories.tsx` / `.mdx` structure and are tested with mocked Lit in Jest. Reference existing components as templates — do not re-derive boilerplate.

**Tech Stack:** Lit 3, TypeScript 5.3, Storybook 10, Jest 30 (jsdom, ts-jest)

**Build order:** Pagination utils are TDD'd before the pagination component; `pao-menu-item` ships before `pao-menu`. Otherwise tasks are independent.

---

## File Map

| File | Action |
|---|---|
| `src/components/pao-alert/pao-alert.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `test/pao-alert.test.ts` | Create |
| `src/components/pao-tag/pao-tag.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `test/pao-tag.test.ts` | Create |
| `src/components/pao-skeleton/pao-skeleton.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `test/pao-skeleton.test.ts` | Create |
| `src/components/pao-breadcrumb/pao-breadcrumb.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `test/pao-breadcrumb.test.ts` | Create |
| `src/components/pao-pagination/pao-pagination.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `src/components/pao-pagination/pao-pagination.utils.ts` | Create |
| `test/pao-pagination.utils.test.ts`, `test/pao-pagination.test.ts` | Create |
| `src/components/pao-menu-item/pao-menu-item.{ts,styles.ts}` | Create |
| `test/pao-menu-item.test.ts` | Create |
| `src/components/pao-menu/pao-menu.{ts,styles.ts,stories.tsx,mdx}` | Create |
| `test/pao-menu.test.ts` | Create |
| `src/index.ts` | Modify — export all 7 elements |

**Standard Jest mock header** (top of every `*.test.ts`; add `state: jest.fn()` to the decorators mock when the component uses `@state`, and `dispatchEvent`/`querySelectorAll` to the `LitElement` mock when needed):

```typescript
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn(), querySelectorAll: jest.fn(() => []) };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
}));
jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(), property: jest.fn(), state: jest.fn(),
}));
```

**Standard styles header** (top of every `*.styles.ts`):

```typescript
import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';
```

**Standard MDX header:**

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as Stories from './<name>.stories';

<Meta of={Stories} />
```

---

## Task 1: pao-alert

- [ ] **Step 1 — failing test** `test/pao-alert.test.ts`: assert defaults (`variant='info'`, `heading=''`, `dismissible=false`, `icon=true`, `_dismissed=false`); all 4 variants settable; `handleDismiss()` sets `_dismissed=true` and dispatches `paoDismiss`; `render()` defined when visible and when dismissed; `static styles` defined.
- [ ] **Step 2** run `npx jest test/pao-alert.test.ts --no-coverage` → expect module-not-found.
- [ ] **Step 3 — styles** `pao-alert.styles.ts`: `:host{display:block}` + body font. `.pao-alert{display:flex;gap:.75rem;padding:1rem 1.25rem;border-radius:6px;border-left:4px solid}`. Per-variant classes set `background`/`color`/`border-left-color` from `--pao-color-{variant}-light` / `-text` / base. `.pao-alert-heading{font-weight:600}`. `.pao-alert-close{margin-left:auto;background:none;border:none;cursor:pointer;color:inherit;font-size:1.1rem}`.
- [ ] **Step 4 — component** `pao-alert.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-alert.styles';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
const ICONS: Record<AlertVariant, string> = { info: 'ℹ', success: '✓', warning: '⚠', danger: '✕' };

@customElement('pao-alert')
export class PaoAlert extends LitElement {
  static styles = styles;
  @property({ type: String }) variant: AlertVariant = 'info';
  @property({ type: String }) heading = '';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Boolean }) icon = true;
  @state() private _dismissed = false;

  private handleDismiss() {
    this._dismissed = true;
    this.dispatchEvent(new CustomEvent('paoDismiss', { bubbles: true, composed: true }));
  }

  render() {
    if (this._dismissed) return nothing;
    return html`
      <div class="pao-alert ${this.variant}" part="alert" role="alert">
        ${this.icon ? html`<span class="pao-alert-icon" part="icon" aria-hidden="true">${ICONS[this.variant]}</span>` : nothing}
        <div class="pao-alert-body">
          ${this.heading ? html`<div class="pao-alert-heading" part="heading">${this.heading}</div>` : nothing}
          <div class="pao-alert-content" part="content"><slot></slot></div>
        </div>
        ${this.dismissible ? html`<button class="pao-alert-close" part="close" aria-label="Dismiss" @click=${this.handleDismiss}>×</button>` : nothing}
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-alert': PaoAlert } }
```

- [ ] **Step 5** run test → expect pass.
- [ ] **Step 6 — stories** `Components/Alert`: args `variant/heading/dismissible/icon`; selects for variant; `Default`, `Dismissible`, plus an `AllVariants` render listing the four.
- [ ] **Step 7 — mdx**: standard header + Properties/Events/Slots/Usage tables.
- [ ] **Step 8** `git add` + `git commit -m "feat: add pao-alert component with variants and dismiss"`.

---

## Task 2: pao-tag

- [ ] **Step 1 — failing test**: defaults (`variant='neutral'`, `size='md'`, `removable=false`); all 6 variants + 2 sizes settable; `handleRemove()` dispatches `paoRemove`; renders; static styles.
- [ ] **Step 3 — styles**: `:host{display:inline-flex}`. `.pao-tag{display:inline-flex;align-items:center;gap:.375rem;border-radius:50px;font-weight:500;white-space:nowrap}`. `.sm{padding:.125rem .5rem;font-size:.75rem}` `.md{padding:.25rem .75rem;font-size:.8125rem}`. Variant classes: coloured → `--pao-color-{variant}-light` bg + `--pao-color-{variant}-text`; `.neutral` → `--pao-gray-100` / `--pao-gray-700`. `.pao-tag-remove{background:none;border:none;cursor:pointer;color:inherit;line-height:1;padding:0;font-size:1em}`.
- [ ] **Step 4 — component** `pao-tag.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-tag.styles';

export type TagVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type TagSize = 'sm' | 'md';

@customElement('pao-tag')
export class PaoTag extends LitElement {
  static styles = styles;
  @property({ type: String }) variant: TagVariant = 'neutral';
  @property({ type: String }) size: TagSize = 'md';
  @property({ type: Boolean }) removable = false;

  private handleRemove() {
    this.dispatchEvent(new CustomEvent('paoRemove', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="pao-tag ${this.variant} ${this.size}" part="tag">
        <slot></slot>
        ${this.removable ? html`<button class="pao-tag-remove" part="remove" aria-label="Remove" @click=${this.handleRemove}>×</button>` : nothing}
      </span>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-tag': PaoTag } }
```

- [ ] **Steps 6–7 — stories/mdx**: `Components/Tag`; `Default`, `Removable`, `Variants`, `Sizes`.
- [ ] **Step 8** commit `feat: add pao-tag component with variants, sizes, removable`.

---

## Task 3: pao-skeleton

- [ ] **Step 1 — failing test**: defaults (`variant='text'`, `width='100%'`, `height=''`, `animated=true`); 3 variants settable; `render()` defined for each variant and animated/static; static styles.
- [ ] **Step 3 — styles**: `:host{display:block}`. `.pao-skeleton{background:var(--pao-gray-200);border-radius:4px}`. `.circle{border-radius:50%}`. `.animated{background:linear-gradient(90deg,var(--pao-gray-200) 25%,var(--pao-gray-100) 50%,var(--pao-gray-200) 75%);background-size:200% 100%;animation:pao-skeleton-shimmer 1.5s infinite}`. Keyframes `0%{background-position:200% 0}100%{background-position:-200% 0}`.
- [ ] **Step 4 — component** `pao-skeleton.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-skeleton.styles';

export type SkeletonVariant = 'text' | 'circle' | 'rect';
const DEFAULT_HEIGHT: Record<SkeletonVariant, string> = { text: '1em', circle: '40px', rect: '1.2em' };

@customElement('pao-skeleton')
export class PaoSkeleton extends LitElement {
  static styles = styles;
  @property({ type: String }) variant: SkeletonVariant = 'text';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '';
  @property({ type: Boolean }) animated = true;

  render() {
    const h = this.height || DEFAULT_HEIGHT[this.variant];
    const w = this.variant === 'circle' ? h : this.width;
    return html`
      <div
        class="pao-skeleton ${this.variant} ${this.animated ? 'animated' : ''}"
        part="skeleton"
        aria-hidden="true"
        style="width:${w};height:${h}"
      ></div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-skeleton': PaoSkeleton } }
```

- [ ] **Steps 6–7**: `Components/Skeleton`; `Default`, `Circle`, `Rect`, `Static` (animated=false), and a `CardPlaceholder` composing several.
- [ ] **Step 8** commit `feat: add pao-skeleton loading placeholder component`.

---

## Task 4: pao-breadcrumb

- [ ] **Step 1 — failing test**: default `separator='/'`; settable; renders; static styles.
- [ ] **Step 3 — styles**: `:host{display:block;font-family:...}`. `.pao-breadcrumb-list{list-style:none;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:0;padding:0}`. Separator via slotted siblings:

```css
::slotted(*) { color: var(--pao-link-color); text-decoration: none; font-size: .875rem; }
::slotted(*:last-child) { color: var(--pao-gray-600); }
::slotted(* + *)::before {
  content: var(--pao-breadcrumb-separator, '/');
  color: var(--pao-gray-400);
  margin-right: .5rem;
}
```

- [ ] **Step 4 — component** `pao-breadcrumb.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-breadcrumb.styles';

@customElement('pao-breadcrumb')
export class PaoBreadcrumb extends LitElement {
  static styles = styles;
  @property({ type: String }) separator = '/';

  render() {
    return html`
      <nav part="breadcrumb" aria-label="Breadcrumb" style=${`--pao-breadcrumb-separator: '${this.separator}'`}>
        <div class="pao-breadcrumb-list" part="list"><slot></slot></div>
      </nav>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-breadcrumb': PaoBreadcrumb } }
```

> Note: `::slotted` separators only work because the items are flattened siblings. Consumer markup uses `<a href>` / `<span aria-current="page">` directly in the default slot.

- [ ] **Steps 6–7**: `Components/Breadcrumb`; `Default` (3 links + current span), `CustomSeparator` (`separator="›"`).
- [ ] **Step 8** commit `feat: add pao-breadcrumb navigation component`.

---

## Task 5: pao-pagination

- [ ] **Step 1a — utils failing test** `test/pao-pagination.utils.test.ts` (no Lit mock needed):

```typescript
import { getPageRange } from '../src/components/pao-pagination/pao-pagination.utils';

describe('getPageRange', () => {
  const r = (totalPages: number, current: number, siblingCount = 1) =>
    getPageRange({ totalPages, current, siblingCount });

  it('returns empty for <= 0 pages', () => { expect(r(0, 1)).toEqual([]); });
  it('returns single page', () => { expect(r(1, 1)).toEqual([1]); });
  it('lists all pages when no truncation needed', () => { expect(r(5, 3)).toEqual([1, 2, 3, 4, 5]); });
  it('truncates the end when current is near start', () => {
    expect(r(10, 2)).toEqual([1, 2, 3, 'ellipsis', 10]);
  });
  it('truncates the start when current is near end', () => {
    expect(r(10, 9)).toEqual([1, 'ellipsis', 8, 9, 10]);
  });
  it('truncates both sides when current is in the middle', () => {
    expect(r(10, 5)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);
  });
  it('respects siblingCount', () => {
    expect(r(10, 5, 2)).toEqual([1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 10]);
  });
});
```

- [ ] **Step 1b — utils impl** `pao-pagination.utils.ts`:

```typescript
export type PageItem = number | 'ellipsis';

export function getPageRange(opts: {
  totalPages: number;
  current: number;
  siblingCount: number;
}): PageItem[] {
  const { totalPages, current, siblingCount } = opts;
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const left = Math.max(2, current - siblingCount);
  const right = Math.min(totalPages - 1, current + siblingCount);
  const items: PageItem[] = [1];

  if (left > 2) items.push('ellipsis');
  for (let p = left; p <= right; p++) items.push(p);
  if (right < totalPages - 1) items.push('ellipsis');

  items.push(totalPages);
  return items;
}
```

Run `npx jest test/pao-pagination.utils.test.ts --no-coverage` → all pass.

- [ ] **Step 2 — component failing test** `test/pao-pagination.test.ts` (standard mock header): defaults (`total=0`, `pageSize=10`, `current=1`, `siblingCount=1`, `showEdges=false`); `goTo(n)` clamps to `[1, totalPages]`, sets `current`, dispatches `paoPageChange` with `{page}`; `goTo` on the current page is a no-op (no event); `totalPages` getter = `Math.ceil(total/pageSize)`; renders.
- [ ] **Step 3 — styles**: flex row of buttons; `.pao-page{min-width:2rem;height:2rem;border:1px solid var(--pao-border-color);background:var(--pao-body-bg);border-radius:4px;cursor:pointer}`. `.active{background:var(--pao-color-primary);color:#fff;border-color:var(--pao-color-primary)}`. `[disabled]{opacity:.5;cursor:not-allowed}`. `.pao-page-ellipsis{padding:0 .25rem;color:var(--pao-gray-500)}`.
- [ ] **Step 4 — component** `pao-pagination.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-pagination.styles';
import { getPageRange } from './pao-pagination.utils';

@customElement('pao-pagination')
export class PaoPagination extends LitElement {
  static styles = styles;
  @property({ type: Number }) total = 0;
  @property({ type: Number }) pageSize = 10;
  @property({ type: Number }) current = 1;
  @property({ type: Number }) siblingCount = 1;
  @property({ type: Boolean }) showEdges = false;

  get totalPages() { return Math.max(1, Math.ceil(this.total / this.pageSize)); }

  private goTo(page: number) {
    const next = Math.min(Math.max(page, 1), this.totalPages);
    if (next === this.current) return;
    this.current = next;
    this.dispatchEvent(new CustomEvent('paoPageChange', { bubbles: true, composed: true, detail: { page: next } }));
  }

  render() {
    const pages = getPageRange({ totalPages: this.totalPages, current: this.current, siblingCount: this.siblingCount });
    return html`
      <nav class="pao-pagination" part="pagination" aria-label="Pagination">
        ${this.showEdges ? html`<button class="pao-page" part="page" ?disabled=${this.current === 1} aria-label="First page" @click=${() => this.goTo(1)}>«</button>` : nothing}
        <button class="pao-page" part="prev" ?disabled=${this.current === 1} aria-label="Previous page" @click=${() => this.goTo(this.current - 1)}>‹</button>
        ${pages.map(p => p === 'ellipsis'
          ? html`<span class="pao-page-ellipsis" part="ellipsis" aria-hidden="true">…</span>`
          : html`<button class="pao-page ${p === this.current ? 'active' : ''}" part="page" aria-current=${p === this.current ? 'page' : nothing} @click=${() => this.goTo(p as number)}>${p}</button>`)}
        <button class="pao-page" part="next" ?disabled=${this.current === this.totalPages} aria-label="Next page" @click=${() => this.goTo(this.current + 1)}>›</button>
        ${this.showEdges ? html`<button class="pao-page" part="page" ?disabled=${this.current === this.totalPages} aria-label="Last page" @click=${() => this.goTo(this.totalPages)}>»</button>` : nothing}
      </nav>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-pagination': PaoPagination } }
```

- [ ] **Steps 6–7**: `Components/Pagination`; controls for `total/pageSize/current/siblingCount/showEdges`; `Default`, `ManyPages` (total=200), `WithEdges`.
- [ ] **Step 8** commit `feat: add pao-pagination component with ellipsis truncation`.

---

## Task 6: pao-menu-item

Child element — documented inside `pao-menu.mdx`. No stories/MDX.

- [ ] **Step 1 — failing test**: defaults (`value=''`, `label=''`, `disabled=false`); `handleClick()` dispatches `paoSelect` with `{value}` when enabled; does nothing when disabled; renders; static styles.
- [ ] **Step 3 — styles**: `:host{display:block}`. `.pao-menu-item{width:100%;text-align:left;padding:.5rem 1rem;background:none;border:none;cursor:pointer;font:inherit;color:var(--pao-body-color)}`. `:hover:not(:disabled){background:var(--pao-gray-100)}`. `:disabled{opacity:.5;cursor:not-allowed}`.
- [ ] **Step 4 — component** `pao-menu-item.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-menu-item.styles';

@customElement('pao-menu-item')
export class PaoMenuItem extends LitElement {
  static styles = styles;
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoSelect', { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  render() {
    return html`
      <button class="pao-menu-item" part="item" role="menuitem" ?disabled=${this.disabled} aria-disabled=${this.disabled} @click=${this.handleClick}>
        <slot>${this.label}</slot>
      </button>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-menu-item': PaoMenuItem } }
```

- [ ] **Step 8** commit `feat: add pao-menu-item child element`.

---

## Task 7: pao-menu

- [ ] **Step 1 — failing test** (mock header + `dispatchEvent`, `querySelectorAll`, and stub `addEventListener`/`removeEventListener` on the LitElement mock): defaults (`open=false`, `placement='bottom-start'`); `toggle()` flips `open` and emits `paoOpenChange`; `handleSelect(e)` re-emits `paoSelect` with the child's `detail.value` and sets `open=false`; `handleOutsideClick` closes when target is outside; `handleKeydown` Escape closes; renders.
- [ ] **Step 3 — styles**: `:host{display:inline-block;position:relative}`. `.pao-menu-popup{position:absolute;top:100%;min-width:10rem;background:var(--pao-body-bg);border:1px solid var(--pao-border-color);border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.12);padding:.25rem 0;z-index:10}`. `.bottom-start{left:0}` `.bottom-end{right:0}`. `[hidden]{display:none}`.
- [ ] **Step 4 — component** `pao-menu.ts`:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-menu.styles';

export type MenuPlacement = 'bottom-start' | 'bottom-end';

@customElement('pao-menu')
export class PaoMenu extends LitElement {
  static styles = styles;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placement: MenuPlacement = 'bottom-start';

  private handleOutsideClick = (e: MouseEvent) => {
    if (this.open && !e.composedPath().includes(this)) this.setOpen(false);
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private setOpen(open: boolean) {
    if (open === this.open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent('paoOpenChange', { bubbles: true, composed: true, detail: { open } }));
  }

  private toggle() { this.setOpen(!this.open); }

  private handleSelect(e: Event) {
    const value = (e as CustomEvent).detail?.value;
    this.dispatchEvent(new CustomEvent('paoSelect', { bubbles: true, composed: true, detail: { value } }));
    this.setOpen(false);
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { this.setOpen(false); return; }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = Array.from(this.querySelectorAll('pao-menu-item'))
      .filter(i => !(i as any).disabled) as HTMLElement[];
    if (!items.length) return;
    const idx = items.findIndex(i => i.shadowRoot?.activeElement || i === document.activeElement);
    const dir = e.key === 'ArrowDown' ? 1 : -1;
    const next = items[(Math.max(0, idx) + dir + items.length) % items.length];
    (next.shadowRoot?.querySelector('button') as HTMLElement)?.focus();
  }

  render() {
    return html`
      <div class="pao-menu" part="menu" @keydown=${this.handleKeydown} @paoSelect=${this.handleSelect}>
        <div class="pao-menu-trigger" @click=${this.toggle} aria-haspopup="menu" aria-expanded=${this.open}>
          <slot name="trigger"></slot>
        </div>
        <div class="pao-menu-popup ${this.placement}" part="popup" role="menu" ?hidden=${!this.open}>
          <slot></slot>
        </div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-menu': PaoMenu } }
```

> The `@paoSelect` listener on the wrapper catches bubbling events from `pao-menu-item` children. `composedPath().includes(this)` is the same outside-click guard pattern used by `pao-modal`/`pao-tooltip`.

- [ ] **Steps 6–7 — stories/mdx**: `Components/Menu`; trigger via a slotted `<pao-button slot="trigger">Actions</pao-button>` + several `pao-menu-item`s (one disabled). MDX documents both `pao-menu` and `pao-menu-item` props/events.
- [ ] **Step 8** commit `feat: add pao-menu dropdown with keyboard nav and outside-click`.

---

## Task 8: Wire exports + verify

- [ ] Append to `src/index.ts`:

```typescript
export * from './components/pao-alert/pao-alert';
export * from './components/pao-tag/pao-tag';
export * from './components/pao-skeleton/pao-skeleton';
export * from './components/pao-breadcrumb/pao-breadcrumb';
export * from './components/pao-pagination/pao-pagination';
export * from './components/pao-menu-item/pao-menu-item';
export * from './components/pao-menu/pao-menu';
```

- [ ] `npm test` → all suites green, coverage ≥80%.
- [ ] `npm run build` → clean; `dist/types/` has declarations for the 7 elements.
- [ ] Commit `chore: export phase 3 components and verify build`.

---

## Verification (after user pulls)

1. `npm test` — all green, coverage held.
2. `npm run build` — TS compile + Vite build clean.
3. `npm run dev` — Storybook shows 6 new entries (Alert, Tag, Skeleton, Breadcrumb, Pagination, Menu; `pao-menu-item` has none by design). Exercise: alert dismiss, tag remove, pagination ellipsis at boundaries, menu keyboard nav + Escape + outside-click.
</content>
