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

jest.mock('../src/components/pao-tab/pao-tab.styles', () => ({
  styles: [],
}));

import { PaoTab } from '../src/components/pao-tab/pao-tab';

describe('PaoTab', () => {
  it('has correct default properties', () => {
    const el = new PaoTab();
    expect(el.value).toBe('');
    expect(el.label).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.active).toBe(false);
  });

  it('sets value', () => {
    const el = new PaoTab();
    el.value = 'tab1';
    expect(el.value).toBe('tab1');
  });

  it('sets label', () => {
    const el = new PaoTab();
    el.label = 'Overview';
    expect(el.label).toBe('Overview');
  });

  it('sets active', () => {
    const el = new PaoTab();
    el.active = true;
    expect(el.active).toBe(true);
  });

  it('sets disabled', () => {
    const el = new PaoTab();
    el.disabled = true;
    expect(el.disabled).toBe(true);
  });

  it('renders when active', () => {
    const el = new PaoTab();
    el.active = true;
    expect(el.render()).toBeDefined();
  });

  it('renders when inactive', () => {
    const el = new PaoTab();
    el.active = false;
    expect(el.render()).toBeDefined();
  });

  it('has static styles', () => {
    expect(PaoTab.styles).toBeDefined();
  });
});
