import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('pao-button')
export class PaoButton extends LitElement {
  static styles = styles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'md';

  @property({ type: Boolean })
  disabled = false;

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    const event = new CustomEvent('paoClick', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button
        part="button"
        class="pao-button ${this.variant} ${this.size}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-button': PaoButton;
  }
}
