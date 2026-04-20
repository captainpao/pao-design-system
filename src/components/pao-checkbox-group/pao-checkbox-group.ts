import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-checkbox-group.styles';

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

@customElement('pao-checkbox-group')
export class PaoCheckboxGroup extends LitElement {
  static styles = styles;

  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) orientation: CheckboxGroupOrientation = 'vertical';

  private handleSlotChange() {
    const children = this.querySelectorAll('pao-checkbox');
    children.forEach(child => {
      if (this.name) (child as any).name = this.name;
      if (this.disabled) (child as any).disabled = true;
    });
  }

  private handleChildChange() {
    const children = Array.from(this.querySelectorAll('pao-checkbox'));
    const values = children
      .filter(child => (child as any).checked)
      .map(child => (child as any).value);

    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { values },
    }));
  }

  render() {
    return html`
      <fieldset class="pao-checkbox-group" part="fieldset">
        ${this.label ? html`<legend class="pao-checkbox-group-legend" part="legend">${this.label}</legend>` : ''}
        <div class="pao-checkbox-group-items ${this.orientation}" part="items" @paoChange=${this.handleChildChange}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.error ? html`<span class="pao-checkbox-group-error" part="error" role="alert">${this.error}</span>` : ''}
        ${this.helperText && !this.error ? html`<span class="pao-checkbox-group-helper" part="helper">${this.helperText}</span>` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-checkbox-group': PaoCheckboxGroup;
  }
}
