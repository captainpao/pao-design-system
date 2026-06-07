import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    border-bottom: 1px solid var(--pao-border-color);
  }

  :host(:first-child) {
    border-top: 1px solid var(--pao-border-color);
  }

  .pao-accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--pao-body-color);
    text-align: left;
    transition: background-color 0.15s ease;
  }

  .pao-accordion-trigger:hover:not(:disabled) {
    background-color: var(--pao-gray-50);
  }

  .pao-accordion-trigger:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pao-accordion-chevron {
    display: inline-block;
    font-size: 0.875rem;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .pao-accordion-chevron.open {
    transform: rotate(180deg);
  }

  .pao-accordion-panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .pao-accordion-panel.open {
    max-height: 1000px;
  }

  .pao-accordion-content {
    padding: 0 1.25rem 1rem;
    color: var(--pao-gray-700);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
`;
