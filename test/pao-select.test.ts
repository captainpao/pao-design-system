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

  it('_handleOutsideClick closes dropdown when target is outside', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    el.contains = jest.fn(() => false);
    el.shadowRoot = { contains: jest.fn(() => false) } as any;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    const fakeEvent = { target: document.createElement('div') } as unknown as MouseEvent;
    (el as any)._handleOutsideClick(fakeEvent);

    expect((el as any).open).toBe(false);
    expect(removeEventSpy).toHaveBeenCalled();
    removeEventSpy.mockRestore();
  });

  it('_handleOutsideClick does not close when target is inside', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    el.contains = jest.fn(() => true);

    const fakeEvent = { target: document.createElement('div') } as unknown as MouseEvent;
    (el as any)._handleOutsideClick(fakeEvent);

    expect((el as any).open).toBe(true);
  });

  it('_syncOptions marks single-select option as selected', () => {
    const el = new PaoSelect();
    el.value = 'orange';
    el.multiple = false;
    const opt1 = { value: 'apple', selected: false };
    const opt2 = { value: 'orange', selected: false };
    el.querySelectorAll = jest.fn(() => [opt1, opt2] as any);

    (el as any)._syncOptions();

    expect(opt1.selected).toBe(false);
    expect(opt2.selected).toBe(true);
  });

  it('_syncOptions marks multiple-select options as selected', () => {
    const el = new PaoSelect();
    el.values = ['apple', 'cherry'];
    el.multiple = true;
    const opt1 = { value: 'apple', selected: false };
    const opt2 = { value: 'banana', selected: false };
    const opt3 = { value: 'cherry', selected: false };
    el.querySelectorAll = jest.fn(() => [opt1, opt2, opt3] as any);

    (el as any)._syncOptions();

    expect(opt1.selected).toBe(true);
    expect(opt2.selected).toBe(false);
    expect(opt3.selected).toBe(true);
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

  it('handleOptionSelect delegates to _selectValue', () => {
    const el = new PaoSelect();
    const selectSpy = jest.spyOn(el as any, '_selectValue');

    const fakeEvent = new CustomEvent('paoSelectOption', { detail: { value: 'mango' } });
    (el as any).handleOptionSelect(fakeEvent);

    expect(selectSpy).toHaveBeenCalledWith('mango');
  });

  it('handleKeydown Escape closes the dropdown', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');

    (el as any).handleKeydown({ key: 'Escape', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any).open).toBe(false);
    removeEventSpy.mockRestore();
  });

  it('handleKeydown ArrowDown increments _focusedIndex', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = -1;
    const opt = { disabled: false };
    el.querySelectorAll = jest.fn(() => [opt, opt, opt] as any);

    (el as any).handleKeydown({ key: 'ArrowDown', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any)._focusedIndex).toBe(0);
  });

  it('handleKeydown ArrowDown does not exceed last option', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = 2;
    const opt = { disabled: false };
    el.querySelectorAll = jest.fn(() => [opt, opt, opt] as any);

    (el as any).handleKeydown({ key: 'ArrowDown', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any)._focusedIndex).toBe(2);
  });

  it('handleKeydown ArrowUp decrements _focusedIndex', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = 2;
    el.querySelectorAll = jest.fn(() => [{}, {}, {}] as any);

    (el as any).handleKeydown({ key: 'ArrowUp', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any)._focusedIndex).toBe(1);
  });

  it('handleKeydown ArrowUp does not go below 0', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = 0;
    el.querySelectorAll = jest.fn(() => [{}, {}] as any);

    (el as any).handleKeydown({ key: 'ArrowUp', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect((el as any)._focusedIndex).toBe(0);
  });

  it('handleKeydown Enter selects the focused option', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = 1;
    const opt1 = { value: 'apple' };
    const opt2 = { value: 'banana' };
    el.querySelectorAll = jest.fn(() => [opt1, opt2] as any);
    const selectSpy = jest.spyOn(el as any, '_selectValue');

    (el as any).handleKeydown({ key: 'Enter', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect(selectSpy).toHaveBeenCalledWith('banana');
  });

  it('handleKeydown Space selects the focused option', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = 0;
    const opt = { value: 'cherry' };
    el.querySelectorAll = jest.fn(() => [opt] as any);
    const selectSpy = jest.spyOn(el as any, '_selectValue');

    (el as any).handleKeydown({ key: ' ', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect(selectSpy).toHaveBeenCalledWith('cherry');
  });

  it('handleKeydown Enter does nothing when focusedIndex is -1', () => {
    const el = new PaoSelect();
    (el as any)._focusedIndex = -1;
    el.querySelectorAll = jest.fn(() => [{ value: 'a' }] as any);
    const selectSpy = jest.spyOn(el as any, '_selectValue');

    (el as any).handleKeydown({ key: 'Enter', preventDefault: jest.fn() } as unknown as KeyboardEvent);

    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('getDisplayText returns empty string when no value selected (single)', () => {
    const el = new PaoSelect();
    el.value = '';
    expect((el as any).getDisplayText()).toBe('');
  });

  it('getDisplayText returns value when no matching option found (single)', () => {
    const el = new PaoSelect();
    el.value = 'mango';
    el.querySelectorAll = jest.fn(() => [] as any);
    expect((el as any).getDisplayText()).toBe('mango');
  });

  it('getDisplayText returns option textContent for matching single option', () => {
    const el = new PaoSelect();
    el.value = 'apple';
    const opt = { value: 'apple', textContent: '  Apple  ' };
    el.querySelectorAll = jest.fn(() => [opt] as any);
    expect((el as any).getDisplayText()).toBe('Apple');
  });

  it('getDisplayText returns empty string when multiple with no values', () => {
    const el = new PaoSelect();
    el.multiple = true;
    el.values = [];
    expect((el as any).getDisplayText()).toBe('');
  });

  it('getDisplayText returns option textContent for single multiple value', () => {
    const el = new PaoSelect();
    el.multiple = true;
    el.values = ['banana'];
    const opt = { value: 'banana', textContent: 'Banana' };
    el.querySelectorAll = jest.fn(() => [opt] as any);
    expect((el as any).getDisplayText()).toBe('Banana');
  });

  it('getDisplayText returns value fallback when option has no textContent (multiple, 1 value)', () => {
    const el = new PaoSelect();
    el.multiple = true;
    el.values = ['banana'];
    el.querySelectorAll = jest.fn(() => [] as any);
    expect((el as any).getDisplayText()).toBe('banana');
  });

  it('getDisplayText returns count when multiple values selected', () => {
    const el = new PaoSelect();
    el.multiple = true;
    el.values = ['a', 'b', 'c'];
    expect((el as any).getDisplayText()).toBe('3 selected');
  });

  it('render returns defined result with defaults', () => {
    const el = new PaoSelect();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with label and required', () => {
    const el = new PaoSelect();
    el.label = 'Pick an option';
    el.required = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when open', () => {
    const el = new PaoSelect();
    (el as any).open = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with error', () => {
    const el = new PaoSelect();
    el.error = 'Selection is required';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText (no error)', () => {
    const el = new PaoSelect();
    el.helperText = 'Choose from the list';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when disabled', () => {
    const el = new PaoSelect();
    el.disabled = true;
    expect(el.render()).toBeDefined();
  });
});
