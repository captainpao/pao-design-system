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

jest.mock('../src/components/pao-tooltip/pao-tooltip.styles', () => ({
  styles: [],
}));

import { PaoTooltip } from '../src/components/pao-tooltip/pao-tooltip';
import type { TooltipPosition } from '../src/components/pao-tooltip/pao-tooltip';

describe('PaoTooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('has correct default properties', () => {
    const el = new PaoTooltip();
    expect(el.content).toBe('');
    expect(el.position).toBe('top');
    expect(el.disabled).toBe(false);
    expect(el.delay).toBe(0);
    expect(el.open).toBe(false);
  });

  it('accepts all position values', () => {
    const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
      const el = new PaoTooltip();
      el.position = position;
      expect(el.position).toBe(position);
    }
  });

  it('show() sets open and dispatches paoShow', () => {
    const el = new PaoTooltip();
    el.show();

    expect(el.open).toBe(true);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoShow',
      })
    );
  });

  it('hide() sets open to false and dispatches paoHide', () => {
    const el = new PaoTooltip();
    el.open = true;

    el.hide();

    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoHide',
      })
    );
  });

  it('show() does nothing when disabled', () => {
    const el = new PaoTooltip();
    el.disabled = true;

    el.show();

    expect(el.open).toBe(false);
    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('hide() does nothing when disabled', () => {
    const el = new PaoTooltip();
    el.open = true;
    el.disabled = true;

    el.hide();

    expect(el.open).toBe(true);
    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('show() respects delay setting', () => {
    const el = new PaoTooltip();
    el.delay = 500;

    el.show();
    expect(el.open).toBe(false);

    jest.advanceTimersByTime(500);
    expect(el.open).toBe(true);

    jest.advanceTimersByTime(500);
    expect(el.open).toBe(true);
  });

  it('show() with zero delay sets open immediately', () => {
    const el = new PaoTooltip();
    el.delay = 0;

    el.show();
    expect(el.open).toBe(true);
  });

  it('hide() clears pending show timer', () => {
    const el = new PaoTooltip();
    el.delay = 500;

    el.show();
    jest.advanceTimersByTime(200);
    el.hide();

    jest.advanceTimersByTime(300);
    expect(el.open).toBe(false);
  });

  it('handleMouseEnter calls show', () => {
    const el = new PaoTooltip();
    const showSpy = jest.spyOn(el, 'show');

    (el as any).handleMouseEnter();

    expect(showSpy).toHaveBeenCalled();
  });

  it('handleMouseLeave calls hide', () => {
    const el = new PaoTooltip();
    const hideSpy = jest.spyOn(el, 'hide');

    (el as any).handleMouseLeave();

    expect(hideSpy).toHaveBeenCalled();
  });

  it('handleFocus calls show', () => {
    const el = new PaoTooltip();
    const showSpy = jest.spyOn(el, 'show');

    (el as any).handleFocus();

    expect(showSpy).toHaveBeenCalled();
  });

  it('handleBlur calls hide', () => {
    const el = new PaoTooltip();
    const hideSpy = jest.spyOn(el, 'hide');

    (el as any).handleBlur();

    expect(hideSpy).toHaveBeenCalled();
  });

  it('render returns defined result when open is true', () => {
    const el = new PaoTooltip();
    el.open = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result when open is false', () => {
    const el = new PaoTooltip();
    el.open = false;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with content', () => {
    const el = new PaoTooltip();
    el.open = true;
    el.content = 'Helpful info';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with different positions', () => {
    const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];
    for (const position of positions) {
      const el = new PaoTooltip();
      el.open = true;
      el.position = position;
      expect(el.render()).toBeDefined();
    }
  });

  it('disconnectedCallback clears any pending timer', () => {
    const el = new PaoTooltip();
    el.delay = 500;

    el.show();
    const hideSpy = jest.spyOn(el, 'hide');

    el.disconnectedCallback();
    jest.advanceTimersByTime(500);

    expect(el.open).toBe(false);
    expect(hideSpy).not.toHaveBeenCalled();
  });
});
