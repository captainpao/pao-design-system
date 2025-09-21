// Mock Lit dependencies for Jest testing
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
  },
  html: jest.fn(),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-button/pao-button.styles', () => ({
  styles: [],
}));

import { PaoButton } from '../src/components/pao-button/pao-button';

// Simple test to verify the component can be imported and instantiated
describe('PaoButton Node Test', () => {
  it('should be defined', () => {
    expect(PaoButton).toBeInstanceOf(Function);
  });

  it('should have default properties', () => {
    const button = new PaoButton();
    expect(button.variant).toBe('primary');
    expect(button.size).toBe('md');
    expect(button.disabled).toBe(false);
    expect(button.loading).toBe(false);
    expect(button.appearance).toBe('solid');
  });

  it('should update properties correctly', async () => {
    const button = new PaoButton();
    button.variant = 'success';
    button.size = 'lg';
    button.disabled = true;
    button.loading = true;
    button.appearance = 'outline';

    expect(button.variant).toBe('success');
    expect(button.size).toBe('lg');
    expect(button.disabled).toBe(true);
    expect(button.loading).toBe(true);
    expect(button.appearance).toBe('outline');
  });
});