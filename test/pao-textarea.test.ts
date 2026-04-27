jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn() };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
  },
  html: jest.fn(() => 'mocked-template'),
  css: jest.fn(() => ''),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-textarea/pao-textarea.styles', () => ({
  styles: [],
}));

import { PaoTextarea } from '../src/components/pao-textarea/pao-textarea';
import type { TextareaSize, TextareaResize } from '../src/components/pao-textarea/pao-textarea';

describe('PaoTextarea', () => {
  it('has correct default properties', () => {
    const el = new PaoTextarea();
    expect(el.value).toBe('');
    expect(el.placeholder).toBe('');
    expect(el.label).toBe('');
    expect(el.name).toBe('');
    expect(el.size).toBe('md');
    expect(el.resize).toBe('vertical');
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.required).toBe(false);
    expect(el.rows).toBe(3);
    expect(el.maxlength).toBe(0);
  });

  it('accepts all size values', () => {
    const sizes: TextareaSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoTextarea();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('accepts all resize values', () => {
    const resizes: TextareaResize[] = ['none', 'vertical', 'horizontal', 'both'];
    for (const resize of resizes) {
      const el = new PaoTextarea();
      el.resize = resize;
      expect(el.resize).toBe(resize);
    }
  });

  it('emits paoInput and updates value on handleInput', () => {
    const el = new PaoTextarea();
    const fakeTextarea = { value: 'hello world' } as HTMLTextAreaElement;
    const fakeEvent = { target: fakeTextarea } as unknown as InputEvent;

    (el as any).handleInput(fakeEvent);

    expect(el.value).toBe('hello world');
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoInput',
        detail: expect.objectContaining({ value: 'hello world' }),
      })
    );
  });

  it('does not emit paoInput when disabled', () => {
    const el = new PaoTextarea();
    el.disabled = true;
    const fakeTextarea = { value: 'hello' } as HTMLTextAreaElement;
    const fakeEvent = { target: fakeTextarea } as unknown as InputEvent;

    (el as any).handleInput(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('emits paoChange on handleChange', () => {
    const el = new PaoTextarea();
    const fakeTextarea = { value: 'committed text' } as HTMLTextAreaElement;
    const fakeEvent = { target: fakeTextarea } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoChange',
        detail: expect.objectContaining({ value: 'committed text' }),
      })
    );
  });

  it('does not emit paoChange when disabled', () => {
    const el = new PaoTextarea();
    el.disabled = true;
    const fakeTextarea = { value: 'text' } as HTMLTextAreaElement;
    const fakeEvent = { target: fakeTextarea } as unknown as Event;

    (el as any).handleChange(fakeEvent);

    expect(el.dispatchEvent).not.toHaveBeenCalled();
  });

  it('render returns defined result', () => {
    const el = new PaoTextarea();
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with label, required, error, helperText, maxlength', () => {
    const el = new PaoTextarea();
    el.label = 'Bio';
    el.required = true;
    el.error = 'Required field';
    el.helperText = 'Tell us about yourself';
    el.maxlength = 200;
    el.value = 'Some text';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with helperText (no error)', () => {
    const el = new PaoTextarea();
    el.helperText = 'Helper text visible';
    expect(el.render()).toBeDefined();
  });
});
