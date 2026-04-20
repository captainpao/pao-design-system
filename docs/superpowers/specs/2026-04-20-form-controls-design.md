# Form Controls Design Spec

**Date:** 2026-04-20
**Components:** pao-checkbox, pao-checkbox-group, pao-radio, pao-radio-group, pao-select, pao-select-option

---

## Overview

Add three form control component families to the pao design system. All follow existing conventions: Lit elements, `sm/md/lg` sizes, `--pao-*` CSS tokens, `paoChange` custom events, and the standard `.ts` / `.styles.ts` / `.stories.tsx` / `.mdx` file structure.

---

## Architecture

**6 new components:**

| Component | Role |
|---|---|
| `pao-checkbox` | Standalone checkbox with indeterminate support |
| `pao-checkbox-group` | Groups checkboxes — shares `name`, `disabled`, `error`, `helperText` |
| `pao-radio` | Standalone radio button |
| `pao-radio-group` | Groups radios — shares `name`, `disabled`, `error`, `helperText`; enforces single selection |
| `pao-select` | Custom dropdown — single and multi-select |
| `pao-select-option` | Individual option slotted into `pao-select` |

**Group coordination pattern:**
- On `slotchange`, group components iterate slotted children and push `name` and `disabled` down to them.
- Children fire `paoChange` with `bubbles: true, composed: true` so events propagate through Shadow DOM.
- Groups intercept child `paoChange` events, apply their logic (enforce single selection for radio, collect checked values for checkbox), and re-emit a group-level `paoChange`.

---

## pao-checkbox

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | |
| `name` | `string` | `''` | Set by group if inside pao-checkbox-group |
| `checked` | `boolean` | `false` | |
| `indeterminate` | `boolean` | `false` | Property only — maps to `input.indeterminate` |
| `disabled` | `boolean` | `false` | Set by group if group is disabled |
| `required` | `boolean` | `false` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `label` | `string` | `''` | |
| `error` | `string` | `''` | |
| `helperText` | `string` | `''` | |

### Events

- `paoChange` → `{ value: string, checked: boolean, indeterminate: boolean }`

### Behaviour

- Renders a visually hidden native `<input type="checkbox">` + custom-styled `<span>` for consistent cross-browser appearance.
- `indeterminate` is set as a property on the underlying input element (not an attribute) in `updated()`.
- Clicking an indeterminate checkbox transitions to `checked=true`, `indeterminate=false`.
- Focus ring: `box-shadow: 0 0 0 3px var(--pao-color-primary-light)`.
- Disabled: `cursor: not-allowed`, muted colours using `--pao-color-disabled-*` tokens.

---

## pao-checkbox-group

### Props

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | `''` |
| `label` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `error` | `string` | `''` |
| `helperText` | `string` | `''` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |

### Events

- `paoChange` → `{ values: string[] }` (all currently checked values)

### Behaviour

- Renders a `<fieldset>` with `<legend>` for accessibility.
- On `slotchange`: queries slotted `pao-checkbox` elements, sets their `name` and `disabled` to match the group.
- Listens for `paoChange` bubbling from children; re-emits group-level event with all currently checked values.
- `orientation` controls flex direction of the slotted children container.

---

## pao-radio

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | |
| `name` | `string` | `''` | Set by group if inside pao-radio-group |
| `checked` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | Set by group if group is disabled |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `label` | `string` | `''` | |
| `error` | `string` | `''` | |
| `helperText` | `string` | `''` | |

### Events

- `paoChange` → `{ value: string, checked: boolean }`

### Behaviour

- Visually hidden native `<input type="radio">` + custom circle with filled inner dot when checked.
- No indeterminate state.
- Focus ring matches checkbox.
- Disabled state matches checkbox.

---

## pao-radio-group

### Props

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | `''` |
| `label` | `string` | `''` |
| `value` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `string` | `''` |
| `helperText` | `string` | `''` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |

### Events

- `paoChange` → `{ value: string }`

### Behaviour

