import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-input.styles';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

@customElement('pao-input')
export class PaoInput extends LitElement {
  static styles = styles;

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  @property({ type: String }) size: InputSize = 'md';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) required = false;

  private handleInput(e: InputEvent) {
    if (this.disabled) return;
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('paoInput', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, originalEvent: e },
    }));
  }

  private handleChange(e: Event) {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: (e.target as HTMLInputElement).value, originalEvent: e },
    }));
  }

  render() {
    const inputClasses = ['pao-input', this.size, this.error ? 'error' : ''].filter(Boolean).join(' ');
    const helperId = this.helperText ? 'helper' : undefined;
    const errorId = this.error ? 'error' : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return html`
      <div class="pao-input-wrapper" part="wrapper">
        ${this.label ? html`
          <label class="pao-input-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" aria-hidden="true">*</span>` : ''}
          </label>
        ` : ''}
        <input
          part="input"
          class=${inputClasses}
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${this.name}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-describedby=${describedBy ?? ''}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${this.error ? html`
          <span id="error" class="pao-input-error" part="error" role="alert">${this.error}</span>
        ` : ''}
        ${this.helperText && !this.error ? html`
          <span id="helper" class="pao-input-helper" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-input': PaoInput;
  }
}
