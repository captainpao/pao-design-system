jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn(), querySelectorAll: jest.fn(() => []) };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  nothing: null,
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-alert/pao-alert.styles', () => ({
  styles: [],
}));

import { PaoAlert } from '../src/components/pao-alert/pao-alert';
import type { AlertVariant } from '../src/components/pao-alert/pao-alert';

describe('PaoAlert', () => {
  it('has correct default properties', () => {
    const el = new PaoAlert();
    expect(el.variant).toBe('info');
    expect(el.heading).toBe('');
    expect(el.dismissible).toBe(false);
    expect(el.icon).toBe(true);
    expect((el as any)._dismissed).toBe(false);
  });

  it('accepts all variant values', () => {
    const variants: AlertVariant[] = ['info', 'success', 'warning', 'danger'];
    for (const variant of variants) {
      const el = new PaoAlert();
      el.variant = variant;
      expect(el.variant).toBe(variant);
    }
  });

  it('handleDismiss sets _dismissed to true', () => {
    const el = new PaoAlert();
    (el as any).handleDismiss();
    expect((el as any)._dismissed).toBe(true);
  });

  it('handleDismiss dispatches paoDismiss event', () => {
    const el = new PaoAlert();
    (el as any).handleDismiss();
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoDismiss' })
    );
  });

  it('render is defined when not dismissed', () => {
    const el = new PaoAlert();
    expect(el.render()).toBeDefined();
  });

  it('render returns nothing when dismissed', () => {
    const el = new PaoAlert();
    (el as any)._dismissed = true;
    const result = el.render();
    expect(result).toBeNull();
  });

  it('render is defined with heading set', () => {
    const el = new PaoAlert();
    el.heading = 'Alert heading';
    expect(el.render()).toBeDefined();
  });

  it('render is defined with dismissible set', () => {
    const el = new PaoAlert();
    el.dismissible = true;
    expect(el.render()).toBeDefined();
  });

  it('render is defined with icon set to false', () => {
    const el = new PaoAlert();
    el.icon = false;
    expect(el.render()).toBeDefined();
  });

  it('has static styles defined', () => {
    expect(PaoAlert.styles).toBeDefined();
  });
});
