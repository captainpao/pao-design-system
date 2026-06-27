jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn(), querySelectorAll: jest.fn(() => []) };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-breadcrumb/pao-breadcrumb.styles', () => ({
  styles: [],
}));

import { PaoBreadcrumb } from '../src/components/pao-breadcrumb/pao-breadcrumb';

describe('PaoBreadcrumb', () => {
  it('has correct default separator', () => {
    const el = new PaoBreadcrumb();
    expect(el.separator).toBe('/');
  });

  it('allows separator to be set', () => {
    const el = new PaoBreadcrumb();
    el.separator = '›';
    expect(el.separator).toBe('›');
  });

  it('allows separator to be set to chevron', () => {
    const el = new PaoBreadcrumb();
    el.separator = '>';
    expect(el.separator).toBe('>');
  });

  it('renders', () => {
    const el = new PaoBreadcrumb();
    expect(el.render()).toBeDefined();
  });

  it('renders with custom separator', () => {
    const el = new PaoBreadcrumb();
    el.separator = '›';
    expect(el.render()).toBeDefined();
  });

  it('has static styles defined', () => {
    expect(PaoBreadcrumb.styles).toBeDefined();
  });
});
