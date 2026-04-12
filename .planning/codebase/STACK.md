# Technology Stack

**Analysis Date:** 2026-04-12

## Languages

**Primary:**
- TypeScript 5.3.3 - All source code and component implementation
- SCSS 1.69.5 - Styling for components and foundation

**Secondary:**
- JavaScript - Babel transpilation for Jest testing
- HTML5 - Custom Web Component output and Storybook documentation

## Runtime

**Environment:**
- Node.js (target: current for Babel, ES2020 target for TypeScript)

**Package Manager:**
- npm - Primary package manager
- Lockfile: npm-shrinkwrap.json (implied from package.json)

## Frameworks

**Core:**
- Lit 3.0.0 - Web Component library using decorators and reactive properties
- Web Components standard - Custom element API with shadow DOM

**Documentation & Development:**
- Storybook 10.1.11 - Component documentation and interactive stories
  - @storybook/web-components - Web component adapter
  - @storybook/web-components-vite - Vite integration
  - @storybook/addon-docs - MDX documentation
  - @storybook/addon-links - Navigation between stories
  - @storybook/blocks - Component documentation blocks

**Testing:**
- Jest 30.1.3 - Unit and integration testing framework
- ts-jest 29.4.4 - TypeScript support for Jest
- @open-wc/testing 4.0.0 - Web Component testing utilities
- @web/test-runner - Alternative test runner configuration
- @web/test-runner-playwright - Playwright browser support
- @web/test-runner-coverage-v8 - Coverage reporting

**Build/Dev:**
- Vite 7.1.12 - Module bundler and dev server
- vite-plugin-dts 4.5.4 - TypeScript declaration file generation
- Babel 7.28.4+ - JavaScript transpilation
  - @babel/core
  - @babel/preset-env
  - babel-jest

## Key Dependencies

**Critical:**
- @fortawesome/fontawesome-svg-core 7.0.0 - Icon SVG rendering
- @fortawesome/free-solid-svg-icons 7.0.0 - Icon library (solid set)
- @fortawesome/free-regular-svg-icons 7.0.0 - Icon library (regular set)
- @fortawesome/free-brands-svg-icons 7.0.0 - Icon library (brand set)
- @fortawesome/fontawesome-free 7.0.0 - FontAwesome assets

**Development Quality:**
- ESLint 8.56.0 - Linting and code quality
  - @typescript-eslint/eslint-plugin 6.15.0
  - @typescript-eslint/parser 6.15.0
  - eslint-config-prettier 9.1.0
  - eslint-plugin-storybook 10.1.11
- Prettier 3.1.1 - Code formatter
- Husky 8.0.3 - Git hooks
- lint-staged 15.2.0 - Pre-commit linting

## Configuration

**TypeScript:**
- Target: ES2020
- Module: ESNext
- Declaration: true (generates .d.ts files to `dist/types/`)
- Strict mode: enabled
- Decorators: experimental decorators enabled
- JSX: not used (Web Components instead)

**Build:**
- Entry point: `src/index.ts`
- Output formats: ES modules (.js) and CommonJS (.cjs)
- External dependencies: Lit (not bundled)
- Asset handling: Fonts handled separately in dist/assets/fonts/
- TypeScript declarations: Generated to `dist/types/`

**Environment:**
- Port (dev): 6006 (Storybook)
- Test environment: jsdom (browser-like DOM for Jest)

## Platform Requirements

**Development:**
- Node.js with npm
- TypeScript 5.3.3+
- Modern browser with Web Component support

**Production:**
- Browser with Web Component support (all modern browsers)
- Lit 3.0.0 runtime
- FontAwesome icon system
- Custom VerlagSSm font (bundled)

---

*Stack analysis: 2026-04-12*
