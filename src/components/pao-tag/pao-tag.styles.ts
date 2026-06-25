import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-flex;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border-radius: 50px;
    font-weight: 500;
    white-space: nowrap;
  }

  .pao-tag.sm {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  }

  .pao-tag.md {
    padding: 0.25rem 0.75rem;
    font-size: 0.8125rem;
  }

  .pao-tag.primary {
    background-color: var(--pao-color-primary-light);
    color: var(--pao-color-primary-text);
  }

  .pao-tag.secondary {
    background-color: var(--pao-color-secondary-light);
    color: var(--pao-color-secondary-text);
  }

  .pao-tag.success {
    background-color: var(--pao-color-success-light);
    color: var(--pao-color-success-text);
  }

  .pao-tag.warning {
    background-color: var(--pao-color-warning-light);
    color: var(--pao-color-warning-text);
  }

  .pao-tag.danger {
    background-color: var(--pao-color-danger-light);
    color: var(--pao-color-danger-text);
  }

  .pao-tag.neutral {
    background-color: var(--pao-gray-100);
    color: var(--pao-gray-700);
  }

  .pao-tag-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    line-height: 1;
    padding: 0;
    font-size: 1em;
  }
`;
