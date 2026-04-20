import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-checkbox.styles';

export type CheckboxSize = 'sm' | 'md' | 'lg';

@customElement('pao-checkbox')
export class PaoCheckbox extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) size: CheckboxSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  updated(changed: Map<string, unknown>) {
    if (changed.has('indeterminate')) {
      const input = this.shadowRoot?.querySelector('input');
      if (input) input.indeterminate = this.indeterminate;
    }
  }

  private handleChange(e: Event) {
    if (this.disabled) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, checked: this.checked, indeterminate: false },
    }));
  }

  render() {
    const wrapperClasses = ['pao-checkbox-wrapper', this.size, this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <label class=${wrapperClasses} part="wrapper">
        <input
          type="checkbox"
          class="pao-checkbox-input"
          .checked=${this.checked}
          name=${this.name}
          value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange}
        />
        <span class="pao-checkbox-control" part="control"></span>
        ${this.label ? html`<span class="pao-checkbox-label" part="label">${this.label}</span>` : ''}
      </label>
      ${this.error ? html`<span class="pao-checkbox-error" part="error" role="alert">${this.error}</span>` : ''}
      ${this.helperText && !this.error ? html`<span class="pao-checkbox-helper" part="helper">${this.helperText}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-checkbox': PaoCheckbox;
  }
}
