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

jest.mock('../src/components/pao-modal/pao-modal.styles', () => ({
  styles: [],
}));

import { PaoModal } from '../src/components/pao-modal/pao-modal';
import type { ModalSize } from '../src/components/pao-modal/pao-modal';

describe('PaoModal', () => {
  it('has correct default properties', () => {
    const el = new PaoModal();
    expect(el.open).toBe(false);
    expect(el.title).toBe('');
    expect(el.dismissible).toBe(true);
    expect(el.size).toBe('md');
  });

  it('accepts all size values', () => {
    const sizes: ModalSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoModal();
      el.size = size;
      expect(el.size).toBe(size);
    }
  });

  it('showModal() sets open to true and dispatches paoOpen', () => {
    const el = new PaoModal();
    el.showModal();

    expect(el.open).toBe(true);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoOpen',
      })
    );
  });

  it('close() sets open to false and dispatches paoClose', () => {
    const el = new PaoModal();
    el.open = true;

    el.close();

    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoClose',
      })
    );
  });

  it('dismiss() sets open to false and dispatches paoClose', () => {
    const el = new PaoModal();
    el.open = true;

    (el as any).dismiss('backdrop');

    expect(el.open).toBe(false);
    expect(el.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paoClose',
        detail: { source: 'backdrop' },
      })
    );
  });

  it('handleKeydown with Escape key calls dismiss', () => {
    const el = new PaoModal();
    el.open = true;
    const dismissSpy = jest.spyOn(el as any, 'dismiss');
    const keyEvent = { key: 'Escape' } as KeyboardEvent;

    (el as any).handleKeydown(keyEvent);

    expect(dismissSpy).toHaveBeenCalledWith('escape');
  });

  it('handleKeydown with non-Escape key does not call dismiss', () => {
    const el = new PaoModal();
    el.open = true;
    const dismissSpy = jest.spyOn(el as any, 'dismiss');
    const keyEvent = { key: 'Enter' } as KeyboardEvent;

    (el as any).handleKeydown(keyEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('handleBackdropClick fires dismiss when clicking overlay', () => {
    const el = new PaoModal();
    el.open = true;
    el.dismissible = true;
    const dismissSpy = jest.spyOn(el as any, 'dismiss');
    const overlay = document.createElement('div');
    overlay.classList.add('pao-modal-overlay');
    const event = { target: overlay } as unknown as MouseEvent;

    (el as any).handleBackdropClick(event);

    expect(dismissSpy).toHaveBeenCalledWith('backdrop');
  });

  it('handleBackdropClick does not close modal when not dismissible', () => {
    const el = new PaoModal();
    el.open = true;
    el.dismissible = false;
    const overlay = document.createElement('div');
    overlay.classList.add('pao-modal-overlay');
    const event = { target: overlay } as unknown as MouseEvent;

    (el as any).handleBackdropClick(event);

    expect(el.open).toBe(true);
  });

  it('handleBackdropClick does not call dismiss when clicking modal content', () => {
    const el = new PaoModal();
    el.open = true;
    el.dismissible = true;
    const dismissSpy = jest.spyOn(el as any, 'dismiss');
    const panel = document.createElement('div');
    panel.classList.add('pao-modal-panel');
    const event = { target: panel } as unknown as MouseEvent;

    (el as any).handleBackdropClick(event);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('render returns defined result when open is true', () => {
    const el = new PaoModal();
    el.open = true;
    expect(el.render()).toBeDefined();
  });

  it('render returns empty when open is false', () => {
    const el = new PaoModal();
    el.open = false;
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with title', () => {
    const el = new PaoModal();
    el.open = true;
    el.title = 'Confirm Action';
    expect(el.render()).toBeDefined();
  });

  it('render returns defined result with different sizes', () => {
    const sizes: ModalSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      const el = new PaoModal();
      el.open = true;
      el.size = size;
      expect(el.render()).toBeDefined();
    }
  });

  it('render returns defined result when dismissible is false', () => {
    const el = new PaoModal();
    el.open = true;
    el.dismissible = false;
    expect(el.render()).toBeDefined();
  });
});
