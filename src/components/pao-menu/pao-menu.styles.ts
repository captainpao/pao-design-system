import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .pao-menu {
    position: relative;
    display: inline-block;
  }

  .pao-menu-trigger {
    display: inline-block;
    cursor: pointer;
  }

  .pao-menu-popup {
    position: absolute;
    top: 100%;
    min-width: 10rem;
    background: var(--pao-body-bg, #fff);
    border: 1px solid var(--pao-border-color, #dee2e6);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    padding: 0.25rem 0;
    z-index: 10;
  }

  .pao-menu-popup.bottom-start {
    left: 0;
  }

  .pao-menu-popup.bottom-end {
    right: 0;
  }

  [hidden] {
    display: none !important;
  }
`;
