import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-menu-item {
    width: 100%;
    text-align: left;
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    color: var(--pao-body-color);
  }

  .pao-menu-item:hover:not(:disabled) {
    background: var(--pao-gray-100);
  }

  .pao-menu-item:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
