import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    --pao-button-border-radius: 6px;
    --pao-button-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .pao-button {
    font-family: 'VerlagSSm', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: var(--pao-button-border, 1px solid transparent);
    border-radius: var(--pao-button-border-radius);
    cursor: pointer;
    font-weight: 500;
    transition: var(--pao-button-transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: var(--pao-button-background);
    color: var(--pao-button-color);
    position: relative;
    overflow: hidden;
    box-shadow: var(--pao-button-shadow, none);
  }

  .pao-button.pill {
    --pao-button-border-radius: 50px;
  }

  .pao-button:hover:not(:disabled):not(.loading) {
    transform: translateY(-1px);
    box-shadow: var(--pao-button-shadow-hover, 0 4px 12px rgba(0, 0, 0, 0.15));
  }

  .pao-button:active:not(:disabled):not(.loading) {
    transform: translateY(0);
    box-shadow: var(--pao-button-shadow-active, 0 2px 6px rgba(0, 0, 0, 0.1));
  }

  .pao-button:focus-visible {
    outline: 2px solid var(--pao-color-primary);
    outline-offset: 2px;
  }

  .pao-button:disabled,
  .pao-button.loading {
    background-color: var(--pao-color-disabled-background) !important;
    color: var(--pao-color-disabled-text) !important;
    border-color: var(--pao-color-disabled-border) !important;
    cursor: not-allowed;
    opacity: 0.7;
    transform: none !important;
    box-shadow: none !important;
  }

  .pao-button.loading {
    pointer-events: none;
  }

  /* Loading spinner */
  .pao-button__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: pao-button-spin 1s linear infinite;
    margin-right: 0.5rem;
    opacity: 0.8;
  }

  @keyframes pao-button-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .pao-button__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
  }

  /* Ripple effect */
  .pao-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: currentColor;
    transform: translate(-50%, -50%);
    opacity: 0.2;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
  }

  .pao-button:active:not(:disabled):not(.loading)::after {
    width: 200%;
    height: 200%;
    opacity: 0;
  }

  /* Solid appearance (default) */
  .pao-button.solid {
    /* Primary */
    &.primary {
      background-color: var(--pao-color-primary);
      color: white;
      border-color: var(--pao-color-primary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-primary-dark);
        border-color: var(--pao-color-primary-dark);
      }
    }

    /* Secondary */
    &.secondary {
      background-color: white;
      color: var(--pao-color-secondary);
      border-color: var(--pao-color-secondary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-secondary-light);
        border-color: var(--pao-color-secondary);
      }
    }

    /* Success */
    &.success {
      background-color: var(--pao-color-success);
      color: white;
      border-color: var(--pao-color-success);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-success-dark);
        border-color: var(--pao-color-success-dark);
      }
    }

    /* Warning */
    &.warning {
      background-color: var(--pao-color-warning);
      color: var(--pao-gray-900);
      border-color: var(--pao-color-warning);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-warning-dark);
        border-color: var(--pao-color-warning-dark);
      }
    }

    /* Danger */
    &.danger {
      background-color: var(--pao-color-danger);
      color: white;
      border-color: var(--pao-color-danger);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-danger-dark);
        border-color: var(--pao-color-danger-dark);
      }
    }
  }

  /* Outline appearance */
  .pao-button.outline {
    background-color: transparent;

    /* Primary */
    &.primary {
      color: var(--pao-color-primary);
      border-color: var(--pao-color-primary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-primary);
        color: white;
      }
    }

    /* Secondary */
    &.secondary {
      color: var(--pao-color-secondary);
      border-color: var(--pao-color-secondary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-secondary);
        color: white;
      }
    }

    /* Success */
    &.success {
      color: var(--pao-color-success);
      border-color: var(--pao-color-success);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-success);
        color: white;
      }
    }

    /* Warning */
    &.warning {
      color: var(--pao-color-warning);
      border-color: var(--pao-color-warning);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-warning);
        color: var(--pao-gray-900);
      }
    }

    /* Danger */
    &.danger {
      color: var(--pao-color-danger);
      border-color: var(--pao-color-danger);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-danger);
        color: white;
      }
    }
  }

  /* Ghost appearance */
  .pao-button.ghost {
    background-color: transparent;
    border-color: transparent;

    /* Primary */
    &.primary {
      color: var(--pao-color-primary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-primary-light);
      }
    }

    /* Secondary */
    &.secondary {
      color: var(--pao-color-secondary);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-secondary-light);
      }
    }

    /* Success */
    &.success {
      color: var(--pao-color-success);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-success-light);
      }
    }

    /* Warning */
    &.warning {
      color: var(--pao-color-warning);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-warning-light);
      }
    }

    /* Danger */
    &.danger {
      color: var(--pao-color-danger);

      &:hover:not(:disabled):not(.loading) {
        background-color: var(--pao-color-danger-light);
      }
    }
  }

  /* Sizes */
  .sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: 2rem;
  }

  .md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: 2.5rem;
  }

  .lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    min-height: 3rem;
  }
`;