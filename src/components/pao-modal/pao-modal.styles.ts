import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: contents;
    --pao-modal-overlay-bg: rgba(0, 0, 0, 0.5);
    --pao-modal-border-radius: 8px;
    --pao-modal-max-height: 85vh;
    --pao-modal-transition: opacity 0.2s ease;
  }

  .pao-modal-overlay {
    position: fixed;
    inset: 0;
    background: var(--pao-modal-overlay-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 1;
    transition: var(--pao-modal-transition);
  }

  .pao-modal-panel {
    background: var(--pao-body-bg, #ffffff);
    border-radius: var(--pao-modal-border-radius);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-height: var(--pao-modal-max-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem;
    position: relative;
  }

  .pao-modal-panel.sm {
    max-width: 400px;
  }

  .pao-modal-panel.md {
    max-width: 600px;
  }

  .pao-modal-panel.lg {
    max-width: 800px;
  }

  .pao-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--pao-border-color, #dee2e6);
    flex-shrink: 0;
  }

  .pao-modal-title {
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--pao-body-color, #212529);
    margin: 0;
    line-height: 1.4;
  }

  .pao-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    color: var(--pao-gray-500, #adb5bd);
    transition: all 0.15s ease;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .pao-modal-close:hover {
    background: var(--pao-gray-100, #f8f9fa);
    color: var(--pao-body-color, #212529);
  }

  .pao-modal-close:focus-visible {
    outline: 2px solid var(--pao-color-primary);
    outline-offset: 2px;
  }

  .pao-modal-body {
    padding: 1.25rem;
    overflow-y: auto;
    flex: 1;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--pao-body-color, #212529);
  }

  /* Focus trap — visually hidden sentinel */
  .pao-modal-sentinel {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
