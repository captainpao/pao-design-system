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

  it('updated sets indeterminate on the input when changed', () => {
    const el = new PaoCheckbox();
    const fakeInput = { indeterminate: false };
    el.shadowRoot = { querySelector: jest.fn(() => fakeInput) } as any;
    el.indeterminate = true;

    const changed = new Map<string, unknown>([['indeterminate', false]]);
    (el as any).updated(changed);

    expect(fakeInput.indeterminate).toBe(true);
  });

  it('updated does nothing when indeterminate is not in changed map', () => {
    const el = new PaoCheckbox();
    const querySpy = jest.fn();
    el.shadowRoot = { querySelector: querySpy } as any;

    const changed = new Map<string, unknown>([['checked', false]]);
    (el as any).updated(changed);

    expect(querySpy).not.toHaveBeenCalled();
  });

  it('updated handles missing input element gracefully', () => {
    const el = new PaoCheckbox();
    el.shadowRoot = { querySelector: jest.fn(() => null) } as any;
    el.indeterminate = true;

    const changed = new Map<string, unknown>([['indeterminate', false]]);
    expect(() => (el as any).updated(changed)).not.toThrow();
  });

  it('render returns defined result with defaults', () => {
    const el = new PaoCheckbox();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when disabled', () => {
    const el = new PaoCheckbox();
    el.disabled = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with label', () => {
    const el = new PaoCheckbox();
    el.label = 'Accept terms';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with error', () => {
    const el = new PaoCheckbox();
    el.error = 'This field is required';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText (no error)', () => {
    const el = new PaoCheckbox();
    el.helperText = 'Optional helper';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText suppressed by error', () => {
    const el = new PaoCheckbox();
    el.error = 'Error takes precedence';
    el.helperText = 'Helper is hidden';
    expect(el.render()).toBeDefined();
  });
});
