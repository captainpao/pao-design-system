jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-radio-group/pao-radio-group.styles', () => ({
  styles: [],
}));

import { PaoRadioGroup } from '../src/components/pao-radio-group/pao-radio-group';
import type { RadioGroupOrientation } from '../src/components/pao-radio-group/pao-radio-group';

describe('PaoRadioGroup', () => {
  it('has correct default properties', () => {
    const el = new PaoRadioGroup();
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.value).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
    expect(el.orientation).toBe('vertical');
  });

  it('accepts orientation values', () => {
    const orientations: RadioGroupOrientation[] = ['vertical', 'horizontal'];
    for (const o of orientations) {
      const el = new PaoRadioGroup();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('handleSlotChange sets name and disabled on child radios', () => {
    const el = new PaoRadioGroup();
    el.name = 'plan';
    el.disabled = true;
    const child = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child] as any);

    (el as any).handleSlotChange();

    expect(child.name).toBe('plan');
    expect(child.disabled).toBe(true);
  });

  it('handleChildChange unchecks all siblings and checks the selected radio', () => {
    const el = new PaoRadioGroup();
    const child1 = { value: 'a', checked: true };
    const child2 = { value: 'b', checked: true };
    const child3 = { value: 'c', checked: false };
    el.querySelectorAll = jest.fn(() => [child1, child2, child3] as any);

    const fakeEvent = new CustomEvent('paoChange', { detail: { value: 'b', checked: true } });
    (el as any).handleChildChange(fakeEvent);

    expect(child1.checked).toBe(false);
    expect(child2.checked).toBe(true);
    expect(child3.checked).toBe(false);
  });

  it('handleChildChange updates own value and emits paoChange', () => {
    const el = new PaoRadioGroup();
    const child = { value: 'pro', checked: false };
    el.querySelectorAll = jest.fn(() => [child] as any);

    const fakeEvent = new CustomEvent('paoChange', { detail: { value: 'pro', checked: true } });
    (el as any).handleChildChange(fakeEvent);

    expect(el.value).toBe('pro');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { value: 'pro' },
      })
    );
  });

  it('render returns defined result', () => {
    const el = new PaoRadioGroup();
    expect(el.render()).toBeDefined();
  });
});
