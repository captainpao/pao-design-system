import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-menu.styles';

export type MenuPlacement = 'bottom-start' | 'bottom-end';

@customElement('pao-menu')
export class PaoMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placement: MenuPlacement = 'bottom-start';

  private handleOutsideClick = (e: MouseEvent) => {
    if (this.open && !e.composedPath().includes(this)) this.setOpen(false);
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private setOpen(open: boolean) {
    if (open === this.open) return;
    this.open = open;
    this.dispatchEvent(
      new CustomEvent('paoOpenChange', { bubbles: true, composed: true, detail: { open } })
    );
  }

  private toggle() {
    this.setOpen(!this.open);
  }

  private handleSelect(e: Event) {
    const value = (e as CustomEvent).detail?.value;
    this.dispatchEvent(
      new CustomEvent('paoSelect', { bubbles: true, composed: true, detail: { value } })
    );
    this.setOpen(false);
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.setOpen(false);
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = Array.from(this.querySelectorAll('pao-menu-item')).filter(
      (i) => !(i as any).disabled
    ) as HTMLElement[];
    if (!items.length) return;
    const idx = items.findIndex(
      (i) => i.shadowRoot?.activeElement || i === document.activeElement
    );
    const dir = e.key === 'ArrowDown' ? 1 : -1;
    const next = items[(Math.max(0, idx) + dir + items.length) % items.length];
    (next.shadowRoot?.querySelector('button') as HTMLElement)?.focus();
  }

  render() {
    return html`
      <div
        class="pao-menu"
        part="menu"
        @keydown=${this.handleKeydown}
        @paoSelect=${this.handleSelect}
      >
        <div
          class="pao-menu-trigger"
          @click=${this.toggle}
          aria-haspopup="menu"
          aria-expanded=${this.open}
        >
          <slot name="trigger"></slot>
        </div>
        <div
          class="pao-menu-popup ${this.placement}"
          part="popup"
          role="menu"
          ?hidden=${!this.open}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-menu': PaoMenu;
  }
}
