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

jest.mock('../src/components/pao-toggle/pao-toggle.styles', () => ({
  styles: [],
}));

import { PaoToggle } from '../src/components/pao-toggle/pao-toggle';
import type { ToggleSize } from '../src/components/pao-toggle/pao-toggle';

describe('PaoToggle', () => {
  it('has correct default properties', () => {
    const el = new PaoToggle();
    expect(el.value).toBe('');
    expect(el.name).toBe('');
    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('accepts all size values', () => {
    const sizes: ToggleSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoToggle();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('emits paoChange and updates checked when handleChange is called', () => {
    const el = new PaoToggle();
    el.value = 'notifications';
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.checked).toBe(true);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'notifications', checked: true },
      })
    );
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoToggle();
    el.disabled = true;
    const fakeInput = { checked: true } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('updates checked to false when unchecked', () => {
    const el = new PaoToggle();
    el.checked = true;
    const fakeInput = { checked: false } as HTMLInputElement;
    const fakeEvent = { target: fakeInput } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.checked).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { value: '', checked: false },
      })
    );
  });

  it('render returns defined result', () => {
    const el = new PaoToggle();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when disabled', () => {
    const el = new PaoToggle();
    el.disabled = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with label, error, helperText', () => {
    const el = new PaoToggle();
    el.label = 'Enable alerts';
    el.error = 'Required';
    el.helperText = 'Helper';
    expect(el.render()).toBeDefined();
  });
});
