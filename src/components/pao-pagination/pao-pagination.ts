import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './pao-pagination.styles';
import { getPageRange } from './pao-pagination.utils';

@customElement('pao-pagination')
export class PaoPagination extends LitElement {
  static styles = styles;
  @property({ type: Number }) total = 0;
  @property({ type: Number }) pageSize = 10;
  @property({ type: Number }) current = 1;
  @property({ type: Number }) siblingCount = 1;
  @property({ type: Boolean }) showEdges = false;

  get totalPages() { return Math.max(1, Math.ceil(this.total / this.pageSize)); }

  private goTo(page: number) {
    const next = Math.min(Math.max(page, 1), this.totalPages);
    if (next === this.current) return;
    this.current = next;
    this.dispatchEvent(new CustomEvent('paoPageChange', { bubbles: true, composed: true, detail: { page: next } }));
  }

  render() {
    const pages = getPageRange({ totalPages: this.totalPages, current: this.current, siblingCount: this.siblingCount });
    return html`
      <nav class="pao-pagination" part="pagination" aria-label="Pagination">
        ${this.showEdges ? html`<button class="pao-page" part="page" ?disabled=${this.current === 1} aria-label="First page" @click=${() => this.goTo(1)}>«</button>` : nothing}
        <button class="pao-page" part="prev" ?disabled=${this.current === 1} aria-label="Previous page" @click=${() => this.goTo(this.current - 1)}>‹</button>
        ${pages.map(p => p === 'ellipsis'
          ? html`<span class="pao-page-ellipsis" part="ellipsis" aria-hidden="true">…</span>`
          : html`<button class="pao-page ${p === this.current ? 'active' : ''}" part="page" aria-current=${p === this.current ? 'page' : nothing} @click=${() => this.goTo(p as number)}>${p}</button>`)}
        <button class="pao-page" part="next" ?disabled=${this.current === this.totalPages} aria-label="Next page" @click=${() => this.goTo(this.current + 1)}>›</button>
        ${this.showEdges ? html`<button class="pao-page" part="page" ?disabled=${this.current === this.totalPages} aria-label="Last page" @click=${() => this.goTo(this.totalPages)}>»</button>` : nothing}
      </nav>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'pao-pagination': PaoPagination } }
