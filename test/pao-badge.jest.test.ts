// Mock Lit dependencies for Jest testing
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
}));

jest.mock('../src/components/pao-badge/pao-badge.styles', () => ({
  styles: [],
}));

import { PaoBadge } from '../src/components/pao-badge/pao-badge';

describe('PaoBadge', () => {
  let element: PaoBadge;

  beforeEach(() => {
    element = new PaoBadge();
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.variant).toBe('primary');
    expect(element.size).toBe('md');
    expect(element.pill).toBe(false);
    expect(element.outline).toBe(false);
  });

  it('accepts all variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
    for (const v of variants) {
      element.variant = v;
      expect(element.variant).toBe(v);
    }
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('sets pill shape', () => {
    element.pill = true;
    expect(element.pill).toBe(true);
  });

  it('sets outline mode', () => {
    element.outline = true;
    expect(element.outline).toBe(true);
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('renders pill', () => {
    element.pill = true;
    expect(element.render()).toBeDefined();
  });

  it('renders outline', () => {
    element.outline = true;
    expect(element.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoBadge.styles).toBeDefined();
  });
});
