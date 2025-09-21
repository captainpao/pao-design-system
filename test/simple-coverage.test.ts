// Mock Lit dependencies for basic coverage testing
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

// Now import the component
import { PaoButton } from '../src/components/pao-button/pao-button';

describe('PaoButton basic coverage', () => {
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

    button.variant = 'secondary';
    button.size = 'lg';
    button.disabled = true;
    button.loading = true;
    button.appearance = 'outline';

    expect(button.variant).toBe('secondary');
    expect(button.size).toBe('lg');
    expect(button.disabled).toBe(true);
    expect(button.loading).toBe(true);
    expect(button.appearance).toBe('outline');
  });

  it('should handle click events when not disabled', () => {
    const button = new PaoButton();
    const mockEvent = { preventDefault: jest.fn() };

    // Mock dispatchEvent
    const mockDispatch = jest.fn();
    button.dispatchEvent = mockDispatch;

    button.handleClick(mockEvent as unknown as MouseEvent);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should prevent click events when disabled', () => {
    const button = new PaoButton();
    button.disabled = true;

    const mockEvent = { preventDefault: jest.fn() };
    const mockDispatch = jest.fn();
    button.dispatchEvent = mockDispatch;

    button.handleClick(mockEvent as unknown as MouseEvent);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should NOT prevent click events when loading (current implementation)', () => {
    const button = new PaoButton();
    button.loading = true;

    const mockEvent = { preventDefault: jest.fn() };
    const mockDispatch = jest.fn();
    button.dispatchEvent = mockDispatch;

    button.handleClick(mockEvent as unknown as MouseEvent);

    // Current implementation only checks disabled, not loading
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });
});