jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-menu-item/pao-menu-item.styles', () => ({
  styles: [],
}));

import { PaoMenuItem } from '../src/components/pao-menu-item/pao-menu-item';

describe('PaoMenuItem', () => {
  describe('default properties', () => {
    it('has correct default property values', () => {
      const el = new PaoMenuItem();
      expect(el.value).toBe('');
      expect(el.label).toBe('');
      expect(el.disabled).toBe(false);
    });
  });

  describe('accepted values', () => {
    it('accepts a value string', () => {
      const el = new PaoMenuItem();
      el.value = 'item-1';
      expect(el.value).toBe('item-1');
    });

    it('accepts a label string', () => {
      const el = new PaoMenuItem();
      el.label = 'Edit';
      expect(el.label).toBe('Edit');
    });

    it('accepts disabled=true', () => {
      const el = new PaoMenuItem();
      el.disabled = true;
      expect(el.disabled).toBe(true);
    });
  });

  describe('handleClick', () => {
    it('dispatches paoSelect with value when enabled', () => {
      const el = new PaoMenuItem();
      el.value = 'delete';
      (el as any).handleClick();
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoSelect', detail: { value: 'delete' } })
      );
    });

    it('does nothing when disabled', () => {
      const el = new PaoMenuItem();
      el.disabled = true;
      el.value = 'delete';
      (el as any).handleClick();
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });

    it('dispatches with empty value when value is not set', () => {
      const el = new PaoMenuItem();
      (el as any).handleClick();
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoSelect', detail: { value: '' } })
      );
    });
  });

  describe('render', () => {
    it('renders when enabled', () => {
      const el = new PaoMenuItem();
      expect(el.render()).toBeDefined();
    });

    it('renders when disabled', () => {
      const el = new PaoMenuItem();
      el.disabled = true;
      expect(el.render()).toBeDefined();
    });

    it('renders with label', () => {
      const el = new PaoMenuItem();
      el.label = 'Save';
      expect(el.render()).toBeDefined();
    });
  });

  describe('static styles', () => {
    it('has static styles defined', () => {
      expect(PaoMenuItem.styles).toBeDefined();
    });
  });
});
