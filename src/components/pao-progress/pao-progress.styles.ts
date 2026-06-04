import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-progress-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pao-progress-track {
    flex: 1;
    background-color: var(--pao-gray-200);
    border-radius: 50px;
    overflow: hidden;
  }

  .pao-progress-track.sm { height: 4px; }
  .pao-progress-track.md { height: 8px; }
  .pao-progress-track.lg { height: 14px; }

  .pao-progress-fill {
    height: 100%;
    border-radius: 50px;
    transition: width 0.3s ease;
  }

  .pao-progress-fill.primary   { background-color: var(--pao-color-primary); }
  .pao-progress-fill.secondary { background-color: var(--pao-color-secondary); }
  .pao-progress-fill.success   { background-color: var(--pao-color-success); }
  .pao-progress-fill.warning   { background-color: var(--pao-color-warning); }
  .pao-progress-fill.danger    { background-color: var(--pao-color-danger); }

  .pao-progress-fill.indeterminate {
    width: 40%;
    animation: pao-progress-slide 1.4s ease-in-out infinite;
  }

  @keyframes pao-progress-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  .pao-progress-value {
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    white-space: nowrap;
    flex-shrink: 0;
  }
`;
