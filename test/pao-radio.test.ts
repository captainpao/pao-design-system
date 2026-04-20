jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-radio/pao-radio.styles', () => ({
  styles: [],
}));

import { PaoRadio } from '../src/components/pao-radio/pao-radio';
import type { RadioSize } from '../src/components/pao-radio/pao-radio';

describe('PaoRadio', () => {
  it('has correct default properties', () => {
    const el = new PaoRadio();
    expect(el.value).toBe('');
    expect(el.name).toBe('');
    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('accepts all size values', () => {
    const sizes: RadioSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoRadio();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('emits paoChange when handleChange is called', () => {
    const el = new PaoRadio();
    el.value = 'option-a';
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'option-a', checked: true },
      })
    );
    expect(el.checked).toBe(true);
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoRadio();
    el.disabled = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoRadio();
    expect(el.render()).toBeDefined();
  });
});
