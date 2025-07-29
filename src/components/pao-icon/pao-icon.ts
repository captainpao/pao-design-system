import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-icon.styles.js';
import { iconMap } from './pao-icon.utils.js';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';

@customElement('pao-icon')
export class PaoIcon extends LitElement {
  static styles = styles;

  @property({ type: String })
  name = 'check';

  @property({ type: String })
  size: IconSize = 'md';

  @property({ type: String })
  color: IconColor = 'primary';

  render() {
    const iconSvg = iconMap[this.name] || '';
    return html`
      <span class="pao-icon ${this.size} ${this.color}">${unsafeHTML(iconSvg)}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-icon': PaoIcon;
  }
} 