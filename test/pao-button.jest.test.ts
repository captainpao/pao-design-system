import { PaoButton } from '../src/components/pao-button/pao-button';
import { fixture, expect, html } from '@open-wc/testing';

// Mock the Lit element rendering for Jest
describe('PaoButton', () => {
  let element: PaoButton;

  beforeEach(async () => {
    element = await fixture(html`<pao-button>Test Button</pao-button>`);
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

  it('should render button with correct text', () => {
    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeDefined();
    expect(button?.textContent).toContain('Test Button');
  });

  it('should apply correct CSS classes', () => {
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('primary')).toBe(true);
    expect(button?.classList.contains('md')).toBe(true);
    expect(button?.classList.contains('solid')).toBe(true);
  });

  it('should handle disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.classList.contains('disabled')).toBe(true);
  });

  it('should handle loading state', async () => {
    element.loading = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    const spinner = element.shadowRoot?.querySelector('.pao-button__spinner');

    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(button?.classList.contains('loading')).toBe(true);
    expect(spinner).toBeDefined();
  });

  it('should update variant class', async () => {
    element.variant = 'success';
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('success')).toBe(true);
    expect(button?.classList.contains('primary')).toBe(false);
  });

  it('should update size class', async () => {
    element.size = 'lg';
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('lg')).toBe(true);
    expect(button?.classList.contains('md')).toBe(false);
  });

  it('should update appearance class', async () => {
    element.appearance = 'outline';
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('outline')).toBe(true);
    expect(button?.classList.contains('solid')).toBe(false);
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

    const mockEvent = {} as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).toHaveBeenCalled();
  });

  it('should not emit paoClick event when disabled', () => {
    element.disabled = true;
    const mockHandler = jest.fn();
    element.addEventListener('paoClick', mockHandler);

    const mockEvent = {} as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should not emit paoClick event when loading', () => {
    element.loading = true;
    const mockHandler = jest.fn();
    element.addEventListener('paoClick', mockHandler);

    const mockEvent = {} as MouseEvent;
    // @ts-ignore - accessing private method for testing
    element.handleClick(mockEvent);

    expect(mockHandler).not.toHaveBeenCalled();
  });
});