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

jest.mock('../src/components/pao-spinner/pao-spinner.styles', () => ({
  styles: [],
}));

import { PaoSpinner } from '../src/components/pao-spinner/pao-spinner';

describe('PaoSpinner', () => {
  let element: PaoSpinner;

  beforeEach(() => {
    element = new PaoSpinner();
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.size).toBe('md');
    expect(element.variant).toBe('primary');
    expect(element.label).toBe('Loading...');
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('accepts all variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'light'] as const;
    for (const v of variants) {
      element.variant = v;
      expect(element.variant).toBe(v);
    }
  });

  it('accepts custom label', () => {
    element.label = 'Please wait';
    expect(element.label).toBe('Please wait');
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoSpinner.styles).toBeDefined();
  });
});
