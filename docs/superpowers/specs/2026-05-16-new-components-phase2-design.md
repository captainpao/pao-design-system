# Phase 2 Component Design Spec

**Date:** 2026-05-16
**Components:** pao-tabs, pao-tab, pao-accordion, pao-accordion-item, pao-card, pao-progress

---

## Overview

Add four new UI component families to the pao design system. All follow existing conventions: Lit elements, `sm/md/lg` sizes where applicable, `--pao-*` CSS tokens, `pao`-prefixed custom events, and the standard `.ts` / `.styles.ts` / `.stories.tsx` / `.mdx` file structure. Compound components follow the event-driven coordination pattern already established by `pao-checkbox-group`/`pao-checkbox` and `pao-radio-group`/`pao-radio`.

---

## Architecture: Event-Driven Coordination

Compound components (`pao-tabs`/`pao-tab`, `pao-accordion`/`pao-accordion-item`) use the same slot-based pattern already in the codebase:

1. On `slotchange`, the parent queries slotted children and pushes shared state (e.g. `name`, `disabled`) down.
2. Children fire custom events with `bubbles: true, composed: true`.
3. The parent intercepts child events, applies coordination logic (enforce single selection, enforce single-open), and re-emits a parent-level event.

This keeps children independently usable while giving the parent full control.

---

## pao-tabs + pao-tab

### pao-tabs

**Role:** Container — manages which tab is active, renders the tab bar from slotted `pao-tab` children, and shows/hides their content panels.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | Value of the currently active tab |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the tab bar |
| `variant` | `'line' \| 'pill'` | `'line'` | Visual style of the tab bar |

#### Events

- `paoChange` → `{ value: string }` — emitted when the active tab changes

#### Behaviour

- On `slotchange`: queries slotted `pao-tab` elements; if `value` is empty, activates the first non-disabled tab.
- On child `paoTabClick` event: updates `value`, syncs `active` state on all children, emits `paoChange`.
- Renders the tab bar as a `<div role="tablist">` above the content area.
- Content area renders `<slot>` — `pao-tab` children show/hide themselves based on their `active` property.
- `aria-orientation` set on tablist from `orientation` prop.

### pao-tab

**Role:** Individual tab — renders a tab trigger in the tab bar and its own content panel.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | Unique identifier for this tab |
| `label` | `string` | `''` | Text displayed in the tab trigger button |
| `disabled` | `boolean` | `false` | Prevents tab from being activated |
| `active` | `boolean` | `false` | Set by `pao-tabs` — do not set manually |

#### Events

- `paoTabClick` → `{ value: string }` — fired when tab trigger is clicked (non-disabled); consumed by `pao-tabs`

#### Behaviour

- Renders a `<button role="tab">` for the trigger and a `<div role="tabpanel">` for the content.
- Content panel is hidden (`display: none`) when `active` is false.
- Tab trigger gets `aria-selected`, `aria-controls`, `tabindex` set by `active` state.
- Disabled: `aria-disabled="true"`, cursor not-allowed.

#### Styling Notes

**Line variant:** Active tab has bottom border in `--pao-color-primary`, no background. Inactive: transparent background, hover gets `--pao-gray-100`.

**Pill variant:** Active tab has `--pao-color-primary` background + white text, border-radius 50px. Inactive: transparent, hover gets `--pao-gray-100`.

**Vertical orientation:** Tab bar renders as a column on the left; content panel to the right.

---

## pao-accordion + pao-accordion-item

### pao-accordion

**Role:** Container — coordinates which accordion items are open. Enforces single-open when `allowMultiple` is false.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `allowMultiple` | `boolean` | `false` | If false, opening one item closes all others |

#### Behaviour

- On `slotchange`: queries slotted `pao-accordion-item` elements.
- Listens for `paoToggle` events bubbling from children.
- If `allowMultiple` is false and a child opens: closes all other children by setting `open = false` on them.
- Does not emit its own events — consumers listen to individual `paoToggle` events from children.

### pao-accordion-item

**Role:** Individual expandable section with a trigger header and collapsible content panel.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | `''` | Header text displayed in the trigger |
| `open` | `boolean` | `false` | Whether the content panel is expanded |
| `disabled` | `boolean` | `false` | Prevents toggling |

#### Events

- `paoToggle` → `{ open: boolean }` — fired when header is clicked (non-disabled)

#### Behaviour

- Renders a `<button>` header with a chevron icon that rotates 180° when `open`.
- Content panel uses CSS `max-height` transition for smooth expand/collapse animation.
- `aria-expanded` on the button, `aria-hidden` on the panel when closed.
- Disabled: header button is `disabled`, cursor not-allowed.

#### Styling Notes

