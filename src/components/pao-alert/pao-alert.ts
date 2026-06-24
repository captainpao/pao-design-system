import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-alert.styles';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const ICONS: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '✕',
};

@customElement('pao-alert')
export class PaoAlert extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: AlertVariant = 'info';
  @property({ type: String }) heading = '';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Boolean }) icon = true;
  @state() private _dismissed = false;

  private handleDismiss() {
    this._dismissed = true;
    this.dispatchEvent(new CustomEvent('paoDismiss', { bubbles: true, composed: true }));
  }

  render() {
    if (this._dismissed) return nothing;
    return html`
      <div class="pao-alert ${this.variant}" part="alert" role="alert">
        ${this.icon
          ? html`<span class="pao-alert-icon" part="icon" aria-hidden="true">${ICONS[this.variant]}</span>`
          : nothing}
        <div class="pao-alert-body">
          ${this.heading
            ? html`<div class="pao-alert-heading" part="heading">${this.heading}</div>`
            : nothing}
          <div class="pao-alert-content" part="content"><slot></slot></div>
        </div>
        ${this.dismissible
          ? html`<button class="pao-alert-close" part="close" aria-label="Dismiss" @click=${this.handleDismiss}>×</button>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-alert': PaoAlert;
  }
}
