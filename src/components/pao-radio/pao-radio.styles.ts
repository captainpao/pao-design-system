import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-radio-wrapper {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .pao-radio-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pao-radio-input {
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

  .pao-radio-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--pao-border-color);
    border-radius: 50%;
    background-color: var(--pao-body-bg);
    transition: all 0.15s ease;
    position: relative;
  }

  .pao-radio-wrapper.sm .pao-radio-control { width: 14px; height: 14px; }
  .pao-radio-wrapper.md .pao-radio-control { width: 16px; height: 16px; }
  .pao-radio-wrapper.lg .pao-radio-control { width: 20px; height: 20px; }

  .pao-radio-input:checked ~ .pao-radio-control {
    border-color: var(--pao-color-primary);
  }

  .pao-radio-input:checked ~ .pao-radio-control::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--pao-color-primary);
  }

  .pao-radio-input:focus-visible ~ .pao-radio-control {
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-radio-wrapper.disabled .pao-radio-control {
    background-color: var(--pao-color-disabled-background);
    border-color: var(--pao-color-disabled-border);
  }

  .pao-radio-label {
    font-size: 0.875rem;
    color: var(--pao-body-color);
    padding-top: 1px;
  }

  .pao-radio-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.25rem;
  }

  .pao-radio-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.25rem;
  }
`;
