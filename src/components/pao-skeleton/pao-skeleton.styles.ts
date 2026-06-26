import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-skeleton {
    background: var(--pao-gray-200);
    border-radius: 4px;
  }

  .pao-skeleton.circle {
    border-radius: 50%;
  }

  .pao-skeleton.animated {
    background: linear-gradient(
      90deg,
      var(--pao-gray-200) 25%,
      var(--pao-gray-100) 50%,
      var(--pao-gray-200) 75%
    );
    background-size: 200% 100%;
    animation: pao-skeleton-shimmer 1.5s infinite;
  }

  @keyframes pao-skeleton-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
