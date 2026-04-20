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

jest.mock('../src/components/pao-checkbox/pao-checkbox.styles', () => ({
  styles: [],
}));

import { PaoCheckbox } from '../src/components/pao-checkbox/pao-checkbox';
import type { CheckboxSize } from '../src/components/pao-checkbox/pao-checkbox';

describe('PaoCheckbox', () => {
  it('has correct default properties', () => {
    const el = new PaoCheckbox();
    expect(el.value).toBe('');
    expect(el.name).toBe('');
    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('accepts all size values', () => {
    const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoCheckbox();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('emits paoChange when handleChange is called', () => {
    const el = new PaoCheckbox();
    el.value = 'apple';
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'apple', checked: true, indeterminate: false },
      })
    );
    expect(el.checked).toBe(true);
    expect(el.indeterminate).toBe(false);
  });

  it('clears indeterminate when handleChange is called', () => {
    const el = new PaoCheckbox();
    el.indeterminate = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.indeterminate).toBe(false);
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoCheckbox();
    el.disabled = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoCheckbox();
    expect(el.render()).toBeDefined();
  });
});
