import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .pao-button-group {
    display: inline-flex;
    position: relative;
  }

  .pao-button-group .group-button {
    margin: 0;
    position: relative;
    z-index: 1;
  }

  /* Remove border radius from middle buttons */
  .pao-button-group .group-button:not(.first):not(.last) pao-button {
    border-radius: 0;
  }

  /* First button styling */
  .pao-button-group .group-button.first:not(.last) pao-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Last button styling */
  .pao-button-group .group-button.last:not(.first) pao-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* Rounded corners option */
  .pao-button-group.rounded .group-button.first pao-button {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .pao-button-group.rounded .group-button.last pao-button {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  /* Remove spacing between buttons */
  .pao-button-group .group-button:not(.first) {
    margin-left: -1px;
  }

  /* Hover effects */
  .pao-button-group .group-button:hover {
    z-index: 2;
  }

  /* Active/selected state */
  .pao-button-group .group-button.active {
    z-index: 3;
  }

  /* Focus handling */
  .pao-button-group .group-button:focus-within {
    z-index: 4;
  }

  /* Ensure seamless borders for outline style */
  .pao-button-group .group-button pao-button::part(button) {
    border: 1px solid #d1d1d1;
  }

  .pao-button-group .group-button.active pao-button::part(button) {
    border-color: #0066cc;
  }

  /* Override button styles for better group appearance */
  .pao-button-group .group-button pao-button {
    --button-border-radius: 4px;
  }

  .pao-button-group.rounded .group-button pao-button {
    --button-border-radius: 20px;
  }
`;