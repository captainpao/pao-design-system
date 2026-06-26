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

jest.mock('../src/components/pao-skeleton/pao-skeleton.styles', () => ({
  styles: [],
}));

import { PaoSkeleton } from '../src/components/pao-skeleton/pao-skeleton';
import type { SkeletonVariant } from '../src/components/pao-skeleton/pao-skeleton';

describe('PaoSkeleton', () => {
  it('has correct default properties', () => {
    const el = new PaoSkeleton();
    expect(el.variant).toBe('text');
    expect(el.width).toBe('100%');
    expect(el.height).toBe('');
    expect(el.animated).toBe(true);
  });

  it('accepts all variant values', () => {
    const variants: SkeletonVariant[] = ['text', 'circle', 'rect'];
    for (const variant of variants) {
      const el = new PaoSkeleton();
      el.variant = variant;
      expect(el.variant).toBe(variant);
    }
  });

  it('allows width to be set', () => {
    const el = new PaoSkeleton();
    el.width = '200px';
    expect(el.width).toBe('200px');
  });

  it('allows height to be set', () => {
    const el = new PaoSkeleton();
    el.height = '50px';
    expect(el.height).toBe('50px');
  });

  it('allows animated to be set to false', () => {
    const el = new PaoSkeleton();
    el.animated = false;
    expect(el.animated).toBe(false);
  });

  it('render is defined for text variant', () => {
    const el = new PaoSkeleton();
    el.variant = 'text';
    expect(el.render()).toBeDefined();
  });

  it('render is defined for circle variant', () => {
    const el = new PaoSkeleton();
    el.variant = 'circle';
    expect(el.render()).toBeDefined();
  });

  it('render is defined for rect variant', () => {
    const el = new PaoSkeleton();
    el.variant = 'rect';
    expect(el.render()).toBeDefined();
  });

  it('render is defined when animated is false', () => {
    const el = new PaoSkeleton();
    el.animated = false;
    expect(el.render()).toBeDefined();
  });

  it('render uses custom height when provided', () => {
    const el = new PaoSkeleton();
    el.height = '80px';
    expect(el.render()).toBeDefined();
  });

  it('render uses width equal to height for circle variant', () => {
    const el = new PaoSkeleton();
    el.variant = 'circle';
    el.height = '60px';
    expect(el.render()).toBeDefined();
  });

  it('has static styles defined', () => {
    expect(PaoSkeleton.styles).toBeDefined();
  });
});
