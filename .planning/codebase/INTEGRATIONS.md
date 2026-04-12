# External Integrations

**Analysis Date:** 2026-04-12

## APIs & External Services

**Icon Library:**
- FontAwesome - SVG icon rendering for UI components
  - SDK/Client: @fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons
  - No authentication required
  - Integration: Icons registered in `src/components/pao-icon/pao-icon.utils.ts`

## Data Storage

**Databases:**
- Not applicable - this is a design system component library

**File Storage:**
- Local filesystem only
  - Font assets: `src/assets/fonts/` (bundled with library)
  - Images: `src/assets/images/` (static assets)

**Caching:**
- Not applicable - client-side component library

## Authentication & Identity

**Auth Provider:**
- None - this is a component library
- Components are framework-agnostic and delegate auth to consuming applications

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Console logging only via standard JavaScript console API
- No centralized logging system

## CI/CD & Deployment

**Hosting:**
- Local development and distribution via npm
- No cloud deployment infrastructure configured
- Built artifacts: `dist/` directory

**CI Pipeline:**
- Husky pre-commit hooks configured
- Git hooks: `lint-staged` runs linting on staged files before commit
- No external CI/CD service detected (GitHub Actions, etc.)

**Publishing:**
- npm package registry (destination for `npm publish`)
- Package name: `pao-design-system`

## Environment Configuration

**Required env vars:**
- None detected
- Configuration is entirely TypeScript-based

**Secrets location:**
- Not applicable - no credentials needed

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- Custom events emitted by components with "pao" prefix:
  - `paoClick` - Button click event
  - `pao-selection-change` - Button group selection changed
  - `pao-active-change` - Button group active state changed

## Build & Package Distribution

**Package Metadata:**
- UMD build: `dist/pao-design-system.umd.js`
- ES modules: `dist/pao-design-system.js`
- Type declarations: `dist/index.d.ts`
- Files published: contents of `dist/` directory only

**External Package Dependencies:**
- Lit (peer dependency behavior - external to bundle)
- @fortawesome packages (bundled)

---

*Integration audit: 2026-04-12*
