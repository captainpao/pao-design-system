import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-checkbox-wrapper {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .pao-checkbox-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pao-checkbox-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    margin: 0;
  }

  .pao-checkbox-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--pao-border-color);
    border-radius: 4px;
    background-color: var(--pao-body-bg);
    transition: all 0.15s ease;
    position: relative;
  }

  .pao-checkbox-wrapper.sm .pao-checkbox-control { width: 14px; height: 14px; }
  .pao-checkbox-wrapper.md .pao-checkbox-control { width: 16px; height: 16px; }
  .pao-checkbox-wrapper.lg .pao-checkbox-control { width: 20px; height: 20px; }

  .pao-checkbox-input:checked ~ .pao-checkbox-control {
    background-color: var(--pao-color-primary);
    border-color: var(--pao-color-primary);
  }

  .pao-checkbox-input:checked ~ .pao-checkbox-control::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 60%;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg) translate(-10%, -10%);
  }

  .pao-checkbox-input:indeterminate ~ .pao-checkbox-control {
    background-color: var(--pao-color-primary);
    border-color: var(--pao-color-primary);
  }

  .pao-checkbox-input:indeterminate ~ .pao-checkbox-control::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: white;
  }

  .pao-checkbox-input:focus-visible ~ .pao-checkbox-control {
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-checkbox-wrapper.disabled .pao-checkbox-control {
    background-color: var(--pao-color-disabled-background);
    border-color: var(--pao-color-disabled-border);
  }

  .pao-checkbox-label {
    font-size: 0.875rem;
    color: var(--pao-body-color);
    padding-top: 1px;
  }

  .pao-checkbox-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.25rem;
  }

  .pao-checkbox-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.25rem;
  }
`;
