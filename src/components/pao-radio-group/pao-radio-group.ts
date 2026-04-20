import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-radio-group.styles';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

@customElement('pao-radio-group')
export class PaoRadioGroup extends LitElement {
  static styles = styles;

  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) orientation: RadioGroupOrientation = 'vertical';

  private handleSlotChange() {
    const children = this.querySelectorAll('pao-radio');
    children.forEach(child => {
      (child as any).name = this.name;
      (child as any).disabled = this.disabled;
    });
  }

  private handleChildChange(e: CustomEvent) {
    const selectedValue = e.detail.value;
    const children = Array.from(this.querySelectorAll('pao-radio'));
    children.forEach(child => {
      (child as any).checked = (child as any).value === selectedValue;
    });
    this.value = selectedValue;
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value: selectedValue },
    }));
  }

  render() {
    return html`
      <fieldset class="pao-radio-group" part="fieldset">
        ${this.label ? html`<legend class="pao-radio-group-legend" part="legend">${this.label}</legend>` : ''}
        <div class="pao-radio-group-items ${this.orientation}" part="items" @paoChange=${this.handleChildChange}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.error ? html`<span class="pao-radio-group-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error ? html`<span class="pao-radio-group-helper" part="helper">${this.helperText}</span>` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-radio-group': PaoRadioGroup;
  }
}
