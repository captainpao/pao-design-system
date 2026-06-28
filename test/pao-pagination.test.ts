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

jest.mock('../src/components/pao-pagination/pao-pagination.styles', () => ({
  styles: [],
}));

import { PaoPagination } from '../src/components/pao-pagination/pao-pagination';

describe('PaoPagination', () => {
  it('has correct default properties', () => {
    const el = new PaoPagination();
    expect(el.total).toBe(0);
    expect(el.pageSize).toBe(10);
    expect(el.current).toBe(1);
    expect(el.siblingCount).toBe(1);
    expect(el.showEdges).toBe(false);
  });

  it('totalPages getter returns ceil(total/pageSize)', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    expect(el.totalPages).toBe(10);
  });

  it('totalPages rounds up', () => {
    const el = new PaoPagination();
    el.total = 101;
    el.pageSize = 10;
    expect(el.totalPages).toBe(11);
  });

  it('totalPages is at least 1 when total is 0', () => {
    const el = new PaoPagination();
    el.total = 0;
    el.pageSize = 10;
    expect(el.totalPages).toBe(1);
  });

  it('goTo sets current and dispatches paoPageChange', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    el.current = 1;
    (el as any).goTo(3);
    expect(el.current).toBe(3);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'paoPageChange' })
    );
  });

  it('goTo dispatches event with correct page detail', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    el.current = 1;
    (el as any).goTo(5);
    const event = (el.dispatchEvent as jest.Mock).mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ page: 5 });
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('goTo clamps to 1 when given page < 1', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    el.current = 2;
    (el as any).goTo(0);
    expect(el.current).toBe(1);
  });

  it('goTo clamps to totalPages when given page > totalPages', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    el.current = 1;
    (el as any).goTo(999);
    expect(el.current).toBe(10);
  });

  it('goTo on current page is a no-op (no event dispatched)', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.pageSize = 10;
    el.current = 3;
    (el as any).goTo(3);
    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render is defined', () => {
    const el = new PaoPagination();
    el.total = 50;
    expect(el.render()).toBeDefined();
  });

  it('render is defined with showEdges true', () => {
    const el = new PaoPagination();
    el.total = 100;
    el.showEdges = true;
    expect(el.render()).toBeDefined();
  });

  it('has static styles defined', () => {
    expect(PaoPagination.styles).toBeDefined();
  });
});
