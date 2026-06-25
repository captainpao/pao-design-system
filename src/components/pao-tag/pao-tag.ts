import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-tag.styles';

export type TagVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type TagSize = 'sm' | 'md';

@customElement('pao-tag')
export class PaoTag extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: TagVariant = 'neutral';
  @property({ type: String }) size: TagSize = 'md';
  @property({ type: Boolean }) removable = false;

  private handleRemove() {
    this.dispatchEvent(new CustomEvent('paoRemove', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="pao-tag ${this.variant} ${this.size}" part="tag">
        <slot></slot>
        ${this.removable
          ? html`<button class="pao-tag-remove" part="remove" aria-label="Remove" @click=${this.handleRemove}>×</button>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tag': PaoTag;
  }
}
