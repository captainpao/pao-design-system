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

jest.mock('../src/components/pao-checkbox-group/pao-checkbox-group.styles', () => ({
  styles: [],
}));

import { PaoCheckboxGroup } from '../src/components/pao-checkbox-group/pao-checkbox-group';
import type { CheckboxGroupOrientation } from '../src/components/pao-checkbox-group/pao-checkbox-group';

describe('PaoCheckboxGroup', () => {
  it('has correct default properties', () => {
    const el = new PaoCheckboxGroup();
    expect(el.name).toBe('');
    expect(el.label).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
    expect(el.orientation).toBe('vertical');
  });

  it('accepts orientation values', () => {
    const orientations: CheckboxGroupOrientation[] = ['vertical', 'horizontal'];
    for (const o of orientations) {
      const el = new PaoCheckboxGroup();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('handleSlotChange sets name on child checkboxes', () => {
    const el = new PaoCheckboxGroup();
    el.name = 'fruits';
    const child1 = { name: '', disabled: false };
    const child2 = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child1, child2] as any);

    (el as any).handleSlotChange();

    expect(child1.name).toBe('fruits');
    expect(child2.name).toBe('fruits');
  });

  it('handleSlotChange sets disabled on children when group is disabled', () => {
    const el = new PaoCheckboxGroup();
    el.disabled = true;
    const child1 = { name: '', disabled: false };
    el.querySelectorAll = jest.fn(() => [child1] as any);

    (el as any).handleSlotChange();

    expect(child1.disabled).toBe(true);
  });

  it('handleChildChange emits paoChange with checked values', () => {
    const el = new PaoCheckboxGroup();
    const child1 = { checked: true, value: 'apple' };
    const child2 = { checked: false, value: 'banana' };
    const child3 = { checked: true, value: 'cherry' };
    el.querySelectorAll = jest.fn(() => [child1, child2, child3] as any);

    (el as any).handleChildChange();

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: { values: ['apple', 'cherry'] },
      })
    );
  });

  it('render returns defined result with defaults', () => {
    const el = new PaoCheckboxGroup();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with label', () => {
    const el = new PaoCheckboxGroup();
    el.label = 'Preferences';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with error', () => {
    const el = new PaoCheckboxGroup();
    el.error = 'Select at least one option';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText (no error)', () => {
    const el = new PaoCheckboxGroup();
    el.helperText = 'You may select multiple';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText suppressed by error', () => {
    const el = new PaoCheckboxGroup();
    el.error = 'Error takes precedence';
    el.helperText = 'Hidden helper';
    expect(el.render()).toBeDefined();
  });
});
