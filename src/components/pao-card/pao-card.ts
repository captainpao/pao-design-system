import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-card.styles';

@customElement('pao-card')
export class PaoCard extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) shadow = false;
  @property({ type: Boolean }) padded = true;

  @state() private _hasHeader = false;
  @state() private _hasFooter = false;

  private handleHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const padClass = this.padded ? 'padded' : '';
    return html`
      <div class="pao-card" part="card">
        <div class="pao-card-header ${this._hasHeader ? padClass : 'hidden'}" part="header">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="pao-card-body ${padClass}" part="body">
          <slot></slot>
        </div>
        <div class="pao-card-footer ${this._hasFooter ? padClass : 'hidden'}" part="footer">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-card': PaoCard;
  }
}
