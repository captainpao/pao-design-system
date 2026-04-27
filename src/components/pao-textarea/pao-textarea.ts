import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-textarea.styles';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

@customElement('pao-textarea')
export class PaoTextarea extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  @property({ type: String }) size: TextareaSize = 'md';
  @property({ type: String }) resize: TextareaResize = 'vertical';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) maxlength = 0;

  private handleInput(e: InputEvent) {
    if (this.disabled) return;
    this.value = (e.target as HTMLTextAreaElement).value;
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
      detail: { value: (e.target as HTMLTextAreaElement).value, originalEvent: e },
    }));
  }

  render() {
    const textareaClasses = ['pao-textarea', this.size, this.error ? 'error' : ''].filter(Boolean).join(' ');
    const helperId = this.helperText ? 'helper' : undefined;
    const errorId = this.error ? 'error' : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return html`
      <div class="pao-textarea-wrapper" part="wrapper">
        ${this.label ? html`
          <label class="pao-textarea-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" aria-hidden="true">*</span>` : ''}
          </label>
        ` : ''}
        <textarea
          part="textarea"
          class=${textareaClasses}
          style="resize: ${this.resize}"
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${this.name}
          rows=${this.rows}
          maxlength=${this.maxlength > 0 ? this.maxlength : ''}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-describedby=${describedBy ?? ''}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
        ${this.maxlength > 0 ? html`
          <span class="pao-textarea-counter" part="counter">${this.value.length} / ${this.maxlength}</span>
        ` : ''}
        ${this.error ? html`
          <span id="error" class="pao-textarea-error" part="error" role="alert">${this.error}</span>
        ` : ''}
        ${this.helperText && !this.error ? html`
          <span id="helper" class="pao-textarea-helper" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-textarea': PaoTextarea;
  }
}
