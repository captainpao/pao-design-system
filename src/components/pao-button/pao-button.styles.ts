import { css } from 'lit';
import '../../styles/_fonts.scss';

export const styles = css`
  :host {
    display: inline-block;
  }

  .pao-button {
    font-family: 'VerlagSSm', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 400;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .pao-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */
  .primary {
    background-color: #0066cc;
    color: white;
  }

  .primary:hover:not(:disabled) {
    background-color: #0052a3;
  }

  .secondary {
    background-color: #e6e6e6;
    color: #333333;
  }

  .secondary:hover:not(:disabled) {
    background-color: #d1d1d1;
  }

  .ghost {
    background-color: transparent;
    color: #0066cc;
  }

  .ghost:hover:not(:disabled) {
    background-color: rgba(0, 102, 204, 0.1);
  }

  /* Sizes */
  .sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  .lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
`;
