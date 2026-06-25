jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn(), querySelectorAll: jest.fn(() => []) };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  nothing: null,
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-tag/pao-tag.styles', () => ({
  styles: [],
}));

import { PaoTag } from '../src/components/pao-tag/pao-tag';
import type { TagVariant, TagSize } from '../src/components/pao-tag/pao-tag';

describe('PaoTag', () => {
  it('has correct default properties', () => {
    const el = new PaoTag();
    expect(el.variant).toBe('neutral');
    expect(el.size).toBe('md');
    expect(el.removable).toBe(false);
  });

  it('accepts all variant values', () => {
    const variants: TagVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'];
    for (const variant of variants) {
      const el = new PaoTag();
      el.variant = variant;
      expect(el.variant).toBe(variant);
    }
  });

  it('accepts all size values', () => {
    const sizes: TagSize[] = ['sm', 'md'];
    for (const size of sizes) {
      const el = new PaoTag();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('handleRemove dispatches paoRemove event', () => {
    const el = new PaoTag();
    (el as any).handleRemove();
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoRemove' })
    );
  });

  it('handleRemove dispatches event with bubbles and composed', () => {
    const el = new PaoTag();
    (el as any).handleRemove();
    const event = (el.dispatchEvent as jest.Mock).mock.calls[0][0] as CustomEvent;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('render is defined', () => {
    const el = new PaoTag();
    expect(el.render()).toBeDefined();
  });

  it('render is defined when removable is true', () => {
    const el = new PaoTag();
    el.removable = true;
    expect(el.render()).toBeDefined();
  });

  it('has static styles defined', () => {
    expect(PaoTag.styles).toBeDefined();
  });
});
