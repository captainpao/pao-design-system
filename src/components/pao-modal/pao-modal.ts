import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-modal.styles';

export type ModalSize = 'sm' | 'md' | 'lg';

@customElement('pao-modal')
export class PaoModal extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';
  @property({ type: Boolean }) dismissible = true;
  @property({ type: String }) size: ModalSize = 'md';

  showModal() {
    this.open = true;
    this.dispatchEvent(new CustomEvent('paoOpen', {
      bubbles: true,
      composed: true,
    }));
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('paoClose', {
      bubbles: true,
      composed: true,
    }));
  }

  private dismiss(source: string) {
    if (!this.dismissible) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('paoClose', {
      bubbles: true,
      composed: true,
      detail: { source },
    }));
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.dismiss('escape');
    }
  }

  private handleBackdropClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('pao-modal-overlay')) return;
    this.dismiss('backdrop');
  }

  render() {
    if (!this.open) return html``;

    const panelClasses = ['pao-modal-panel', this.size].join(' ');

    return html`
      <div
        class="pao-modal-overlay"
        part="overlay"
        role="presentation"
        @click=${this.handleBackdropClick}
        @keydown=${this.handleKeydown}
      >
        <div
          class=${panelClasses}
          part="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.title || undefined}
        >
          <div class="pao-modal-header" part="header">
            <h2 class="pao-modal-title" part="title">
              ${this.title}
            </h2>
            ${this.dismissible ? html`
              <button
                class="pao-modal-close"
                part="close"
                aria-label="Close"
                @click=${() => this.dismiss('close-button')}
              >
                &#x2715;
              </button>
            ` : ''}
          </div>
          <div class="pao-modal-body" part="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-modal': PaoModal;
  }
}
