jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    disconnectedCallback() {}
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-toast/pao-toast.styles', () => ({
  styles: [],
}));

import { PaoToast } from '../src/components/pao-toast/pao-toast';
import type { ToastVariant } from '../src/components/pao-toast/pao-toast';

describe('PaoToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('has correct default properties', () => {
    const el = new PaoToast();
    expect(el.variant).toBe('primary');
    expect(el.title).toBe('');
    expect(el.message).toBe('');
    expect(el.open).toBe(false);
    expect(el.dismissible).toBe(true);
    expect(el.duration).toBe(0);
  });

  it('accepts all variant values', () => {
    const variants: ToastVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
    for (const variant of variants) {
      const el = new PaoToast();
      el.variant = variant;
      expect(el.variant).toBe(variant);
    }
  });

  it('dismiss() sets open to false and dispatches paoDismiss', () => {
    const el = new PaoToast();
    el.open = true;
    el.variant = 'success';

    el.dismiss();

    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoDismiss',
        detail: { variant: 'success' },
      })
    );
  });

  it('render returns empty when open is false', () => {
    const el = new PaoToast();
    el.open = false;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when open is true', () => {
    const el = new PaoToast();
    el.open = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with title', () => {
    const el = new PaoToast();
    el.open = true;
    el.title = 'Alert';
    el.message = 'Something happened.';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with dismissible false', () => {
    const el = new PaoToast();
    el.open = true;
    el.dismissible = false;
    expect(el.render()).toBeDefined();
  });

  it('updated starts auto-dismiss timer when open and duration > 0', () => {
    const el = new PaoToast();
    el.open = true;
    el.duration = 2000;
    const dismissSpy = jest.spyOn(el, 'dismiss');

    const changed = new Map<string, unknown>([['open', false]]);
    (el as any).updated(changed);

    jest.advanceTimersByTime(2000);

    expect(dismissSpy).toHaveBeenCalled();
  });

  it('updated does not start timer when duration is 0', () => {
    const el = new PaoToast();
    el.open = true;
    el.duration = 0;
    const dismissSpy = jest.spyOn(el, 'dismiss');

    const changed = new Map<string, unknown>([['open', false]]);
    (el as any).updated(changed);

    jest.advanceTimersByTime(5000);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('updated does not start timer when open is false', () => {
    const el = new PaoToast();
    el.open = false;
    el.duration = 2000;
    const dismissSpy = jest.spyOn(el, 'dismiss');

    const changed = new Map<string, unknown>([['open', true]]);
    (el as any).updated(changed);

    jest.advanceTimersByTime(3000);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('_clearTimer cancels a pending auto-dismiss', () => {
    const el = new PaoToast();
    el.open = true;
    el.duration = 2000;
    const dismissSpy = jest.spyOn(el, 'dismiss');

    const changed = new Map<string, unknown>([['open', false]]);
    (el as any).updated(changed);

    (el as any)._clearTimer();
    jest.advanceTimersByTime(3000);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('disconnectedCallback clears any pending timer', () => {
    const el = new PaoToast();
    el.open = true;
    el.duration = 1000;
    const dismissSpy = jest.spyOn(el, 'dismiss');

    const changed = new Map<string, unknown>([['open', false]]);
    (el as any).updated(changed);

    el.disconnectedCallback();
    jest.advanceTimersByTime(2000);

    expect(dismissSpy).not.toHaveBeenCalled();
  });
});
