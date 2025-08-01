# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Storybook development server on port 6006
- `npm run build` - Build the library (TypeScript compilation + Vite build)
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint on TypeScript files with auto-fix
- `npm run format` - Format code with Prettier (TypeScript, SCSS, Markdown)

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

### Component Development Guidelines
- Import foundation styles in main index.ts to ensure fonts load
- Use consistent naming: components prefixed with "pao-", events with "pao"
- Follow the existing component structure pattern
- Include comprehensive Storybook stories and MDX documentation
- Components should handle disabled states and accessibility