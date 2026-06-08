jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    querySelectorAll = jest.fn(() => []);
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-accordion/pao-accordion.styles', () => ({
  styles: [],
}));

import { PaoAccordion } from '../src/components/pao-accordion/pao-accordion';

describe('PaoAccordion', () => {
  it('has correct default properties', () => {
    const el = new PaoAccordion();
    expect(el.allowMultiple).toBe(false);
  });

  it('accepts allowMultiple=true', () => {
    const el = new PaoAccordion();
    el.allowMultiple = true;
    expect(el.allowMultiple).toBe(true);
  });

  it('handleChildToggle closes siblings when allowMultiple is false and an item opens', () => {
    const el = new PaoAccordion();
    const item1 = { open: true };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: true }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(false);
  });

  it('handleChildToggle does nothing when allowMultiple is true', () => {
    const el = new PaoAccordion();
    el.allowMultiple = true;
    const item1 = { open: true };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: true }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(true);
  });

  it('handleChildToggle does nothing when event detail.open is false (a close event)', () => {
    const el = new PaoAccordion();
    const item1 = { open: false };
    const item2 = { open: true };
    el.querySelectorAll = jest.fn(() => [item1, item2] as any);

    const fakeEvent = { detail: { open: false }, target: item1 } as unknown as CustomEvent;
    (el as any).handleChildToggle(fakeEvent);

    expect(item2.open).toBe(true);
  });

  it('renders', () => {
    const el = new PaoAccordion();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoAccordion.styles).toBeDefined();
  });
});
