import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-toggle-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .pao-toggle-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pao-toggle-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    opacity: 0;
  }

  .pao-toggle-track {
    position: relative;
    flex-shrink: 0;
    border-radius: 9999px;
    background-color: var(--pao-gray-400);
    transition: background-color 0.2s ease;
  }

  .pao-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  /* Size variants */
  .pao-toggle-wrapper.sm .pao-toggle-track { width: 28px; height: 16px; }
  .pao-toggle-wrapper.sm .pao-toggle-thumb { width: 12px; height: 12px; }

  .pao-toggle-wrapper.md .pao-toggle-track { width: 36px; height: 20px; }
  .pao-toggle-wrapper.md .pao-toggle-thumb { width: 16px; height: 16px; }

  .pao-toggle-wrapper.lg .pao-toggle-track { width: 44px; height: 24px; }
  .pao-toggle-wrapper.lg .pao-toggle-thumb { width: 20px; height: 20px; }

  /* Checked state */
  .pao-toggle-input:checked ~ .pao-toggle-track {
    background-color: var(--pao-color-primary);
  }

  .pao-toggle-wrapper.sm .pao-toggle-input:checked ~ .pao-toggle-track .pao-toggle-thumb {
    transform: translateX(12px);
  }

  .pao-toggle-wrapper.md .pao-toggle-input:checked ~ .pao-toggle-track .pao-toggle-thumb {
    transform: translateX(16px);
  }

  .pao-toggle-wrapper.lg .pao-toggle-input:checked ~ .pao-toggle-track .pao-toggle-thumb {
    transform: translateX(20px);
  }

  /* Focus ring */
  .pao-toggle-input:focus-visible ~ .pao-toggle-track {
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  /* Disabled checked */
  .pao-toggle-wrapper.disabled .pao-toggle-input:checked ~ .pao-toggle-track {
    background-color: var(--pao-color-disabled-border);
  }

  .pao-toggle-label {
    font-size: 0.875rem;
    color: var(--pao-body-color);
  }

  .pao-toggle-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.25rem;
  }

  .pao-toggle-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.25rem;
  }
`;
