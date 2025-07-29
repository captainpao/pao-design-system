import { css } from 'lit';

export const styles = css`
  .pao-icon {
    display: inline-flex;
    vertical-align: middle;
    font-size: 1.25rem;
    color: #007bff !important; /* Force a visible blue color */
  }
  .pao-icon svg {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
  }
  .pao-icon.sm { font-size: 1rem; }
  .pao-icon.md { font-size: 1.25rem; }
  .pao-icon.lg { font-size: 1.75rem; }
  .pao-icon.primary { color: #007bff !important; }
  .pao-icon.secondary { color: #6c757d !important; }
  .pao-icon.tertiary { color: #adb5bd !important; }
  .pao-icon.success { color: #28a745 !important; }
  .pao-icon.warning { color: #ffc107 !important; }
  .pao-icon.danger { color: #dc3545 !important; }
`; 