import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    border-radius: 8px;
    border: 1px solid var(--pao-border-color);
    background-color: var(--pao-body-bg);
    overflow: hidden;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  :host([shadow]) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .pao-card-header {
    border-bottom: 1px solid var(--pao-border-color);
    font-weight: 600;
    font-size: 1rem;
    color: var(--pao-body-color);
  }

  .pao-card-header.hidden {
    display: none;
  }

  .pao-card-header.padded {
    padding: 1rem 1.25rem;
  }

  .pao-card-body {
    color: var(--pao-body-color);
    font-size: 0.9375rem;
  }

  .pao-card-body.padded {
    padding: 1rem 1.25rem;
  }

  .pao-card-footer {
    border-top: 1px solid var(--pao-border-color);
    background-color: var(--pao-gray-50);
  }

  .pao-card-footer.hidden {
    display: none;
  }

  .pao-card-footer.padded {
    padding: 0.75rem 1.25rem;
  }
`;
