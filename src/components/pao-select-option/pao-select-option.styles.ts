import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-select-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-body-color);
    transition: background-color 0.1s ease;
  }

  .pao-select-option:hover:not(.disabled) {
    background-color: var(--pao-gray-100);
  }

  .pao-select-option.selected {
    background-color: var(--pao-color-primary-light);
    color: var(--pao-color-primary-dark);
    font-weight: 500;
  }

  .pao-select-option.disabled {
    color: var(--pao-color-disabled-text);
    cursor: not-allowed;
    pointer-events: none;
  }

  .pao-select-option-check {
    font-size: 0.75rem;
    color: var(--pao-color-primary);
    width: 1rem;
    text-align: center;
    flex-shrink: 0;
  }
`;
