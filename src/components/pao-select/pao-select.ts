import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-select.styles';

export type SelectSize = 'sm' | 'md' | 'lg';

@customElement('pao-select')
export class PaoSelect extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: Array }) values: string[] = [];
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) size: SelectSize = 'md';
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';

  @state() private open = false;
  @state() private _focusedIndex = -1;

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node) && !this.shadowRoot?.contains(e.target as Node)) {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    }
  };

  private handleTriggerClick() {
    if (this.disabled) return;
    if (this.open) {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    } else {
      this.open = true;
      this._focusedIndex = -1;
      document.addEventListener('mousedown', this._handleOutsideClick);
    }
  }

  private _syncOptions() {
    const options = this.querySelectorAll('pao-select-option');
    options.forEach(opt => {
      const v = (opt as any).value;
      (opt as any).selected = this.multiple ? this.values.includes(v) : v === this.value;
    });
  }

  private _selectValue(value: string) {
    if (this.multiple) {
      const newValues = [...this.values];
      const idx = newValues.indexOf(value);
      if (idx === -1) newValues.push(value);
      else newValues.splice(idx, 1);
      this.values = newValues;
    } else {
      this.value = value;
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    }
    this._syncOptions();
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, values: this.values },
    }));
  }

  private handleOptionSelect(e: CustomEvent) {
    this._selectValue(e.detail.value);
  }

  private handleKeydown(e: KeyboardEvent) {
    const options = Array.from(this.querySelectorAll('pao-select-option:not([disabled])'));
    if (e.key === 'Escape') {
      this.open = false;
      document.removeEventListener('mousedown', this._handleOutsideClick);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, options.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
    } else if ((e.key === 'Enter' || e.key === ' ') && this._focusedIndex >= 0) {
      e.preventDefault();
      const option = options[this._focusedIndex] as any;
      if (option) this._selectValue(option.value);
    }
  }

  private getDisplayText(): string {
    if (this.multiple) {
      if (this.values.length === 0) return '';
      if (this.values.length === 1) {
        const opt = Array.from(this.querySelectorAll('pao-select-option'))
          .find(o => (o as any).value === this.values[0]);
        return opt?.textContent?.trim() || this.values[0];
      }
      return `${this.values.length} selected`;
    }
    if (!this.value) return '';
    const opt = Array.from(this.querySelectorAll('pao-select-option'))
      .find(o => (o as any).value === this.value);
    return opt?.textContent?.trim() || this.value;
  }

  render() {
    const triggerClasses = [
      'pao-select-trigger',
      this.size,
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
    const displayText = this.getDisplayText();

    return html`
      <div class="pao-select-wrapper" part="wrapper" @keydown=${this.handleKeydown}>
        ${this.label
          ? html`
          <label class="pao-select-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" aria-hidden="true">*</span>` : ''}
          </label>
        `
          : ''}
        <div
          class=${triggerClasses}
          part="trigger"
          role="combobox"
          aria-expanded=${this.open}
          aria-haspopup="listbox"
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleTriggerClick}
        >
          <span class="pao-select-display ${displayText ? '' : 'placeholder'}" part="display">
            ${displayText || this.placeholder}
          </span>
          <span class="pao-select-chevron ${this.open ? 'open' : ''}" part="chevron" aria-hidden="true">▾</span>
        </div>
        ${this.open
          ? html`
          <div class="pao-select-panel" part="panel" role="listbox" aria-multiselectable=${this.multiple}>
            <slot @paoSelectOption=${this.handleOptionSelect}></slot>
          </div>
        `
          : ''}
        ${this.error ? html`<span class="pao-select-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error
          ? html`<span class="pao-select-helper" part="helper">${this.helperText}</span>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-select': PaoSelect;
  }
}
