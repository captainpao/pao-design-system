import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: 'VerlagSSm', system-ui, -apple-system, sans-serif;
  }

  .pao-checkbox-group {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .pao-checkbox-group-legend {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--pao-gray-700);
    margin-bottom: 0.5rem;
    padding: 0;
  }

  .pao-checkbox-group-items {
    display: flex;
    gap: 0.75rem;
  }

  .pao-checkbox-group-items.vertical {
    flex-direction: column;
  }

  .pao-checkbox-group-items.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .pao-checkbox-group-error {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-color-danger);
    margin-top: 0.5rem;
  }

  .pao-checkbox-group-helper {
    display: block;
    font-size: 0.8125rem;
    color: var(--pao-gray-600);
    margin-top: 0.5rem;
  }
`;
