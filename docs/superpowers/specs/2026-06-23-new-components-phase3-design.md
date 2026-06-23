# Phase 3 Component Design Spec

**Date:** 2026-06-23
**Components:** pao-alert, pao-tag, pao-skeleton, pao-breadcrumb, pao-pagination, pao-menu, pao-menu-item

---

## Overview

Phase 3 fills the design system's gaps in **inline feedback** and **navigation**. All
components follow existing conventions: Lit elements, `sm/md` sizes where applicable,
`--pao-*` CSS tokens, `pao`-prefixed custom events (`bubbles: true, composed: true`), and
the standard `.ts` / `.styles.ts` / `.stories.tsx` / `.mdx` file structure. The compound
dropdown (`pao-menu`/`pao-menu-item`) reuses the slot-coordination pattern already
established by `pao-tabs`/`pao-tab`.

Three components are standalone reskins of existing patterns, one (`pao-pagination`) carries
the only non-trivial logic (page-range truncation, extracted to a tested `.utils.ts`), and
the dropdown is a parent/child pair with keyboard + outside-click behaviour modelled on the
existing `pao-modal`/`pao-tooltip`.

---

## pao-alert

**Role:** A persistent, inline contextual message — distinct from the transient, floating
`pao-toast`. Lives in the document flow.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Colour + default icon |
| `heading` | `string` | `''` | Optional bold title above the body |
| `dismissible` | `boolean` | `false` | Renders a close button |
| `icon` | `boolean` | `true` | Shows the leading variant icon |

### Events

- `paoDismiss` — emitted when the close button is clicked. The component then hides itself
  via an internal `@state` `_dismissed` flag (renders nothing).

### Behaviour & A11y

- `role="alert"` on the container.
- Close button is `<button aria-label="Dismiss">` with an `×` glyph.
- Default slot holds the message body.

### Styling

- Background `--pao-color-{variant}-light`, 4px left border `--pao-color-{variant}`, text
  `--pao-color-{variant}-text`. Rounded 6px. Parts: `alert`, `icon`, `heading`, `content`, `close`.

---

## pao-tag

**Role:** Compact label / chip for statuses, categories, filters.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Colour |
| `size` | `'sm' \| 'md'` | `'md'` | Padding + font size |
| `removable` | `boolean` | `false` | Renders an `×` remove button |

### Events

- `paoRemove` — emitted when the remove button is clicked.

### Styling

- Pill (`border-radius: 50px`). Coloured variants use `--pao-color-{variant}-light` bg +
  `--pao-color-{variant}-text`; `neutral` uses `--pao-gray-100` / `--pao-gray-700`. Default
  slot = label. Parts: `tag`, `remove`.

---

## pao-skeleton

**Role:** Loading placeholder shown while content is fetching.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | Shape |
| `width` | `string` | `'100%'` | Any CSS length |
| `height` | `string` | `''` | Defaults per variant: text `1em`, circle `40px`, rect `1.2em` |
| `animated` | `boolean` | `true` | Shimmer animation |

### Behaviour & A11y

- No events. `aria-hidden="true"` (decorative placeholder).
- `circle` → `border-radius: 50%` (square aspect from `width`); `text`/`rect` → 4px radius.
- Base colour `--pao-gray-200`; when `animated`, a moving gradient highlight via keyframes.
  Part: `skeleton`.

---

## pao-breadcrumb

**Role:** Navigation trail showing the user's location in a hierarchy.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `separator` | `string` | `'/'` | Character/string between items |

### Behaviour & A11y

- Renders `<nav aria-label="Breadcrumb"><ol part="list">` wrapping a default `<slot>`.
- Consumer projects `<a>` / `<span>` items and sets `aria-current="page"` on the last one.
- Separators are injected purely in CSS — the `separator` prop is written to a
  `--pao-breadcrumb-separator` custom property (inline on `:host`), and
  `::slotted(*) + ::slotted(*)::before { content: var(--pao-breadcrumb-separator); }` renders it.
  No child element. Parts: `breadcrumb`, `list`.

---

## pao-pagination

**Role:** Page navigation for long lists / tables.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `total` | `number` | `0` | Total item count |
| `pageSize` | `number` | `10` | Items per page |
| `current` | `number` | `1` | Current page (1-based) |
| `siblingCount` | `number` | `1` | Page buttons shown either side of current |
| `showEdges` | `boolean` | `false` | First/last jump buttons |

### Events

- `paoPageChange` → `{ page: number }` — emitted on any page button / prev / next click.
  The component updates its own `current` (uncontrolled friendly) and emits; consumers may
  also drive `current` externally.

### Logic — `pao-pagination.utils.ts`

```ts
export type PageItem = number | 'ellipsis';
export function getPageRange(opts: {
  totalPages: number;
  current: number;
  siblingCount: number;
}): PageItem[];
```

Returns the visible page sequence with `'ellipsis'` gaps. Always includes page 1 and
`totalPages`. Pure and unit-tested directly — this is the only real logic in the phase, so
TDD it first. Boundary cases to cover: `totalPages <= 1`; few pages (no ellipsis); current
near the start; current near the end; current in the middle (two ellipses); `siblingCount`
larger than range.

### A11y

- `<nav aria-label="Pagination">`; active page button has `aria-current="page"`; prev/next
  disabled at bounds. Parts: `pagination`, `page`, `prev`, `next`, `ellipsis`.

---

## pao-menu + pao-menu-item

Compound dropdown. Same slot-coordination pattern as `pao-tabs`/`pao-tab`: the parent owns
open state and keyboard focus, children emit a bubbling select event the parent consumes.

### pao-menu (parent)

**Role:** Dropdown — a trigger that toggles a popup list of menu items.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `open` | `boolean` | `false` | Reflected; popup visibility |
| `placement` | `'bottom-start' \| 'bottom-end'` | `'bottom-start'` | Popup alignment |

#### Slots

- `trigger` — the element that toggles the menu (e.g. a `pao-button`).
- *(default)* — `pao-menu-item` children.

#### Events

- `paoSelect` → `{ value: string }` — re-emitted when a child item is selected.
- `paoOpenChange` → `{ open: boolean }` — emitted whenever open state changes.

#### Behaviour & A11y

- Click trigger toggles `open`. Selecting an item, clicking outside, or pressing `Escape`
  closes it; `Escape` returns focus to the trigger.
- `ArrowDown` / `ArrowUp` move focus between enabled `pao-menu-item`s.
- Listens for bubbling `paoSelect` from children, re-emits it, then closes.
- Trigger gets `aria-haspopup="menu"` + `aria-expanded`; popup is `role="menu"`. Outside-click
  and Escape handling mirror `pao-modal` / `pao-tooltip`. Parts: `menu`, `popup`.

### pao-menu-item (child)

**Role:** A single selectable row inside `pao-menu`. Documented inside `pao-menu.mdx`; no
own stories/MDX.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | Identifier sent in `paoSelect` |
| `label` | `string` | `''` | Fallback text if default slot is empty |
| `disabled` | `boolean` | `false` | Reflected; not selectable |

#### Events

- `paoSelect` → `{ value: string }` — emitted on click when not disabled; consumed by `pao-menu`.

#### A11y

- `role="menuitem"`, `aria-disabled` when disabled. Part: `item`.

---

## Build order

`pao-menu-item` ships before `pao-menu` (the parent imports the child). `pao-pagination`'s
`getPageRange` is TDD'd ahead of its component. Everything else is independent.
</content>
