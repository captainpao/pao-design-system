import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-toast.styles';

export type ToastVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

@customElement('pao-toast')
export class PaoToast extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: ToastVariant = 'primary';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) dismissible = true;
  @property({ type: Number }) duration = 0;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  updated(changed: Map<string, unknown>) {
    if (changed.has('open') || changed.has('duration')) {
      this._clearTimer();
      if (this.open && this.duration > 0) {
        this._timer = setTimeout(() => this.dismiss(), this.duration);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  private _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  dismiss() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('paoDismiss', {
      bubbles: true,
      composed: true,
      detail: { variant: this.variant },
    }));
  }

  render() {
    if (!this.open) return html``;

    const classes = ['pao-toast', this.variant].join(' ');
    return html`
      <div class=${classes} role="alert" aria-live="polite" part="toast">
        <div class="pao-toast-body" part="body">
          <div class="pao-toast-content" part="content">
            ${this.title ? html`<strong class="pao-toast-title" part="title">${this.title}</strong>` : ''}
            <span class="pao-toast-message" part="message"><slot>${this.message}</slot></span>
          </div>
          ${this.dismissible ? html`
            <button class="pao-toast-close" part="close" aria-label="Dismiss" @click=${this.dismiss}>&#x2715;</button>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-toast': PaoToast;
  }
}
