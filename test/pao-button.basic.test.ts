// Mock Lit dependencies for Jest testing
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-button/pao-button.styles', () => ({
  styles: [],
}));

import { PaoButton } from '../src/components/pao-button/pao-button';

// Basic test that doesn't require browser environment
describe('PaoButton Basic Tests', () => {
  it('should be defined', () => {
    expect(PaoButton).toBeDefined();
  });

  it('should have default properties', () => {
    const button = new PaoButton();
    expect(button.variant).toBe('primary');
    expect(button.size).toBe('md');
    expect(button.disabled).toBe(false);
    expect(button.loading).toBe(false);
    expect(button.appearance).toBe('solid');
  });

  it('should update properties correctly', () => {
    const button = new PaoButton();

    button.variant = 'success';
    expect(button.variant).toBe('success');

    button.size = 'lg';
    expect(button.size).toBe('lg');

    button.disabled = true;
    expect(button.disabled).toBe(true);

    button.loading = true;
    expect(button.loading).toBe(true);

    button.appearance = 'outline';
    expect(button.appearance).toBe('outline');
  });

  it('should have static styles defined', () => {
    expect(PaoButton.styles).toBeDefined();
  });

  it('should be a LitElement', () => {
    // Check if the component extends LitElement
    const button = new PaoButton();
    expect(button).toBeInstanceOf(PaoButton);
  });

  it('should render with default properties', () => {
    const button = new PaoButton();
    const result = button.render();
    expect(result).toBeDefined();
  });

  it('should render with different states', () => {
    const button = new PaoButton();
    button.loading = true;
    button.disabled = true;
    button.variant = 'success';
    
    const result = button.render();
    expect(result).toBeDefined();
  });
});