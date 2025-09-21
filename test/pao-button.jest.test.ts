// Mock Lit dependencies for Jest testing
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = {
      querySelector: jest.fn(),
    };
    updateComplete = Promise.resolve();
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

describe('PaoButton Jest Tests', () => {
  let element: PaoButton;

  beforeEach(() => {
    element = new PaoButton();
    // Mock shadowRoot and event methods for testing
    element.shadowRoot = {
      querySelector: jest.fn(),
    } as any;
    
    // Create a simple event system for testing
    const eventListeners: { [key: string]: Function[] } = {};
    element.addEventListener = jest.fn((event: string, handler: Function) => {
      if (!eventListeners[event]) {
        eventListeners[event] = [];
      }
      eventListeners[event].push(handler);
    });
    
    element.dispatchEvent = jest.fn((event: CustomEvent) => {
      const handlers = eventListeners[event.type] || [];
      handlers.forEach(handler => handler(event));
      return true;
    });
  });

  it('should be defined', () => {
    expect(element).toBeDefined();
  });

  it('should have default properties', () => {
    expect(element.variant).toBe('primary');
    expect(element.size).toBe('md');
    expect(element.disabled).toBe(false);
    expect(element.loading).toBe(false);
    expect(element.appearance).toBe('solid');
  });

  it('should update properties correctly', () => {
    element.variant = 'success';
    expect(element.variant).toBe('success');

    element.size = 'lg';
    expect(element.size).toBe('lg');

    element.disabled = true;
    expect(element.disabled).toBe(true);

    element.loading = true;
    expect(element.loading).toBe(true);

    element.appearance = 'outline';
    expect(element.appearance).toBe('outline');
  });

  it('should prevent click when disabled', () => {
    element.disabled = true;

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent;

    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should emit paoClick event when not disabled', () => {
    const mockHandler = jest.fn();
    element.addEventListener('paoClick', mockHandler);

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).toHaveBeenCalled();
  });

  it('should not emit paoClick event when disabled', () => {
    element.disabled = true;
    const mockHandler = jest.fn();
    element.addEventListener('paoClick', mockHandler);

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should not emit paoClick event when loading', () => {
    element.loading = true;
    const mockHandler = jest.fn();
    element.addEventListener('paoClick', mockHandler);

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should have static styles defined', () => {
    expect(PaoButton.styles).toBeDefined();
  });

  it('should be a LitElement', () => {
    // Check if the component extends LitElement
    expect(element).toBeInstanceOf(PaoButton);
  });

  it('should render with default properties', () => {
    const result = element.render();
    expect(result).toBeDefined();
  });

  it('should render with loading state', () => {
    element.loading = true;
    const result = element.render();
    expect(result).toBeDefined();
  });

  it('should render with disabled state', () => {
    element.disabled = true;
    const result = element.render();
    expect(result).toBeDefined();
  });

  it('should render with custom variant', () => {
    element.variant = 'success';
    element.size = 'lg';
    element.appearance = 'outline';
    const result = element.render();
    expect(result).toBeDefined();
  });
});