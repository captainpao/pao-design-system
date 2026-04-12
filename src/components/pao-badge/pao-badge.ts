import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-badge.styles';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@customElement('pao-badge')
export class PaoBadge extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: BadgeVariant = 'primary';
  @property({ type: String }) size: BadgeSize = 'md';
  @property({ type: Boolean, reflect: true }) pill = false;
  @property({ type: Boolean, reflect: true }) outline = false;

  render() {
    const classes = [
      'pao-badge',
      this.variant,
      this.size,
      this.pill ? 'pill' : '',
      this.outline ? 'outline' : '',
    ].filter(Boolean).join(' ');

    return html`
      <span class=${classes} part="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-badge': PaoBadge;
  }
}
