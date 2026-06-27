import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-breadcrumb.styles';

@customElement('pao-breadcrumb')
export class PaoBreadcrumb extends LitElement {
  static styles = styles;

  @property({ type: String }) separator = '/';

  render() {
    return html`
      <nav part="breadcrumb" aria-label="Breadcrumb" style=${`--pao-breadcrumb-separator: '${this.separator}'`}>
        <div class="pao-breadcrumb-list" part="list"><slot></slot></div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-breadcrumb': PaoBreadcrumb;
  }
}
