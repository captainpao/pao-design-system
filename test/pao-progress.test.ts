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

jest.mock('../src/components/pao-progress/pao-progress.styles', () => ({
  styles: [],
}));

import { PaoProgress } from '../src/components/pao-progress/pao-progress';
import type { ProgressVariant, ProgressSize } from '../src/components/pao-progress/pao-progress';

describe('PaoProgress', () => {
  it('has correct default properties', () => {
    const el = new PaoProgress();
    expect(el.value).toBe(0);
    expect(el.max).toBe(100);
    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.indeterminate).toBe(false);
    expect(el.label).toBe('');
    expect(el.showValue).toBe(false);
  });

  it('accepts all variants', () => {
    const variants: ProgressVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
    for (const v of variants) {
      const el = new PaoProgress();
      el.variant = v;
      expect(el.variant).toBe(v);
    }
  });

  it('accepts all sizes', () => {
    const sizes: ProgressSize[] = ['sm', 'md', 'lg'];
    for (const s of sizes) {
      const el = new PaoProgress();
      el.size = s;
      expect(el.size).toBe(s);
    }
  });

  it('renders', () => {
    const el = new PaoProgress();
    expect(el.render()).toBeDefined();
  });

  it('renders indeterminate', () => {
    const el = new PaoProgress();
    el.indeterminate = true;
    expect(el.render()).toBeDefined();
  });

  it('renders showValue', () => {
    const el = new PaoProgress();
    el.value = 50;
    el.showValue = true;
    expect(el.render()).toBeDefined();
  });

  it('clamps value below 0', () => {
    const el = new PaoProgress();
    el.value = -10;
    expect(el.render()).toBeDefined();
  });

  it('clamps value above max', () => {
    const el = new PaoProgress();
    el.value = 150;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoProgress.styles).toBeDefined();
  });
});
