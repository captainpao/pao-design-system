import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: inline-block;
    position: relative;
    --pao-tooltip-bg: #212529;
    --pao-tooltip-color: #ffffff;
    --pao-tooltip-font-size: 0.8125rem;
    --pao-tooltip-padding: 0.375rem 0.625rem;
    --pao-tooltip-border-radius: 4px;
    --pao-tooltip-arrow-size: 6px;
  }

  .pao-tooltip-wrapper {
    display: inline-flex;
    position: relative;
  }

  .pao-tooltip-trigger {
    display: inline-flex;
  }

  .pao-tooltip-popup {
    position: absolute;
    z-index: 900;
    background: var(--pao-tooltip-bg);
    color: var(--pao-tooltip-color);
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: var(--pao-tooltip-font-size);
    padding: var(--pao-tooltip-padding);
    border-radius: var(--pao-tooltip-border-radius);
    white-space: nowrap;
    pointer-events: none;
    line-height: 1.4;
    max-width: 250px;
    white-space: normal;
    word-wrap: break-word;
  }

  /* Positioning */
  .pao-tooltip-popup.top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .pao-tooltip-popup.bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .pao-tooltip-popup.left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .pao-tooltip-popup.right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  /* Arrow */
  .pao-tooltip-popup::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: var(--pao-tooltip-arrow-size) solid transparent;
  }

  .pao-tooltip-popup.top::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: var(--pao-tooltip-bg);
    border-bottom: none;
  }

  .pao-tooltip-popup.bottom::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: var(--pao-tooltip-bg);
    border-top: none;
  }

  .pao-tooltip-popup.left::after {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: var(--pao-tooltip-bg);
    border-right: none;
  }

  .pao-tooltip-popup.right::after {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: var(--pao-tooltip-bg);
    border-left: none;
  }
`;
