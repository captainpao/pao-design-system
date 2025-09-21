# Testing Setup

This project uses [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) with [Playwright](https://playwright.dev/) for running unit tests.

## Test Structure

- Tests are located in the `/test` directory
- Each component should have a corresponding `.test.ts` file
- Tests use [@open-wc/testing](https://open-wc.org/docs/testing/overview/) for Lit component testing

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run Tests Once
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Test Coverage

The test runner is configured to generate coverage reports. Coverage thresholds are set at 80% for:
- Statements
- Branches
- Functions
- Lines

## Writing Tests

Tests should follow these patterns:

### Basic Component Test
```typescript
import { fixture, expect, html } from '@open-wc/testing';
import { MyComponent } from '../src/components/my-component';

describe('MyComponent', () => {
  it('renders with default properties', async () => {
    const el = await fixture<MyComponent>(html`<my-component></my-component>`);
    expect(el).to.exist;
  });
});
```

### Testing Properties
```typescript
it('applies correct classes', async () => {
  const el = await fixture<MyComponent>(html`<my-component variant="primary"></my-component>`);
  const element = el.shadowRoot!.querySelector('.my-element');
  expect(element!.classList.contains('primary')).to.be.true;
});
```

### Testing Events
```typescript
it('emits custom event', async () => {
  const el = await fixture<MyComponent>(html`<my-component></my-component>`);

  let eventEmitted = false;
  el.addEventListener('myEvent', () => {
    eventEmitted = true;
  });

  // Trigger the event
  expect(eventEmitted).to.be.true;
});
```

### Testing Accessibility
```typescript
it('is accessible', async () => {
  const el = await fixture<MyComponent>(html`<my-component></my-component>`);
  await expect(el).to.be.accessible();
});
```

## Best Practices

1. **Test all properties**: Ensure each property is tested with different values
2. **Test edge cases**: Include tests for disabled states, loading states, etc.
3. **Test events**: Verify that custom events are emitted correctly
4. **Test accessibility**: Use `@open-wc/testing` accessibility assertions
5. **Test combinations**: Test how different properties interact with each other
6. **Use proper imports**: Always import from the source files, not from dist

## Configuration

The test configuration is in `web-test-runner.config.js` and includes:
- Playwright browser launcher
- Coverage reporting
- TypeScript support
- Node resolution for imports