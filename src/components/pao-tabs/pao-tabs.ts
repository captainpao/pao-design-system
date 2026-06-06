import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-tabs.styles';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsVariant = 'line' | 'pill';

interface TabMeta {
  value: string;
  label: string;
  disabled: boolean;
}

@customElement('pao-tabs')
export class PaoTabs extends LitElement {
  static styles = styles;

  @property({ type: String }) value = '';
  @property({ type: String }) orientation: TabsOrientation = 'horizontal';
  @property({ type: String }) variant: TabsVariant = 'line';

  @state() private _tabs: TabMeta[] = [];

  private handleSlotChange() {
    const children = Array.from(this.querySelectorAll('pao-tab'));
    this._tabs = children.map(tab => ({
      value: (tab as any).value,
      label: (tab as any).label,
      disabled: (tab as any).disabled,
    }));
    if (!this.value) {
      const first = this._tabs.find(t => !t.disabled);
      if (first) this._activate(first.value);
    } else {
      this._syncActive();
    }
  }

  private _activate(value: string) {
    this.value = value;
    this._syncActive();
    this.dispatchEvent(new CustomEvent('paoChange', {
      bubbles: true,
      composed: true,
      detail: { value },
    }));
  }

  private _syncActive() {
    const children = this.querySelectorAll('pao-tab');
    children.forEach(tab => {
      (tab as any).active = (tab as any).value === this.value;
    });
  }

  private handleTabClick(value: string, disabled: boolean) {
    if (disabled) return;
    this._activate(value);
  }

  render() {
    const wrapperClasses = ['pao-tabs-wrapper', this.orientation].join(' ');
    const tablistClasses = ['pao-tabs-list', this.variant].join(' ');

    return html`
      <div class=${wrapperClasses} part="wrapper">
        <div
          class=${tablistClasses}
          part="tablist"
          role="tablist"
          aria-orientation=${this.orientation}
        >
          ${this._tabs.map(tab => html`
            <button
              class="pao-tab-trigger ${tab.value === this.value ? 'active' : ''}"
              part="tab"
              role="tab"
              aria-selected=${tab.value === this.value}
              ?disabled=${tab.disabled}
              tabindex=${tab.value === this.value ? '0' : '-1'}
              @click=${() => this.handleTabClick(tab.value, tab.disabled)}
            >${tab.label}</button>
          `)}
        </div>
        <div class="pao-tabs-content" part="content">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-tabs': PaoTabs;
  }
}
