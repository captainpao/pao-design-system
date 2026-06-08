import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-accordion.styles';

@customElement('pao-accordion')
export class PaoAccordion extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) allowMultiple = false;

  private handleChildToggle(e: CustomEvent) {
    if (this.allowMultiple) return;
    if (!e.detail.open) return;
    const source = e.target as Element;
    const items = Array.from(this.querySelectorAll('pao-accordion-item'));
    items.forEach(item => {
      if (item !== source) (item as any).open = false;
    });
  }

  render() {
    return html`
      <div class="pao-accordion" part="accordion" @paoToggle=${this.handleChildToggle}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-accordion': PaoAccordion;
  }
}
