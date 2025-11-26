import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './pao-button-group.styles';
import { ButtonVariant, ButtonSize } from '../pao-button/pao-button';


export type SelectionType = 'single' | 'multiple';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  [key: string]: unknown;
}

@customElement('pao-button-group')
export class PaoButtonGroup extends LitElement {
  static styles = styles;

  @property({ type: Array })
  buttons: ButtonProps[] = [];

  @property({ type: String })
  className = '';

  @property({ type: Boolean, reflect: true })
  pillShape = false;

  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  @property({ type: String, reflect: true })
  selectionType: SelectionType = 'single';

  @property({ type: Array, reflect: true })
  active: number[] = [];

  @property({ type: Array, reflect: true })
  defaultActive: number[] = [];

  @state()
  private _internalActive: number[] = [];

  @state()
  private _isControlled = false;

  connectedCallback() {
    super.connectedCallback();
    this._isControlled = this.active.length > 0;
    if (!this._isControlled) {
      this._internalActive = [...this.defaultActive];
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('active')) {
      this._isControlled = this.active.length > 0;
    }
  }

  private get currentActive(): number[] {
    return this._isControlled ? this.active : this._internalActive;
  }

  private getButtonVariant(buttonProps: ButtonProps, index: number): ButtonVariant {
    // If button has its own variant specified, use it
    if (buttonProps.variant) {
      return buttonProps.variant;
    }

    // Active buttons use primary variant, inactive use secondary
    const isActive = this.currentActive.includes(index);
    return isActive ? 'primary' : 'secondary';
  }

  private handleButtonClick(index: number) {
    const currentActive = [...this.currentActive];

    if (this.selectionType === 'single') {
      const newActive = currentActive.includes(index) ? [] : [index];
      this.updateActive(newActive);
    } else {
      const activeIndex = currentActive.indexOf(index);
      if (activeIndex > -1) {
        currentActive.splice(activeIndex, 1);
      } else {
        currentActive.push(index);
      }
      this.updateActive(currentActive);
    }

    this.dispatchEvent(new CustomEvent('pao-selection-change', {
      bubbles: true,
      composed: true,
      detail: {
        active: this.currentActive,
        clickedIndex: index
      }
    }));
  }

  private updateActive(newActive: number[]) {
    if (!this._isControlled) {
      this._internalActive = newActive;
    }

    this.dispatchEvent(new CustomEvent('pao-active-change', {
      bubbles: true,
      composed: true,
      detail: { active: newActive }
    }));
  }

  render() {
    return html`
      <div 
        class="pao-button-group ${this.className} ${this.pillShape ? 'pill' : ''}"
        role="group"
      >
        ${this.buttons.map((buttonProps, index) => {
      const isActive = this.currentActive.includes(index);
      const variant = this.getButtonVariant(buttonProps, index);

      return html`
            <pao-button
              class="group-button ${isActive ? 'active' : ''} ${index === 0 ? 'first' : ''} ${index === this.buttons.length - 1 ? 'last' : ''}"
              variant=${variant}
              size=${this.size}
              ?disabled=${buttonProps.disabled || false}
              @paoClick=${() => this.handleButtonClick(index)}
            >
              ${buttonProps.label}
            </pao-button>
          `;
    })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pao-button-group': PaoButtonGroup;
  }
}