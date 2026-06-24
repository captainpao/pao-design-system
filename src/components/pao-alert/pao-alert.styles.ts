import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-alert {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: 6px;
    border-left: 4px solid;
    align-items: flex-start;
  }

  .pao-alert-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pao-alert-heading {
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .pao-alert-content {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .pao-alert-icon {
    flex-shrink: 0;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .pao-alert-close {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    font-size: 1.1rem;
    line-height: 1;
    padding: 0;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .pao-alert-close:hover {
    opacity: 1;
  }

  /* Variants */
  .pao-alert.info {
    background: var(--pao-color-info-light, #e8f4fd);
    color: var(--pao-color-info-text, #0a558c);
    border-left-color: var(--pao-color-info, #17a2b8);
  }

  .pao-alert.success {
    background: var(--pao-color-success-light, #d4edda);
    color: var(--pao-color-success-text, #155724);
    border-left-color: var(--pao-color-success, #28a745);
  }

  .pao-alert.warning {
    background: var(--pao-color-warning-light, #fff3cd);
    color: var(--pao-color-warning-text, #856404);
    border-left-color: var(--pao-color-warning, #ffc107);
  }

  .pao-alert.danger {
    background: var(--pao-color-danger-light, #f8d7da);
    color: var(--pao-color-danger-text, #721c24);
    border-left-color: var(--pao-color-danger, #dc3545);
  }
`;
