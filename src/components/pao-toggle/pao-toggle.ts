import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-toggle.styles';

export type ToggleSize = 'sm' | 'md' | 'lg';

@customElement('pao-toggle')
export class PaoToggle extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) size: ToggleSize = 'md';
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
    const wrapperClasses = ['pao-toggle-wrapper', this.size, this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <label class=${wrapperClasses} part="wrapper">
        <input
          type="checkbox"
          class="pao-toggle-input"
          .checked=${this.checked}
          name=${this.name}
          value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange}
        />
        <span class="pao-toggle-track" part="track">
          <span class="pao-toggle-thumb" part="thumb"></span>
        </span>
        ${this.label ? html`<span class="pao-toggle-label" part="label">${this.label}</span>` : ''}
      </label>
      ${this.error ? html`<span class="pao-toggle-error" part="error" role="alert">${this.error}</span>` : ''}
      ${this.helperText && !this.error ? html`<span class="pao-toggle-helper" part="helper">${this.helperText}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-toggle': PaoToggle;
  }
}
