import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-skeleton.styles';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

const DEFAULT_HEIGHT: Record<SkeletonVariant, string> = {
  text: '1em',
  circle: '40px',
  rect: '1.2em',
};

@customElement('pao-skeleton')
export class PaoSkeleton extends LitElement {
  static styles = styles;

  @property({ type: String }) variant: SkeletonVariant = 'text';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '';
  @property({ type: Boolean }) animated = true;

  render() {
    const h = this.height || DEFAULT_HEIGHT[this.variant];
    const w = this.variant === 'circle' ? h : this.width;
    return html`
      <div
        class="pao-skeleton ${this.variant} ${this.animated ? 'animated' : ''}"
        part="skeleton"
        aria-hidden="true"
        style="width:${w};height:${h}"
      ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-skeleton': PaoSkeleton;
  }
}
