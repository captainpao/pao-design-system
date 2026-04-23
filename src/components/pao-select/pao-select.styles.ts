import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    --pao-select-z-index: 1000;
  }

  .pao-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
  }

  .pao-select-label {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
  }

  .pao-select-label .required-mark {
    color: var(--pao-color-danger);
    margin-left: 0.25rem;
  }

  .pao-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid var(--pao-border-color);
    border-radius: 6px;
    background-color: var(--pao-body-bg);
    color: var(--pao-body-color);
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    user-select: none;
  }

  .pao-select-trigger:focus {
    border-color: var(--pao-color-primary);
    box-shadow: 0 0 0 3px var(--pao-color-primary-light);
  }

  .pao-select-trigger.error {
    border-color: var(--pao-color-danger);
  }

  .pao-select-trigger.error:focus {
    box-shadow: 0 0 0 3px var(--pao-color-danger-light);
  }

  .pao-select-trigger.disabled {
    background-color: var(--pao-color-disabled-background);
    color: var(--pao-color-disabled-text);
    border-color: var(--pao-color-disabled-border);
    cursor: not-allowed;
  }

  .pao-select-trigger.sm { padding: 0.375rem 0.75rem; font-size: 0.875rem; min-height: 2rem; }
  .pao-select-trigger.md { padding: 0.5rem 1rem; font-size: 1rem; min-height: 2.5rem; }
  .pao-select-trigger.lg { padding: 0.75rem 1.25rem; font-size: 1.125rem; min-height: 3rem; }

  .pao-select-display {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pao-select-display.placeholder {
    color: var(--pao-gray-500);
  }

  .pao-select-chevron {
    display: inline-block;
    transition: transform 0.2s ease;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  .pao-select-chevron.open {
    transform: rotate(180deg);
  }

  .pao-select-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background-color: var(--pao-body-bg);
    border: 1px solid var(--pao-border-color);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: var(--pao-select-z-index);
    overflow: hidden;
    max-height: 200px;
    overflow-y: auto;
  }

  .pao-select-error {
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
  }

  .pao-select-helper {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
  }
`;