- Renders `<fieldset>` with `<legend>`.
- On `slotchange`: queries slotted `pao-radio` elements, sets `name` and `disabled`.
- On child `paoChange`: sets `checked=false` on all siblings, `checked=true` on selected, updates own `value`, re-emits group-level event.

---

## pao-select

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `''` | Active in single-select mode |
| `values` | `string[]` | `[]` | Active in multi-select mode |
| `name` | `string` | `''` | |
| `label` | `string` | `''` | |
| `placeholder` | `string` | `'Select...'` | |
| `multiple` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `error` | `string` | `''` | |
| `helperText` | `string` | `''` | |

### Events

- `paoChange` → `{ value: string, values: string[] }` (both always present)

### Behaviour

**Trigger:**
- Styled identically to `pao-input` — same border, border-radius, sizes, focus ring, error state, disabled state.
- Shows selected label(s) or placeholder text.
- Chevron icon (`▾`) rotates 180° when open.
- Single selected item: shows its label. Multiple items: shows `"N selected"`.

**Dropdown panel:**
- Positioned absolutely below trigger, full trigger width.
- `z-index` controlled via `--pao-select-z-index` CSS custom property (default: `1000`).
- Click-outside: `document` `mousedown` listener, added on open and removed on close.
- Keyboard navigation:
  - `Escape` — close
  - `ArrowDown` / `ArrowUp` — move focus between options
  - `Enter` / `Space` — toggle focused option
- On `slotchange`: syncs `selected` state on all `pao-select-option` children to match current `value`/`values`.

**Multi-select display:**
- Options show a checkmark indicator next to selected items.
- Selecting an option toggles it in/out of the `values` Set without closing the dropdown.
- Single-select closes the dropdown after selection.

---

## pao-select-option

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `selected` | `boolean` | `false` |

### Behaviour

- Renders a `<div role="option">` with `aria-selected` and `aria-disabled`.
- `selected` is set by `pao-select` after each change — not managed internally.
- Fires `paoSelectOption` → `{ value: string }` when clicked (non-disabled), consumed by parent `pao-select`.
- Disabled options: `pointer-events: none`, muted colour.

---

## Accessibility

- Checkbox/radio groups use `<fieldset>` + `<legend>` — screen readers announce the group label with each option.
- All interactive controls have visible focus rings.
- `pao-select` trigger has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`. Panel has `role="listbox"`.
- Error messages rendered with `role="alert"` (matching `pao-input`).
- `required` on groups sets `aria-required` on the fieldset.

---

## Testing

- Unit tests (Web Test Runner + `@web/test-runner`) for each component covering:
  - Rendering with default and explicit props
  - Event emission and detail shape
  - Group coordination (name/disabled propagation, selection enforcement)
  - Keyboard navigation for `pao-select`
  - Indeterminate state transitions for `pao-checkbox`
  - Click-outside closes `pao-select`
- Storybook stories covering all states: default, sizes, disabled, error, required, indeterminate (checkbox), multi-select (select).

---

## Files to Create

```
src/components/pao-checkbox/
  pao-checkbox.ts
  pao-checkbox.styles.ts
  pao-checkbox.stories.tsx
  pao-checkbox.mdx

src/components/pao-checkbox-group/
  pao-checkbox-group.ts
  pao-checkbox-group.styles.ts
  pao-checkbox-group.stories.tsx
  pao-checkbox-group.mdx

src/components/pao-radio/
  pao-radio.ts
  pao-radio.styles.ts
  pao-radio.stories.tsx
  pao-radio.mdx

src/components/pao-radio-group/
  pao-radio-group.ts
  pao-radio-group.styles.ts
  pao-radio-group.stories.tsx
  pao-radio-group.mdx

src/components/pao-select/
  pao-select.ts
  pao-select.styles.ts
  pao-select.stories.tsx
  pao-select.mdx

src/components/pao-select-option/
  pao-select-option.ts
  pao-select-option.styles.ts
```

Update `src/index.ts` to export all 6 new components.
