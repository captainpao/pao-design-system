import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    --pao-textarea-border-radius: 6px;
    --pao-textarea-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pao-textarea-label {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
  }

  .pao-textarea-label .required-mark {
    color: var(--pao-color-danger);
    margin-left: 0.25rem;
  }

  .pao-textarea {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    width: 100%;
    border: 1px solid var(--pao-border-color);
    border-radius: var(--pao-textarea-border-radius);
    background-color: var(--pao-body-bg);
    color: var(--pao-body-color);
    transition: var(--pao-textarea-transition);
    outline: none;
    box-sizing: border-box;
    line-height: 1.5;
  }

  .pao-textarea:focus {
    border-color: var(--pao-color-primary);
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-textarea:disabled {
    background-color: var(--pao-color-disabled-background);
    color: var(--pao-color-disabled-text);
    border-color: var(--pao-color-disabled-border);
    cursor: not-allowed;
    resize: none;
  }

  .pao-textarea[readonly] {
    background-color: var(--pao-gray-100);
    cursor: default;
  }

  .pao-textarea.error {
    border-color: var(--pao-color-danger);
    box-shadow: none;
  }

  .pao-textarea.error:focus {
    box-shadow: 0 0 0 3px var(--pao-color-danger-light);
  }

  /* Sizes */
  .pao-textarea.sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .pao-textarea.md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .pao-textarea.lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
  }

  .pao-textarea-counter {
    font-size: 0.8125rem;
    color: var(--pao-gray-500);
    text-align: right;
  }

  .pao-textarea-helper {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
  }

  .pao-textarea-error {
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
  }
`;
