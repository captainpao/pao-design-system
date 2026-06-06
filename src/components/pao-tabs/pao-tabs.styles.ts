import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-tabs-wrapper {
    display: flex;
    flex-direction: column;
  }

  .pao-tabs-wrapper.vertical {
    flex-direction: row;
  }

  .pao-tabs-list.line {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid var(--pao-gray-200);
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line {
    flex-direction: column;
    border-bottom: none;
    border-right: 2px solid var(--pao-gray-200);
  }

  .pao-tabs-list.line .pao-tab-trigger {
    padding: 0.75rem 1.25rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-gray-600);
    transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    white-space: nowrap;
  }

  .pao-tabs-list.line .pao-tab-trigger:hover:not([disabled]) {
    color: var(--pao-color-primary);
    background-color: var(--pao-gray-50);
  }

  .pao-tabs-list.line .pao-tab-trigger.active {
    color: var(--pao-color-primary);
    border-bottom-color: var(--pao-color-primary);
    font-weight: 600;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line .pao-tab-trigger {
    border-bottom: none;
    border-right: 2px solid transparent;
    margin-bottom: 0;
    margin-right: -2px;
    text-align: left;
    width: 100%;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-list.line .pao-tab-trigger.active {
    border-right-color: var(--pao-color-primary);
  }

  .pao-tabs-list.pill {
    display: flex;
    flex-direction: row;
    background-color: var(--pao-gray-100);
    border-radius: 50px;
    padding: 4px;
    gap: 4px;
    align-self: flex-start;
  }

  .pao-tabs-list.pill .pao-tab-trigger {
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 50px;
    background: transparent;
    cursor: pointer;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
    font-size: 0.9375rem;
    color: var(--pao-gray-600);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .pao-tabs-list.pill .pao-tab-trigger.active {
    background-color: var(--pao-body-bg);
    color: var(--pao-color-primary);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .pao-tab-trigger[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pao-tabs-content {
    flex: 1;
    padding-top: 1rem;
  }

  .pao-tabs-wrapper.vertical .pao-tabs-content {
    padding-top: 0;
    padding-left: 1.25rem;
  }
`;
