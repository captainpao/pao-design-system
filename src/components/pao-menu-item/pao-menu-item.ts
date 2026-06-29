import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-menu-item.styles';

@customElement('pao-menu-item')
export class PaoMenuItem extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoSelect', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  render() {
    return html`
      <button
        class="pao-menu-item"
        part="item"
        role="menuitem"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot>${this.label}</slot>
      </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-menu-item': PaoMenuItem;
  }
}
