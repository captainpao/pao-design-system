import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-progress.styles';

export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'sm' | 'md' | 'lg';

@customElement('pao-progress')
export class PaoProgress extends LitElement {
  static styles = styles;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) variant: ProgressVariant = 'primary';
  @property({ type: String }) size: ProgressSize = 'md';
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showValue = false;

  render() {
    const clamped = Math.min(Math.max(this.value, 0), this.max);
    const pct = Math.round((clamped / this.max) * 100);
    const trackClasses = ['pao-progress-track', this.size].join(' ');
    const fillClasses = [
      'pao-progress-fill',
      this.variant,
      this.indeterminate ? 'indeterminate' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="pao-progress-wrapper" part="wrapper">
        <div
          class=${trackClasses}
          part="track"
          role="progressbar"
          aria-valuenow=${this.indeterminate ? '' : clamped}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-label=${this.label || 'Progress'}
        >
          <div
            class=${fillClasses}
            part="fill"
            style=${this.indeterminate ? '' : `width: ${pct}%`}
          ></div>
        </div>
        ${this.showValue && !this.indeterminate
          ? html`<span class="pao-progress-value" part="value">${pct}%</span>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-progress': PaoProgress;
  }
}
