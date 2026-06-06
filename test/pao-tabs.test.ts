jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-tabs/pao-tabs.styles', () => ({
  styles: [],
}));

import { PaoTabs } from '../src/components/pao-tabs/pao-tabs';
import type { TabsOrientation, TabsVariant } from '../src/components/pao-tabs/pao-tabs';

describe('PaoTabs', () => {
  it('has correct default properties', () => {
    const el = new PaoTabs();
    expect(el.value).toBe('');
    expect(el.orientation).toBe('horizontal');
    expect(el.variant).toBe('line');
    expect((el as any)._tabs).toEqual([]);
  });

  it('accepts all orientation values', () => {
    const orientations: TabsOrientation[] = ['horizontal', 'vertical'];
    for (const o of orientations) {
      const el = new PaoTabs();
      el.orientation = o;
      expect(el.orientation).toBe(o);
    }
  });

  it('accepts all variant values', () => {
    const variants: TabsVariant[] = ['line', 'pill'];
    for (const v of variants) {
      const el = new PaoTabs();
      el.variant = v;
      expect(el.variant).toBe(v);
    }
  });

  it('handleSlotChange populates _tabs from slotted pao-tab elements', () => {
    const el = new PaoTabs();
    el.value = 'a';
    const tab1 = { value: 'a', label: 'Tab A', disabled: false, active: false };
    const tab2 = { value: 'b', label: 'Tab B', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any).handleSlotChange();

    expect((el as any)._tabs).toEqual([
      { value: 'a', label: 'Tab A', disabled: false },
      { value: 'b', label: 'Tab B', disabled: false },
    ]);
  });

  it('handleSlotChange auto-activates first non-disabled tab when value is empty', () => {
    const el = new PaoTabs();
    const tab1 = { value: 'a', label: 'Tab A', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1] as any);

    (el as any).handleSlotChange();

    expect(el.value).toBe('a');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoChange', detail: { value: 'a' } })
    );
  });

  it('handleSlotChange skips disabled tabs when auto-activating', () => {
    const el = new PaoTabs();
    const tab1 = { value: 'a', label: 'Tab A', disabled: true, active: false };
    const tab2 = { value: 'b', label: 'Tab B', disabled: false, active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any).handleSlotChange();

    expect(el.value).toBe('b');
  });

  it('handleTabClick activates tab and emits paoChange', () => {
    const el = new PaoTabs();
    const tab = { value: 'b', active: false };
    el.querySelectorAll = jest.fn(() => [tab] as any);

    (el as any).handleTabClick('b', false);

    expect(el.value).toBe('b');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoChange', detail: { value: 'b' } })
    );
  });

  it('handleTabClick does nothing when tab is disabled', () => {
    const el = new PaoTabs();

    (el as any).handleTabClick('b', true);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
    expect(el.value).toBe('');
  });

  it('_syncActive sets active=true on matching tab and false on others', () => {
    const el = new PaoTabs();
    el.value = 'b';
    const tab1 = { value: 'a', active: false };
    const tab2 = { value: 'b', active: false };
    el.querySelectorAll = jest.fn(() => [tab1, tab2] as any);

    (el as any)._syncActive();

    expect(tab1.active).toBe(false);
    expect(tab2.active).toBe(true);
  });

  it('renders', () => {
    const el = new PaoTabs();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoTabs.styles).toBeDefined();
  });
});
