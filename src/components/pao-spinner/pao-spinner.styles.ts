import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pao-spinner {
    border-radius: 50%;
    border-style: solid;
    border-bottom-color: transparent !important;
    animation: pao-spin 0.75s linear infinite;
    flex-shrink: 0;
  }

  @keyframes pao-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Sizes */
  .pao-spinner.sm { width: 1rem;   height: 1rem;   border-width: 2px; }
  .pao-spinner.md { width: 1.5rem; height: 1.5rem; border-width: 2px; }
  .pao-spinner.lg { width: 2.5rem; height: 2.5rem; border-width: 3px; }

  /* Variants */
  .pao-spinner.primary   { border-color: var(--pao-color-primary); }
  .pao-spinner.secondary { border-color: var(--pao-color-secondary); }
  .pao-spinner.success   { border-color: var(--pao-color-success); }
  .pao-spinner.warning   { border-color: var(--pao-color-warning); }
  .pao-spinner.danger    { border-color: var(--pao-color-danger); }
  .pao-spinner.light     { border-color: var(--pao-color-light-dark); }
`;
