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

jest.mock('../src/components/pao-select-option/pao-select-option.styles', () => ({
  styles: [],
}));

import { PaoSelectOption } from '../src/components/pao-select-option/pao-select-option';

describe('PaoSelectOption', () => {
  it('has correct default properties', () => {
    const el = new PaoSelectOption();
    expect(el.value).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.selected).toBe(false);
  });

  it('emits paoSelectOption when handleClick is called', () => {
    const el = new PaoSelectOption();
    el.value = 'option-a';

    (el as any).handleClick();

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoSelectOption',
        detail: { value: 'option-a' },
      })
    );
  });

  it('does not emit paoSelectOption when disabled', () => {
    const el = new PaoSelectOption();
    el.disabled = true;

    (el as any).handleClick();

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result with defaults', () => {
    const el = new PaoSelectOption();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when selected', () => {
    const el = new PaoSelectOption();
    el.selected = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when disabled', () => {
    const el = new PaoSelectOption();
    el.disabled = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when selected and disabled', () => {
    const el = new PaoSelectOption();
    el.selected = true;
    el.disabled = true;
    expect(el.render()).toBeDefined();
  });
});
