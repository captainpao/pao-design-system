---
name: component-mdx-docs
description: >-
  Conventions for writing and reviewing component `.mdx` documentation in the pao
  design system (Storybook + @storybook/addon-docs). Use this skill whenever you
  create, edit, or review any `src/components/**/*.mdx` file, add a properties/slots/
  events/keyboard table to component docs, or the user mentions Storybook docs not
  rendering, "raw markdown showing", duplicate Properties sections, or MDX tables.
  Prevents the two recurring bugs in this repo: pipe-markdown tables that render as
  literal text (GFM is not enabled), and duplicate `## Properties` headings.
---

# Component MDX docs conventions

Storybook docs in this repo are authored in MDX via `@storybook/addon-docs`. Two
mistakes keep recurring and both ship silently — they look fine in the source file
but render broken in the browser. This skill exists so they don't happen again.

## The two bugs (and why they happen)

### 1. Pipe-markdown tables render as raw text

`@storybook/addon-docs` MDX does **not** enable GitHub-Flavored Markdown (`remark-gfm`)
by default, and GFM is what turns pipe syntax into `<table>` elements. Without it, this:

```markdown
| Property | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
```

renders verbatim as a single line of literal text with pipes — not a table. There is no
error; it just looks wrong on the docs page. (`<Controls />` still works because it is a
React component, not markdown.)

**Rule: never use pipe-markdown tables in `.mdx`. Write tables as HTML `<table>`.** See the
template below. MDX passes HTML through untouched, so HTML tables always render.

### 2. Duplicate `## Properties` heading

The pattern that crept in was a `## Properties` heading with `<Controls />`, immediately
followed by a *second* `## Properties` heading with a hand-written table listing the same
props. `<Controls />` already renders the primary component's props interactively, so the
second table is redundant *and* (being pipe-markdown) renders as raw text — two bugs at once.

**Rule: each component's own props are documented once, by `<Controls />`. Do not repeat
them as a static table.**

## How to structure a component `.mdx`

```mdx
import { Meta, Primary, Controls } from '@storybook/addon-docs/blocks';
import * as FooStories from './pao-foo.stories';

<Meta of={FooStories} />

# Foo

One-line description of what the component is for.

## Interactive Demo

<Primary />

## Properties

<Controls />
```

Then add **only** the sections that `<Controls />` cannot cover:

- **Sub-component props** (e.g. `pao-tab`, `pao-select-option`, `pao-accordion-item`) —
  `<Controls />` only documents the primary component from `<Meta of={...}>`. Sub-components
  need their own HTML table.
- **Slots**, **Keyboard Navigation**, or any other reference table — HTML table.
- **Events** — a simple markdown list renders fine, no table needed:
  ```markdown
  ## Events
  - `paoChange`: Fired on selection. `event.detail = { value: string }`
  ```
- **Usage** — fenced ```` ```html ```` code blocks render fine.

When a component documents both a primary element and a sub-element, title the primary
section to make the split obvious, e.g. `## Properties (pao-tabs)` (still `<Controls />`),
then `## pao-tab Properties` (HTML table).

## HTML table template

Copy this and fill in rows. Use `<code>` for identifiers/types/defaults and `<em>` for
notes like *(default)* slots.

```html
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>value</code></td>
      <td><code>string</code></td>
      <td><code>''</code></td>
      <td>What it does</td>
    </tr>
  </tbody>
</table>
```

## Reviewing an `.mdx` file (checklist)

- No lines start with `|` — grep for it: `grep -rn '^|' src/components/**/*.mdx`
- No heading appears twice in the same file (especially `## Properties`).
- The primary component's props are shown via `<Controls />`, not duplicated in a table.
- Every reference table is an HTML `<table>`.
- Verify in the browser, don't trust the source: open
  `http://localhost:6006/?path=/docs/components-<name>--docs`. A quick programmatic check
  (via playwright-cli or browser devtools) on the docs iframe — confirm `table` count
  matches expectations and that no `<p>` contains a `|`, which signals a leaked pipe table.

## Note on the alternative fix (GFM)

The root cause could instead be fixed globally by adding `remark-gfm` to the addon-docs
config in `.storybook/main.ts`, which would let pipe-markdown tables render everywhere. The
project has deliberately chosen **not** to do this and to use HTML tables instead, keeping
docs working without a build-config dependency. If that decision is ever revisited, update
this skill — until then, follow the HTML-table convention above.
