import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-accordion-item.styles';

@customElement('pao-accordion-item')
export class PaoAccordionItem extends LitElement {
  static styles = styles;

  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleToggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('paoToggle', {
      bubbles: true,
      composed: true,
      detail: { open: this.open },
    }));
  }

  render() {
    return html`
      <div class="pao-accordion-item" part="item">
        <button
          class="pao-accordion-trigger"
          part="trigger"
          ?disabled=${this.disabled}
          aria-expanded=${this.open}
          @click=${this.handleToggle}
        >
          <span class="pao-accordion-label" part="label">${this.label}</span>
          <span class="pao-accordion-chevron ${this.open ? 'open' : ''}" part="chevron" aria-hidden="true">▾</span>
        </button>
        <div
          class="pao-accordion-panel ${this.open ? 'open' : ''}"
          part="panel"
          aria-hidden=${!this.open}
        >
          <div class="pao-accordion-content" part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-accordion-item': PaoAccordionItem;
  }
}
