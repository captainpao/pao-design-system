import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonAppearance = 'solid' | 'outline' | 'ghost';

@customElement('pao-button')
export class PaoButton extends LitElement {
  static styles = styles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'md';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean, reflect: true })
  pillShape = false;

  @property({ type: String })
  appearance: ButtonAppearance = 'solid';

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
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
    const buttonClasses = [
      'pao-button',
      this.variant,
      this.size,
      this.appearance,
      this.loading ? 'loading' : '',
      this.disabled ? 'disabled' : '',
      this.pillShape ? 'pill' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button
        part="button"
        class=${buttonClasses}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
        aria-busy=${this.loading}
      >
        ${this.loading ? html`
          <span class="pao-button__spinner" part="spinner"></span>
        ` : ''}
        <span class="pao-button__content" part="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-button': PaoButton;
  }
}
