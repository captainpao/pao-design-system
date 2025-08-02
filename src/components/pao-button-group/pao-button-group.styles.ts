import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .pao-button-group {
    display: inline-flex;
    position: relative;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    overflow: hidden;
  }

  .pao-button-group .group-button {
    margin: 0;
    position: relative;
    z-index: 1;
  }

  /* Override button border radius using CSS variables */
  .pao-button-group .group-button pao-button::part(button) {
    border-radius: 0;
  }

  /* First button - only left corners rounded */
  .pao-button-group .group-button.first:not(.last) pao-button::part(button) {
    border-radius: 4px 0 0 4px;
  }

  /* Last button - only right corners rounded */
  .pao-button-group .group-button.last:not(.first) pao-button::part(button) {
    border-radius: 0 4px 4px 0;
  }

  /* Single button case */
  .pao-button-group .group-button.first.last pao-button::part(button) {
    border-radius: 4px;
  }

  /* Middle buttons - ensure zero radius */
  .pao-button-group .group-button:not(.first):not(.last) pao-button::part(button) {
    border-radius: 0;
  }

  /* Rounded corners option - larger radius */
  .pao-button-group.rounded .group-button.first:not(.last) pao-button::part(button) {
    border-radius: 20px 0 0 20px;
  }

  .pao-button-group.rounded .group-button.last:not(.first) pao-button::part(button) {
    border-radius: 0 20px 20px 0;
  }

  .pao-button-group.rounded .group-button.first.last pao-button::part(button) {
    border-radius: 20px;
  }

  /* Remove spacing between buttons */
  .pao-button-group .group-button:not(.first) {
    margin-left: 0;
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

  /* Remove individual button borders since container has border */
  .pao-button-group .group-button pao-button::part(button) {
    border: none;
  }

  /* Add separator between buttons */
  .pao-button-group .group-button:not(.first) {
    border-left: 1px solid #d1d1d1;
  }

  /* Active state styling */
  .pao-button-group .group-button.active pao-button::part(button) {
    background-color: #0066cc;
    color: white;
  }

`;