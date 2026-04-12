import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-spinner.styles';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light';

@customElement('pao-spinner')
export class PaoSpinner extends LitElement {
  static styles = styles;

  @property({ type: String }) size: SpinnerSize = 'md';
  @property({ type: String }) variant: SpinnerVariant = 'primary';
  @property({ type: String }) label = 'Loading...';

  render() {
    const classes = ['pao-spinner', this.size, this.variant].join(' ');
    return html`
      <span
        class=${classes}
        part="spinner"
        role="status"
        aria-label=${this.label}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-spinner': PaoSpinner;
  }
}
