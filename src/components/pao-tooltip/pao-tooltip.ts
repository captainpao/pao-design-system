import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-tooltip.styles';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@customElement('pao-tooltip')
export class PaoTooltip extends LitElement {
  static styles = styles;

  @property({ type: String }) content = '';
  @property({ type: String }) position: TooltipPosition = 'top';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number }) delay = 0;
  @property({ type: Boolean, reflect: true }) open = false;

  private _showTimer: ReturnType<typeof setTimeout> | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  private _clearTimer() {
    if (this._showTimer) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
  }

  show() {
    if (this.disabled) return;
    this._clearTimer();
    if (this.delay > 0) {
      this._showTimer = setTimeout(() => {
        this.open = true;
        this.dispatchEvent(new CustomEvent('paoShow', {
          bubbles: true,
          composed: true,
        }));
      }, this.delay);
    } else {
      this.open = true;
      this.dispatchEvent(new CustomEvent('paoShow', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  hide() {
    if (this.disabled) return;
    this._clearTimer();
    this.open = false;
    this.dispatchEvent(new CustomEvent('paoHide', {
      bubbles: true,
      composed: true,
    }));
  }

  private handleMouseEnter() {
    this.show();
  }

  private handleMouseLeave() {
    this.hide();
  }

  private handleFocus() {
    this.show();
  }

  private handleBlur() {
    this.hide();
  }

  render() {
    const popupClasses = ['pao-tooltip-popup', this.position].join(' ');

    return html`
      <div class="pao-tooltip-wrapper" part="wrapper">
        <span
          class="pao-tooltip-trigger"
          part="trigger"
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          <slot></slot>
        </span>
        ${this.open ? html`
          <div class=${popupClasses} part="popup" role="tooltip">
            ${this.content}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tooltip': PaoTooltip;
  }
}
