jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
    contains = jest.fn(() => false);
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-select/pao-select.styles', () => ({
  styles: [],
}));

import { PaoSelect } from '../src/components/pao-select/pao-select';
import type { SelectSize } from '../src/components/pao-select/pao-select';

describe('PaoSelect', () => {
  it('has correct default properties', () => {
    const el = new PaoSelect();
    expect(el.value).toBe('');
    expect(el.values).toEqual([]);
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.placeholder).toBe('Select...');
    expect(el.multiple).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.size).toBe('md');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
  });

  it('open is false by default', () => {
    const el = new PaoSelect();
    expect((el as any).open).toBe(false);
  });

  it('accepts all size values', () => {
    const sizes: SelectSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoSelect();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('handleTriggerClick opens the dropdown', () => {
    const el = new PaoSelect();
    const addEventSpy = jest.spyOn(document, 'addEventListener');

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(true);
    expect(addEventSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addEventSpy.mockRestore();
  });

  it('handleTriggerClick does not open when disabled', () => {
    const el = new PaoSelect();
    el.disabled = true;

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(false);
  });

  it('handleTriggerClick closes when already open', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    (el as any).handleTriggerClick();

    expect((el as any).open).toBe(false);
    removeEventSpy.mockRestore();
  });

  it('_selectValue (single) sets value and closes dropdown', () => {
    const el = new PaoSelect();
    (el as any).open = true;

    (el as any)._selectValue('orange');

    expect(el.value).toBe('orange');
    expect((el as any).open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'orange', values: [] },
      })
    );
  });

  it('_selectValue (multiple) toggles values and stays open', () => {
    const el = new PaoSelect();
    el.multiple = true;
    (el as any).open = true;

    (el as any)._selectValue('apple');
    expect(el.values).toEqual(['apple']);
    expect((el as any).open).toBe(true);

    (el as any)._selectValue('banana');
    expect(el.values).toEqual(['apple', 'banana']);

    (el as any)._selectValue('apple');
    expect(el.values).toEqual(['banana']);
  });

  it('handleKeydown Escape closes the dropdown', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    (el as any).handleKeydown({ key: 'Escape', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any).open).toBe(false);
    removeEventSpy.mockRestore();
  });

  it('render returns defined result', () => {
    const el = new PaoSelect();
    expect(el.render()).toBeDefined();
  });
});
