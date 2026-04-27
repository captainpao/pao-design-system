# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Storybook development server on port 6006
- `npm run build` - Build the library (TypeScript compilation + Vite build)
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint on TypeScript files with auto-fix
- `npm run format` - Format code with Prettier (TypeScript, SCSS, Markdown)
- `npm test` - Run Jest test suite
- `npm run test:coverage` - Run Jest with coverage (threshold: 80% statements/branches/functions/lines)
- `npm run test:watch` - Run Jest in watch mode

## Architecture Overview

This is a framework-agnostic Web Component design system built with Lit. The library is designed to work with React, Angular, Vue, and plain HTML.

### Component Structure
- Each component follows a consistent pattern with separate files for:
  - `*.ts` - Main component implementation (Lit element)
  - `*.styles.ts` - Styled components using Lit's CSS
  - `*.stories.tsx` - Storybook stories for documentation
  - `*.mdx` - Component documentation
  - `*.utils.ts` - Component-specific utilities (when needed)

### Key Architectural Patterns
- Components are built as Lit elements with `@customElement` decorator
- All components emit custom events prefixed with "pao" (e.g., `paoClick`)
- TypeScript types are exported for props (e.g., `ButtonVariant`, `ButtonSize`)
- Global HTML element types are extended via `HTMLElementTagNameMap`
- Components use slots for content projection
- SCSS is used for styling with custom font loading

### Build Configuration
- Vite builds the library in both ES modules and CommonJS formats
- TypeScript declarations are generated to `dist/types/`
- FontAwesome icons are integrated via separate imports
- Custom VerlagSSm fonts are bundled with the library
- External dependencies (Lit) are not bundled

### Testing Conventions
- Tests live in `/test/` directory (one `.test.ts` file per component)
- Testing approach: Jest with mocked Lit (mock `lit`, `lit/decorators.js`, and component styles)
- Test pattern: instantiate component with `new ComponentName()`, test properties, methods, and render output
- Test groups: default properties, accepted values, public methods, event dispatch, edge cases (disabled, error states)
- Use `jest.spyOn()` for testing private method calls and `jest.fn()` for mocked DOM
- Use `jest.useFakeTimers()` / `jest.useRealTimers()` for components with timers (delay, auto-dismiss)
- Coverage threshold is 80% across statements, branches, functions, and lines

### Storybook Patterns
- Stories use `@storybook/web-components-vite` with typed `Meta` and `StoryObj`
- Story args are defined as interfaces with matching `argTypes` for controls
- Stories use `lit` template literal (`html\`...\``) for rendering
- MDX documentation includes `Meta`, `Primary`, and `Controls` blocks plus events/methods/usage docs
- Interactive demos should start in a neutral state with trigger elements to invoke the component

### Accessibility Requirements
- Use `aria-*` attributes: `aria-label`, `aria-modal`, `aria-invalid`, `role="dialog"`, `role="alert"`, `role="tooltip"`
- Use `?disabled=${...}` binding with boolean attribute reflection
- Support keyboard interaction: Escape to dismiss modals, focus/blur for tooltips
- Custom events must use `bubbles: true, composed: true` for proper event propagation through shadow DOM

### CSS Variable System
- Use design tokens from `src/styles/_colors.scss` (`--pao-color-primary`, `--pao-gray-*`, etc.)
- Each component exposes `--pao-*` custom properties at `:host` for consumer overrides
- Use `part` attribute (`part="button"`, `part="panel"`) on key elements for CSS customization
- SCSS is used for foundation styles, Lit `css` tagged templates for component styles

### Coding Style
- TypeScript strict mode enabled; no unused locals or params allowed
- All component properties use `@property({ type: ..., reflect: ... })` decorators
- Boolean properties use `@property({ type: Boolean })` with class field default `= false`
- String enums/types are exported for every property enum (e.g., `ButtonSize`, `ToastVariant`)
- Convention: method name `handle{Event}` for private event handlers (e.g., `handleClick`, `handleInput`)

### Component Development Guidelines
- Import foundation styles in main index.ts to ensure fonts load
- Use consistent naming: components prefixed with "pao-", events with "pao"
- Follow the existing component structure pattern
- Include comprehensive Storybook stories and MDX documentation
- Components should handle disabled states and accessibility
- Export component from `src/index.ts` after creation so it's included in the library build