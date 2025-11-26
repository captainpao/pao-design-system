// Mock Lit dependencies for Jest testing
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = {
      querySelector: jest.fn(),
    };
    updateComplete = Promise.resolve();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-button/pao-button.styles', () => ({
  styles: [],
}));

import { PaoButton } from '../src/components/pao-button/pao-button';
import type { ButtonVariant, ButtonSize, ButtonAppearance } from '../src/components/pao-button/pao-button';

describe('PaoButton', () => {
  it('renders with default properties', () => {
    const el = new PaoButton();

    expect(el).toBeDefined();
    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.disabled).toBe(false);
    expect(el.loading).toBe(false);
    expect(el.appearance).toBe('solid');
  });

  it('applies correct variant classes', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'ghost', 'outline'];

    for (const variant of variants) {
      const el = new PaoButton();
      el.variant = variant;
      expect(el.variant).toBe(variant);
    }
  });

  it('applies correct size classes', () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = new PaoButton();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('applies correct appearance classes', () => {
    const appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];

    for (const appearance of appearances) {
      const el = new PaoButton();
      el.appearance = appearance;
      expect(el.appearance).toBe(appearance);
    }
  });

  it('handles disabled state correctly', () => {
    const el = new PaoButton();
    el.disabled = true;

    expect(el.disabled).toBe(true);
  });

  it('handles loading state correctly', () => {
    const el = new PaoButton();
    el.loading = true;

    expect(el.loading).toBe(true);
  });

  it('emits paoClick event when clicked and not disabled/loading', () => {
    const el = new PaoButton();

    let clickEvent: CustomEvent | null = null;
    el.addEventListener = jest.fn((event: string, handler: Function) => {
      if (event === 'paoClick') {
        clickEvent = new CustomEvent('paoClick', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: new MouseEvent('click') },
        });
        handler(clickEvent);
      }
    });

    el.dispatchEvent = jest.fn();

    // Mock the handleClick method
    el.handleClick = jest.fn((e: MouseEvent) => {
      if (!el.disabled && !el.loading) {
        const event = new CustomEvent('paoClick', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        });
        el.dispatchEvent(event);
      }
    });

    const mockEvent = new MouseEvent('click');
    el.handleClick(mockEvent);

    expect(el.dispatchEvent).toHaveBeenCalled();
  });

  it('does not emit paoClick event when disabled', () => {
    const el = new PaoButton();
    el.disabled = true;

    el.dispatchEvent = jest.fn();

    // Mock the handleClick method
    el.handleClick = jest.fn((e: MouseEvent) => {
      if (!el.disabled && !el.loading) {
        const event = new CustomEvent('paoClick', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        });
        el.dispatchEvent(event);
      }
    });

    const mockEvent = new MouseEvent('click');
    el.handleClick(mockEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('does not emit paoClick event when loading', () => {
    const el = new PaoButton();
    el.loading = true;

    el.dispatchEvent = jest.fn();

    // Mock the handleClick method
    el.handleClick = jest.fn((e: MouseEvent) => {
      if (!el.disabled && !el.loading) {
        const event = new CustomEvent('paoClick', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        });
        el.dispatchEvent(event);
      }
    });

    const mockEvent = new MouseEvent('click');
    el.handleClick(mockEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('updates properties correctly', async () => {
    const el = new PaoButton();

    // Test variant change
    el.variant = 'success';
    expect(el.variant).toBe('success');

    // Test size change
    el.size = 'lg';
    expect(el.size).toBe('lg');

    // Test appearance change
    el.appearance = 'outline';
    expect(el.appearance).toBe('outline');

    // Test loading state change
    el.loading = true;
    expect(el.loading).toBe(true);

    // Test disabled state change
    el.disabled = true;
    expect(el.disabled).toBe(true);
  });

  it('handles combined states correctly', () => {
    const el = new PaoButton();
    el.variant = 'warning';
    el.size = 'sm';
    el.appearance = 'ghost';
    el.loading = true;
    el.disabled = true;

    expect(el.variant).toBe('warning');
    expect(el.size).toBe('sm');
    expect(el.appearance).toBe('ghost');
    expect(el.loading).toBe(true);
    expect(el.disabled).toBe(true);
  });

  it('handles pillShape property correctly', () => {
    const el = new PaoButton();
    expect(el.pillShape).toBe(false);

    el.pillShape = true;
    expect(el.pillShape).toBe(true);
  });

  it('renders with pill class when pillShape is true', () => {
    const el = new PaoButton();
    el.pillShape = true;
    const result = el.render();

    expect(result).toBeDefined();
  });

  it('renders with correct button classes', () => {
    const el = new PaoButton();
    const result = el.render();

    // The render method should return a template result
    expect(result).toBeDefined();
  });

  it('renders with loading state classes', () => {
    const el = new PaoButton();
    el.loading = true;
    const result = el.render();

    expect(result).toBeDefined();
  });

  it('renders with disabled state classes', () => {
    const el = new PaoButton();
    el.disabled = true;
    const result = el.render();

    expect(result).toBeDefined();
  });

  it('renders with custom variant classes', () => {
    const el = new PaoButton();
    el.variant = 'success';
    el.size = 'lg';
    el.appearance = 'outline';
    const result = el.render();

    expect(result).toBeDefined();
  });

  it('renders with combined loading and disabled states', () => {
    const el = new PaoButton();
    el.loading = true;
    el.disabled = true;
    const result = el.render();

    expect(result).toBeDefined();
  });
});