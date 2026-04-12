import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-flex;
  }

  .pao-badge {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 4px;
    border: 1px solid transparent;
    line-height: 1;
    white-space: nowrap;
  }

  /* Pill shape */
  .pao-badge.pill {
    border-radius: 50px;
  }

  /* Sizes */
  .pao-badge.sm {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  }

  .pao-badge.md {
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
  }

  .pao-badge.lg {
    padding: 0.375rem 0.875rem;
    font-size: 0.9375rem;
  }

  /* Solid variants */
  .pao-badge.primary   { background-color: var(--pao-color-primary);   color: #fff; border-color: var(--pao-color-primary); }
  .pao-badge.secondary { background-color: var(--pao-color-secondary); color: #fff; border-color: var(--pao-color-secondary); }
  .pao-badge.success   { background-color: var(--pao-color-success);   color: #fff; border-color: var(--pao-color-success); }
  .pao-badge.warning   { background-color: var(--pao-color-warning);   color: var(--pao-gray-900); border-color: var(--pao-color-warning); }
  .pao-badge.danger    { background-color: var(--pao-color-danger);    color: #fff; border-color: var(--pao-color-danger); }
  .pao-badge.info      { background-color: var(--pao-color-info);      color: var(--pao-gray-900); border-color: var(--pao-color-info); }

  /* Outline variants */
  .pao-badge.outline.primary   { background-color: var(--pao-color-primary-light);   color: var(--pao-color-primary-dark);   border-color: var(--pao-color-primary); }
  .pao-badge.outline.secondary { background-color: var(--pao-color-secondary-light); color: var(--pao-color-secondary-dark); border-color: var(--pao-color-secondary); }
  .pao-badge.outline.success   { background-color: var(--pao-color-success-light);   color: var(--pao-color-success-dark);   border-color: var(--pao-color-success); }
  .pao-badge.outline.warning   { background-color: var(--pao-color-warning-light);   color: var(--pao-color-warning-dark);   border-color: var(--pao-color-warning); }
  .pao-badge.outline.danger    { background-color: var(--pao-color-danger-light);    color: var(--pao-color-danger-dark);    border-color: var(--pao-color-danger); }
  .pao-badge.outline.info      { background-color: var(--pao-color-info-light);      color: var(--pao-color-info-dark);      border-color: var(--pao-color-info); }
`;