- Header: full-width button, no default browser styling, hover gets `--pao-gray-50` background.
- Panel: `overflow: hidden`, `max-height` transitions between `0` and a large value (`1000px`) for smooth animation.
- Chevron: `▾` character, rotates 180° via CSS transform when open.
- Dividers between items via border-bottom on each item.

---

## pao-card

**Role:** A content container with optional header, body, and footer zones. No interactive behaviour — purely presentational.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `shadow` | `boolean` | `false` | Adds a drop shadow |
| `padded` | `boolean` | `true` | Adds internal padding to header/body/footer slots |

### Slots

| Slot | Purpose |
|---|---|
| `header` | Card title area, rendered above body |
| *(default)* | Card body content |
| `footer` | Card action area, rendered below body |

### Behaviour

- No events emitted.
- Slots that receive no content are hidden (`:host(:not(:has([slot="header"])))` or check `slotchange`).
- `shadow` adds `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`.
- `padded`: header/body/footer each get `1rem 1.25rem` padding when true.

### Styling Notes

- Host: `display: block`, `border-radius: 8px`, `border: 1px solid var(--pao-border-color)`, `background: var(--pao-body-bg)`.
- Header: bottom border `1px solid var(--pao-border-color)`, font-weight 600.
- Footer: top border `1px solid var(--pao-border-color)`, `background: var(--pao-gray-50)`.

---

## pao-progress

**Role:** A linear progress bar for communicating task completion or loading state.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `number` | `0` | Current progress (0–`max`) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Bar colour |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Bar height |
| `indeterminate` | `boolean` | `false` | Animated bar for unknown progress |
| `label` | `string` | `''` | Accessible label (aria-label on the progressbar) |
| `showValue` | `boolean` | `false` | Renders `N%` text beside the bar |

### Events

None.

### Behaviour

- Renders a `<div role="progressbar">` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax`, and `aria-label`.
- Bar fill width: `${(value / max) * 100}%`.
- `indeterminate`: fill width is fixed at 40%, with a CSS sliding animation; `aria-valuenow` is omitted.
- `showValue`: renders the percentage as text to the right of the bar.
- Value is clamped to `[0, max]` in `render()`.

### Styling Notes

- Track: full width, `border-radius: 50px`, `background: var(--pao-gray-200)`.
- Fill: `border-radius: 50px`, `transition: width 0.3s ease`, colour from variant token.
- Sizes: `sm` = 4px height, `md` = 8px, `lg` = 14px.
- Indeterminate animation: `@keyframes pao-progress-slide` — fill slides from -40% to 100%.

---

## Accessibility Summary

| Component | Key ARIA |
|---|---|
| pao-tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-orientation` |
| pao-accordion | `aria-expanded` on button, `aria-hidden` on panel |
| pao-card | No interactive ARIA needed |
| pao-progress | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` |

---

## Testing Strategy

All components follow the mock-Lit Jest pattern from `CLAUDE.md`. One test file per element:

- `test/pao-tabs.test.ts` — default props, slotchange coordination, paoTabClick → paoChange, disabled tab ignored
- `test/pao-tab.test.ts` — default props, active/inactive render, click emits paoTabClick, disabled blocks click
- `test/pao-accordion.test.ts` — default props, allowMultiple=false closes siblings, allowMultiple=true keeps multiple open
- `test/pao-accordion-item.test.ts` — default props, click toggles open, disabled blocks toggle, paoToggle event detail
- `test/pao-card.test.ts` — default props, shadow/padded props, render
- `test/pao-progress.test.ts` — default props, all variants, all sizes, indeterminate, showValue, value clamping

---

## Files to Create

```
src/components/pao-tab/
  pao-tab.ts
  pao-tab.styles.ts

src/components/pao-tabs/
  pao-tabs.ts
  pao-tabs.styles.ts
  pao-tabs.stories.tsx
  pao-tabs.mdx

src/components/pao-accordion-item/
  pao-accordion-item.ts
  pao-accordion-item.styles.ts

src/components/pao-accordion/
  pao-accordion.ts
  pao-accordion.styles.ts
  pao-accordion.stories.tsx
  pao-accordion.mdx

src/components/pao-card/
  pao-card.ts
  pao-card.styles.ts
  pao-card.stories.tsx
  pao-card.mdx

src/components/pao-progress/
  pao-progress.ts
  pao-progress.styles.ts
  pao-progress.stories.tsx
  pao-progress.mdx

test/
  pao-tab.test.ts
  pao-tabs.test.ts
  pao-accordion-item.test.ts
  pao-accordion.test.ts
  pao-card.test.ts
  pao-progress.test.ts
```

Update `src/index.ts` to export all 6 new elements.
