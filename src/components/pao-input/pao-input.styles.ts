import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    --pao-input-border-radius: 6px;
    --pao-input-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pao-input-label {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
  }

  .pao-input-label .required-mark {
    color: var(--pao-color-danger);
    margin-left: 0.25rem;
  }

  .pao-input {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    width: 100%;
    border: 1px solid var(--pao-border-color);
    border-radius: var(--pao-input-border-radius);
    background-color: var(--pao-body-bg);
    color: var(--pao-body-color);
    transition: var(--pao-input-transition);
    outline: none;
    box-sizing: border-box;
  }

  .pao-input:focus {
    border-color: var(--pao-color-primary);
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-input:disabled {
    background-color: var(--pao-color-disabled-background);
    color: var(--pao-color-disabled-text);
    border-color: var(--pao-color-disabled-border);
    cursor: not-allowed;
  }

  .pao-input[readonly] {
    background-color: var(--pao-gray-100);
    cursor: default;
  }

  .pao-input.error {
    border-color: var(--pao-color-danger);
    box-shadow: none;
  }

  .pao-input.error:focus {
    box-shadow: 0 0 0 3px var(--pao-color-danger-light);
  }

  /* Sizes */
  .pao-input.sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    min-height: 2rem;
  }

  .pao-input.md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    min-height: 2.5rem;
  }

  .pao-input.lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    min-height: 3rem;
  }

  .pao-input-helper {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
  }

  .pao-input-error {
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
  }
`;
