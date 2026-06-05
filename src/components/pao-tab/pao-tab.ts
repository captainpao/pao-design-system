import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-tab.styles';

@customElement('pao-tab')
export class PaoTab extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`
      <div
        class="pao-tab-panel"
        part="panel"
        role="tabpanel"
        ?hidden=${!this.active}
        aria-hidden=${!this.active}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tab': PaoTab;
  }
}
