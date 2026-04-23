import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-select-option.styles';

@customElement('pao-select-option')
export class PaoSelectOption extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoSelectOption', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  render() {
    const classes = ['pao-select-option', this.selected ? 'selected' : '', this.disabled ? 'disabled' : '']
      .filter(Boolean)
      .join(' ');
    return html`
      <div
        class=${classes}
        part="option"
        role="option"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.selected ? html`<span class="pao-select-option-check" part="check" aria-hidden="true">✓</span>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-select-option': PaoSelectOption;
  }
}
