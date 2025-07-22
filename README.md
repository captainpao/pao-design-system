# pao-design-system

[![npm version](https://img.shields.io/npm/v/pao-design-system.svg?style=flat)](https://www.npmjs.com/package/pao-design-system)

A framework-agnostic UI component library built with Web Components (Lit). Use these components with any framework or no framework at all!

## Installation

```bash
# npm
npm install pao-design-system

# yarn
yarn add pao-design-system

# pnpm
pnpm add pao-design-system
```

## Usage

### In React

```tsx
import 'pao-design-system';
import { createComponent } from '@lit/react';
import { PaoButton } from 'pao-design-system';

// Create React wrapper (do this once)
export const Button = createComponent({
  tagName: 'pao-button',
  elementClass: PaoButton,
  react: React,
  events: {
    onPaoClick: 'paoClick',
  },
});

// Use in your components
function App() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onPaoClick={(e) => console.log('clicked', e.detail)}
    >
      Click me
    </Button>
  );
}
```

### In Angular

```typescript
// In your module
import 'pao-design-system';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule { }

// In your component template
<pao-button 
  variant="primary" 
  size="md"
  (paoClick)="handleClick($event)"
>
  Click me
</pao-button>
```

### In Vue

```vue
<script setup>
import 'pao-design-system';
</script>

<template>
  <pao-button 
    variant="primary" 
    size="md"
    @pao-click="handleClick"
  >
    Click me
  </pao-button>
</template>
```

### In Plain HTML

```html
<script type="module">
  import 'pao-design-system';
</script>

<pao-button variant="primary" size="md">
  Click me
</pao-button>
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build the library
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## API Reference

### pao-button

A customizable button component that supports different variants and sizes.

#### Props

| Name      | Type                             | Default    | Description                    |
|-----------|----------------------------------|------------|--------------------------------|
| variant   | 'primary' \| 'secondary' \| 'ghost' | 'primary' | The visual style of the button |
| size      | 'sm' \| 'md' \| 'lg'            | 'md'      | The size of the button         |
| disabled  | boolean                          | false     | Whether the button is disabled |

#### Events

| Name      | Detail                    | Description                    |
|-----------|---------------------------|--------------------------------|
| paoClick  | { originalEvent: Event } | Emitted when button is clicked |

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT
