import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-toast {
    border-radius: 8px;
    border: 1px solid transparent;
    border-left-width: 4px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .pao-toast-body {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
  }

  .pao-toast-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pao-toast-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--pao-gray-900);
    display: block;
  }

  .pao-toast-message {
    font-size: 0.875rem;
    color: var(--pao-gray-700);
    line-height: 1.5;
  }

  .pao-toast-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    color: var(--pao-gray-500);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .pao-toast-close:hover {
    color: var(--pao-gray-900);
  }

  /* Variants — left border + background tint */
  .pao-toast.primary {
    border-left-color: var(--pao-color-primary);
    background-color: #f0f6ff;
    border-color: var(--pao-color-primary-light);
    border-left-color: var(--pao-color-primary);
  }

  .pao-toast.secondary {
    border-left-color: var(--pao-color-secondary);
    background-color: var(--pao-color-secondary-light);
    border-color: #c8cbcf;
    border-left-color: var(--pao-color-secondary);
  }

  .pao-toast.success {
    border-left-color: var(--pao-color-success);
    background-color: var(--pao-color-success-light);
    border-color: #a3cfbb;
    border-left-color: var(--pao-color-success);
  }

  .pao-toast.warning {
    border-left-color: var(--pao-color-warning);
    background-color: var(--pao-color-warning-light);
    border-color: #ffe69c;
    border-left-color: var(--pao-color-warning);
  }

  .pao-toast.danger {
    border-left-color: var(--pao-color-danger);
    background-color: var(--pao-color-danger-light);
    border-color: #f1aeb5;
    border-left-color: var(--pao-color-danger);
  }

  .pao-toast.info {
    border-left-color: var(--pao-color-info);
    background-color: var(--pao-color-info-light);
    border-color: #9eeaf9;
    border-left-color: var(--pao-color-info);
  }
`;
