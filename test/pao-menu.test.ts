jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
    shadowRoot = { querySelector: jest.fn(), querySelectorAll: jest.fn(() => []) };
    updateComplete = Promise.resolve();
    dispatchEvent = jest.fn();
    querySelectorAll = jest.fn(() => []);
    connectedCallback() {}
    disconnectedCallback() {}
  },
  html: jest.fn(() => 'mocked-template'),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('../src/components/pao-menu/pao-menu.styles', () => ({
  styles: [],
}));

import { PaoMenu } from '../src/components/pao-menu/pao-menu';
import type { MenuPlacement } from '../src/components/pao-menu/pao-menu';

describe('PaoMenu', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  describe('default properties', () => {
    it('has open=false by default', () => {
      const el = new PaoMenu();
      expect(el.open).toBe(false);
    });

    it('has placement=bottom-start by default', () => {
      const el = new PaoMenu();
      expect(el.placement).toBe('bottom-start');
    });
  });

  describe('accepted values', () => {
    it('accepts all placement values', () => {
      const placements: MenuPlacement[] = ['bottom-start', 'bottom-end'];
      for (const placement of placements) {
        const el = new PaoMenu();
        el.placement = placement;
        expect(el.placement).toBe(placement);
      }
    });

    it('accepts open=true', () => {
      const el = new PaoMenu();
      el.open = true;
      expect(el.open).toBe(true);
    });
  });

  describe('toggle', () => {
    it('opens the menu and dispatches paoOpenChange with open=true', () => {
      const el = new PaoMenu();
      (el as any).toggle();
      expect(el.open).toBe(true);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoOpenChange', detail: { open: true } })
      );
    });

    it('closes the menu when already open and dispatches paoOpenChange with open=false', () => {
      const el = new PaoMenu();
      el.open = true;
      (el as any).toggle();
      expect(el.open).toBe(false);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoOpenChange', detail: { open: false } })
      );
    });

    it('setOpen is a no-op when value is already the same', () => {
      const el = new PaoMenu();
      (el as any).setOpen(false);
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });

    it('setOpen(true) when already true does nothing', () => {
      const el = new PaoMenu();
      el.open = true;
      (el as any).setOpen(true);
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });
  });

  describe('handleSelect', () => {
    it('re-emits paoSelect with value from child and closes the menu', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = new CustomEvent('paoSelect', {
        detail: { value: 'edit' },
        bubbles: true,
        composed: true,
      });
      (el as any).handleSelect(fakeEvent);
      expect(el.open).toBe(false);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoSelect', detail: { value: 'edit' } })
      );
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoOpenChange', detail: { open: false } })
      );
    });

    it('handles paoSelect with no detail gracefully', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = new CustomEvent('paoSelect');
      (el as any).handleSelect(fakeEvent);
      expect(el.open).toBe(false);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoSelect', detail: { value: undefined } })
      );
    });
  });

  describe('handleOutsideClick', () => {
    it('closes the menu when the click target is outside', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = { composedPath: () => [] } as unknown as MouseEvent;
      (el as any).handleOutsideClick(fakeEvent);
      expect(el.open).toBe(false);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoOpenChange', detail: { open: false } })
      );
    });

    it('does not close when the click target is inside the component', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = { composedPath: () => [el] } as unknown as MouseEvent;
      (el as any).handleOutsideClick(fakeEvent);
      expect(el.open).toBe(true);
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });

    it('does nothing when the menu is already closed', () => {
      const el = new PaoMenu();
      const fakeEvent = { composedPath: () => [] } as unknown as MouseEvent;
      (el as any).handleOutsideClick(fakeEvent);
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });
  });

  describe('handleKeydown', () => {
    it('Escape closes the menu', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = { key: 'Escape', preventDefault: jest.fn() } as unknown as KeyboardEvent;
      (el as any).handleKeydown(fakeEvent);
      expect(el.open).toBe(false);
      expect(el.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'paoOpenChange', detail: { open: false } })
      );
    });

    it('ignores non-navigation keys without closing', () => {
      const el = new PaoMenu();
      el.open = true;
      const fakeEvent = { key: 'Tab', preventDefault: jest.fn() } as unknown as KeyboardEvent;
      (el as any).handleKeydown(fakeEvent);
      expect(el.open).toBe(true);
      expect(el.dispatchEvent).not.toHaveBeenCalled();
    });

    it('ArrowDown calls preventDefault and focuses first non-disabled item', () => {
      const el = new PaoMenu();
      el.open = true;
      const mockFocus = jest.fn();
      const mockButton = { focus: mockFocus };
      const mockItem = {
        disabled: false,
        shadowRoot: { activeElement: null, querySelector: () => mockButton },
      };
      el.querySelectorAll = jest.fn(() => [mockItem] as any);
      const fakeEvent = { key: 'ArrowDown', preventDefault: jest.fn() } as unknown as KeyboardEvent;
      (el as any).handleKeydown(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(mockFocus).toHaveBeenCalled();
    });

    it('ArrowUp calls preventDefault and does nothing with empty items', () => {
      const el = new PaoMenu();
      el.open = true;
      el.querySelectorAll = jest.fn(() => [] as any);
      const fakeEvent = { key: 'ArrowUp', preventDefault: jest.fn() } as unknown as KeyboardEvent;
      (el as any).handleKeydown(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
    });

    it('ArrowDown skips disabled items', () => {
      const el = new PaoMenu();
      el.open = true;
      const mockFocus = jest.fn();
      const mockButton = { focus: mockFocus };
      const disabledItem = {
        disabled: true,
        shadowRoot: { activeElement: null, querySelector: () => mockButton },
      };
      const enabledItem = {
        disabled: false,
        shadowRoot: { activeElement: null, querySelector: () => mockButton },
      };
      el.querySelectorAll = jest.fn(() => [disabledItem, enabledItem] as any);
      const fakeEvent = { key: 'ArrowDown', preventDefault: jest.fn() } as unknown as KeyboardEvent;
      (el as any).handleKeydown(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe('connectedCallback / disconnectedCallback', () => {
    it('connectedCallback registers outside-click listener on document', () => {
      const el = new PaoMenu();
      el.connectedCallback();
      expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('disconnectedCallback removes outside-click listener from document', () => {
      const el = new PaoMenu();
      el.disconnectedCallback();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });

  describe('render', () => {
    it('renders when open=false', () => {
      const el = new PaoMenu();
      expect(el.render()).toBeDefined();
    });

    it('renders when open=true', () => {
      const el = new PaoMenu();
      el.open = true;
      expect(el.render()).toBeDefined();
    });

    it('renders with bottom-end placement', () => {
      const el = new PaoMenu();
      el.placement = 'bottom-end';
      expect(el.render()).toBeDefined();
    });
  });

  describe('static styles', () => {
    it('has static styles defined', () => {
      expect(PaoMenu.styles).toBeDefined();
    });
  });
});
