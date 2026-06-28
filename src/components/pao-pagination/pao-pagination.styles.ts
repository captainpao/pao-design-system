import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-pagination {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .pao-page {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    border: 1px solid var(--pao-border-color);
    background: var(--pao-body-bg);
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-size: 0.875rem;
    color: var(--pao-body-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, border-color 0.15s;
  }

  .pao-page:hover:not(:disabled) {
    background: var(--pao-gray-100);
    border-color: var(--pao-color-primary);
  }

  .pao-page.active {
    background: var(--pao-color-primary);
    color: #fff;
    border-color: var(--pao-color-primary);
  }

  .pao-page[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pao-page-ellipsis {
    padding: 0 0.25rem;
    color: var(--pao-gray-500);
    font-size: 0.875rem;
    min-width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
