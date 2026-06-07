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

jest.mock('../src/components/pao-accordion-item/pao-accordion-item.styles', () => ({
  styles: [],
}));

import { PaoAccordionItem } from '../src/components/pao-accordion-item/pao-accordion-item';

describe('PaoAccordionItem', () => {
  it('has correct default properties', () => {
    const el = new PaoAccordionItem();
    expect(el.label).toBe('');
    expect(el.open).toBe(false);
    expect(el.disabled).toBe(false);
  });

  it('handleToggle opens when closed', () => {
    const el = new PaoAccordionItem();
    (el as any).handleToggle();
    expect(el.open).toBe(true);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoToggle', detail: { open: true } })
    );
  });

  it('handleToggle closes when open', () => {
    const el = new PaoAccordionItem();
    el.open = true;
    (el as any).handleToggle();
    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoToggle', detail: { open: false } })
    );
  });

  it('handleToggle does nothing when disabled', () => {
    const el = new PaoAccordionItem();
    el.disabled = true;
    (el as any).handleToggle();
    expect(el.open).toBe(false);
    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('renders when closed', () => {
    const el = new PaoAccordionItem();
    expect(el.render()).toBeDefined();
  });

  it('renders when open', () => {
    const el = new PaoAccordionItem();
    el.open = true;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoAccordionItem.styles).toBeDefined();
  });
});
