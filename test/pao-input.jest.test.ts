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
  state: jest.fn(),
}));

jest.mock('../src/components/pao-input/pao-input.styles', () => ({
  styles: [],
}));

import { PaoInput } from '../src/components/pao-input/pao-input';

describe('PaoInput', () => {
  let element: PaoInput;

  beforeEach(() => {
    element = new PaoInput();
    element.shadowRoot = { querySelector: jest.fn() } as any;
    const listeners: { [k: string]: Function[] } = {};
    element.addEventListener = jest.fn((e: string, h: Function) => {
      (listeners[e] ??= []).push(h);
    });
    element.dispatchEvent = jest.fn((e: CustomEvent) => {
      (listeners[e.type] ?? []).forEach(h => h(e));
      return true;
    });
  });

  it('is defined', () => {
    expect(element).toBeDefined();
  });

  it('has correct default properties', () => {
    expect(element.type).toBe('text');
    expect(element.value).toBe('');
    expect(element.placeholder).toBe('');
    expect(element.label).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.required).toBe(false);
    expect(element.error).toBe('');
    expect(element.helperText).toBe('');
    expect(element.size).toBe('md');
    expect(element.name).toBe('');
  });

  it('accepts all input types', () => {
    element.type = 'password';
    expect(element.type).toBe('password');
    element.type = 'email';
    expect(element.type).toBe('email');
    element.type = 'number';
    expect(element.type).toBe('number');
    element.type = 'search';
    expect(element.type).toBe('search');
  });

  it('accepts all sizes', () => {
    element.size = 'sm';
    expect(element.size).toBe('sm');
    element.size = 'lg';
    expect(element.size).toBe('lg');
  });

  it('renders', () => {
    expect(element.render()).toBeDefined();
  });

  it('renders with error state', () => {
    element.error = 'This field is required';
    expect(element.render()).toBeDefined();
  });

  it('renders with helper text', () => {
    element.helperText = 'Enter your full name';
    expect(element.render()).toBeDefined();
  });

  it('renders disabled', () => {
    element.disabled = true;
    expect(element.render()).toBeDefined();
  });

  it('renders readonly', () => {
    element.readonly = true;
    expect(element.render()).toBeDefined();
  });

  it('emits paoInput on handleInput', () => {
    const handler = jest.fn();
    element.addEventListener('paoInput', handler);
    const fakeEvent = { target: { value: 'hello' } } as unknown as InputEvent;
    (element as any).handleInput(fakeEvent);
    expect(handler).toHaveBeenCalled();
    expect(element.value).toBe('hello');
  });

  it('emits paoChange on handleChange', () => {
    const handler = jest.fn();
    element.addEventListener('paoChange', handler);
    const fakeEvent = { target: { value: 'world' } } as unknown as Event;
    (element as any).handleChange(fakeEvent);
    expect(handler).toHaveBeenCalled();
  });

  it('does not emit events when disabled', () => {
    element.disabled = true;
    const handler = jest.fn();
    element.addEventListener('paoInput', handler);
    const fakeEvent = { target: { value: 'hi' } } as unknown as InputEvent;
    (element as any).handleInput(fakeEvent);
    expect(handler).not.toHaveBeenCalled();
  });

  it('has static styles', () => {
    expect(PaoInput.styles).toBeDefined();
  });
});
