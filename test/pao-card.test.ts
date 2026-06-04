jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('../src/components/pao-card/pao-card.styles', () => ({
  styles: [],
}));

import { PaoCard } from '../src/components/pao-card/pao-card';

describe('PaoCard', () => {
  it('has correct default properties', () => {
    const el = new PaoCard();
    expect(el.shadow).toBe(false);
    expect(el.padded).toBe(true);
    expect((el as any)._hasHeader).toBe(false);
    expect((el as any)._hasFooter).toBe(false);
  });

  it('sets shadow prop', () => {
    const el = new PaoCard();
    el.shadow = true;
    expect(el.shadow).toBe(true);
  });

  it('sets padded prop', () => {
    const el = new PaoCard();
    el.padded = false;
    expect(el.padded).toBe(false);
  });

  it('handleHeaderSlotChange sets _hasHeader true when slot has nodes', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => [document.createTextNode('x')]) };
    (el as any).handleHeaderSlotChange({ target: mockSlot });
    expect((el as any)._hasHeader).toBe(true);
  });

  it('handleHeaderSlotChange sets _hasHeader false when slot is empty', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => []) };
    (el as any).handleHeaderSlotChange({ target: mockSlot });
    expect((el as any)._hasHeader).toBe(false);
  });

  it('handleFooterSlotChange sets _hasFooter true when slot has nodes', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => [document.createTextNode('x')]) };
    (el as any).handleFooterSlotChange({ target: mockSlot });
    expect((el as any)._hasFooter).toBe(true);
  });

  it('handleFooterSlotChange sets _hasFooter false when slot is empty', () => {
    const el = new PaoCard();
    const mockSlot = { assignedNodes: jest.fn(() => []) };
    (el as any).handleFooterSlotChange({ target: mockSlot });
    expect((el as any)._hasFooter).toBe(false);
  });

  it('renders', () => {
    const el = new PaoCard();
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoCard.styles).toBeDefined();
  });
});
