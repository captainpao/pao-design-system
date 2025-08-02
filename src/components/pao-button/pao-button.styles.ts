import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
  }

  .pao-button {
    font-family: 'VerlagSSm', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: var(--pao-button-border, 1px solid transparent);
    border-radius: var(--pao-button-border-radius, 4px);
    cursor: pointer;
    font-weight: 400;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: var(--pao-button-background);
    color: var(--pao-button-color);
  }

  .pao-button:disabled {
    background-color: var(--pao-color-disabled-background) !important;
    color: var(--pao-color-disabled-text) !important;
    border-color: var(--pao-color-disabled-border) !important;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Primary variant */
  .pao-button.primary {
    background-color: var(--pao-button-background, var(--pao-color-primary));
    color: var(--pao-button-color, var(--pao-color-primary-text));
    border-color: var(--pao-color-primary);
  }

  .pao-button.primary:hover:not(:disabled) {
    background-color: var(--pao-color-primary-hover);
    border-color: var(--pao-color-primary-hover);
  }

  .pao-button.primary:active:not(:disabled) {
    background-color: var(--pao-color-primary-active);
    border-color: var(--pao-color-primary-active);
  }

  /* Secondary variant */
  .pao-button.secondary {
    background-color: var(--pao-button-background, var(--pao-color-secondary));
    color: var(--pao-button-color, var(--pao-color-secondary-text));
    border-color: var(--pao-color-secondary);
  }

  .pao-button.secondary:hover:not(:disabled) {
    background-color: var(--pao-color-secondary-hover);
    border-color: var(--pao-color-secondary-hover);
  }

  .pao-button.secondary:active:not(:disabled) {
    background-color: var(--pao-color-secondary-active);
    border-color: var(--pao-color-secondary-active);
  }

  /* Tertiary variant */
  .pao-button.tertiary {
    background-color: var(--pao-button-background, var(--pao-color-tertiary));
    color: var(--pao-button-color, var(--pao-color-tertiary-text));
    border-color: var(--pao-color-tertiary);
  }

  .pao-button.tertiary:hover:not(:disabled) {
    background-color: var(--pao-color-tertiary-hover);
    border-color: var(--pao-color-tertiary-hover);
  }

  .pao-button.tertiary:active:not(:disabled) {
    background-color: var(--pao-color-tertiary-active);
    border-color: var(--pao-color-tertiary-active);
  }

  /* Success variant */
  .pao-button.success {
    background-color: var(--pao-button-background, var(--pao-color-success));
    color: var(--pao-button-color, var(--pao-color-success-text));
    border-color: var(--pao-color-success);
  }

  .pao-button.success:hover:not(:disabled) {
    background-color: var(--pao-color-success-hover);
    border-color: var(--pao-color-success-hover);
  }

  .pao-button.success:active:not(:disabled) {
    background-color: var(--pao-color-success-active);
    border-color: var(--pao-color-success-active);
  }

  /* Warning variant */
  .pao-button.warning {
    background-color: var(--pao-button-background, var(--pao-color-warning));
    color: var(--pao-button-color, var(--pao-color-warning-text));
    border-color: var(--pao-color-warning);
  }

  .pao-button.warning:hover:not(:disabled) {
    background-color: var(--pao-color-warning-hover);
    border-color: var(--pao-color-warning-hover);
  }

  .pao-button.warning:active:not(:disabled) {
    background-color: var(--pao-color-warning-active);
    border-color: var(--pao-color-warning-active);
  }

  /* Danger variant */
  .pao-button.danger {
    background-color: var(--pao-button-background, var(--pao-color-danger));
    color: var(--pao-button-color, var(--pao-color-danger-text));
    border-color: var(--pao-color-danger);
  }

  .pao-button.danger:hover:not(:disabled) {
    background-color: var(--pao-color-danger-hover);
    border-color: var(--pao-color-danger-hover);
  }

  .pao-button.danger:active:not(:disabled) {
    background-color: var(--pao-color-danger-active);
    border-color: var(--pao-color-danger-active);
  }

  /* Sizes */
  .sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  .lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
`;