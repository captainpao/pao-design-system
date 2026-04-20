import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-radio.styles';

export type RadioSize = 'sm' | 'md' | 'lg';

@customElement('pao-radio')
export class PaoRadio extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) size: RadioSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  private handleChange(e: Event) {
    if (this.disabled) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, checked: this.checked },
    }));
  }

  render() {
    const wrapperClasses = ['pao-radio-wrapper', this.size, this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <label class=${wrapperClasses} part="wrapper">
        <input
          type="radio"
          class="pao-radio-input"
          .checked=${this.checked}
          name=${this.name}
          value=${this.value}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="pao-radio-control" part="control"></span>
        ${this.label ? html`<span class="pao-radio-label" part="label">${this.label}</span>` : ''}
      </label>
      ${this.error ? html`<span class="pao-radio-error" part="error" role="alert">${this.error}</span>` : ''}
      ${this.helperText && !this.error ? html`<span class="pao-radio-helper" part="helper">${this.helperText}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-radio': PaoRadio;
  }
}
