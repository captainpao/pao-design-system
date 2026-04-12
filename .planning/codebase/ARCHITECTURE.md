# Architecture

**Analysis Date:** 2026-04-12

## Pattern Overview

**Overall:** Component-based Web Component library with composition and reactive state management

**Key Characteristics:**
- Framework-agnostic: Components function as standard Web Components (custom HTML elements)
- Reactive rendering: Lit provides template update mechanism based on property changes
- Shadow DOM encapsulation: Each component has isolated styling and DOM
- Type-safe: Full TypeScript support with exported type definitions
- Custom event system: Components communicate via custom events with "pao" prefix

## Layers

**Component Layer:**
- Purpose: Reusable UI components built as Lit elements
- Location: `src/components/`
- Contains: Custom element implementations (.ts), component styles (.styles.ts), test files, Storybook stories
- Depends on: Lit, style system, utilities
- Used by: Applications consuming the library, Storybook

**Style System Layer:**
- Purpose: Design tokens, colors, typography, and base styles
- Location: `src/styles/` (SCSS) and `src/foundation/` (documentation)
- Contains:
  - `_colors.scss` - CSS custom properties for color palette (primary, secondary, success, warning, danger, etc.)
  - `_typography.scss` - Font sizes, weights, line heights, and font family defaults
  - `_fonts.scss` - Custom font imports (VerlagSSm, FontAwesome)
  - `_base.scss` - Root-level style initialization
  - `index.scss` - Central import point for all styles
- Depends on: SCSS preprocessor
- Used by: All components via import statements

**Icon System Layer:**
- Purpose: Unified icon handling via FontAwesome
- Location: `src/components/pao-icon/`
- Contains: Icon component implementation and utility mappings
- Depends on: @fortawesome packages
- Used by: Buttons, other components needing icons

**Utility Layer:**
- Purpose: Component-specific helpers and data mappings
- Location: `src/components/[component]/[component].utils.ts`
- Contains: Icon maps, helper functions, data transformations
- Example: `pao-icon.utils.ts` exports `iconMap` for SVG rendering

**Asset Layer:**
- Purpose: Static resources bundled with library
- Location: `src/assets/`
- Contains:
  - Fonts: `src/assets/fonts/` (VerlagSSm font files)
  - Images: `src/assets/images/` (component documentation images)

## Data Flow

**Component Property Update Flow:**

1. Parent sets property on custom element: `element.variant = 'secondary'`
2. Lit decorator (`@property`) detects change
3. Component's `render()` method is queued (batched if multiple changes)
4. Template re-evaluates with new values
5. Shadow DOM updates with new classes/attributes
6. Browser paints updated styles

**Event Emission Flow:**

1. User interaction (click, selection change, etc.)
2. Event handler in component creates CustomEvent with "pao" prefix
3. Event bubbles through shadow DOM boundary (`composed: true`)
4. Parent application receives event via `addEventListener()` or `@eventName` binding
5. Parent can access detail object: `event.detail`

**Button Group Selection Flow:**

1. User clicks button in `pao-button-group`
2. Group tracks active indices internally or via controlled `active` property
3. Handler calls `updateActive()` to set new state
4. Emits both `pao-selection-change` (with clicked index) and `pao-active-change` (new active state)
5. Parent can listen to either event or read `active` property

**State Management:**
- Local reactive state: Lit `@state()` decorator (e.g., `_internalActive` in button group)
- Controlled state: Parent passes `active` property and listens for change events
- Derived state: Component methods compute derived values (e.g., button variant based on active state)

## Key Abstractions

**Custom Element Pattern:**
- Purpose: Framework-agnostic reusability across React, Vue, Angular, plain HTML
- Examples: `pao-button`, `pao-icon`, `pao-button-group`
- Pattern: Class extends `LitElement`, decorated with `@customElement('tag-name')`
- Type safety: Extends `HTMLElementTagNameMap` global interface for TypeScript

**Style Encapsulation:**
- Purpose: Prevent style leakage, component-specific styling
- Implementation: Lit's static `styles` property with CSS template literals
- Font and color imports: Via SCSS in style files (e.g., `import '../../styles/_fonts.scss'`)
- Custom properties: CSS variables for theming (`--pao-button-background`, `--pao-color-primary`)

**Property-Driven Rendering:**
- Purpose: Make component behavior data-driven and predictable
- Pattern: `@property` decorator on class fields auto-generates getters/setters
- Reflection: Some properties marked `reflect: true` to sync with HTML attributes
- Types: Exported TypeScript types for each variant (ButtonVariant, ButtonSize, etc.)

**Composition via Slots:**
- Purpose: Allow parent to provide content to components
- Implementation: `<slot></slot>` in templates for button text, etc.
- Named slots: Not used yet (potential for complex layouts)

## Entry Points

**Library Entry:**
- Location: `src/index.ts`
- Triggers: Import in consuming application
- Responsibilities: Imports foundation styles, exports all public component classes and types

**Component Initialization:**
- Location: `src/components/[component]/[component].ts`
- Triggers: HTML parser recognizes custom element tag or JavaScript `new Component()`
- Responsibilities: Setup component properties, register with browser via `@customElement` decorator

**Storybook Entry:**
- Location: `.storybook/main.ts`
- Triggers: `npm run dev`
- Responsibilities: Load stories from `src/**/*.stories.tsx`, initialize Storybook UI, custom branding

## Error Handling

**Strategy:** Components do not throw errors; they degrade gracefully

**Patterns:**
- Missing icons: Returns empty string from iconMap fallback (`iconMap[this.name] || ''`)
- Invalid properties: Uses type system to prevent invalid values at compile time
- Disabled state: Button prevents event emission rather than throwing
- No validation errors: Components trust inputs are valid TypeScript

## Cross-Cutting Concerns

**Styling:** All components import foundation styles via `src/styles/index.scss` to ensure fonts and base tokens are available globally

**Custom Events:** All interactive components emit events prefixed with "pao" to avoid naming conflicts with native events

**Accessibility:** Components include ARIA attributes:
- Buttons: `aria-busy` when loading
- Button groups: `role="group"` for semantic HTML
- Focus visibility: CSS outline on focus for keyboard navigation

**Type Exports:** Each component exports its own types (ButtonVariant, ButtonSize, etc.) and extends HTMLElementTagNameMap for IDE support

---

*Architecture analysis: 2026-04-12*
