import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
    font-family: var(--pao-font-family, sans-serif);
  }

  .pao-breadcrumb-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
  }

  ::slotted(*) {
    color: var(--pao-link-color, #0d6efd);
    text-decoration: none;
    font-size: 0.875rem;
  }

  ::slotted(*:last-child) {
    color: var(--pao-gray-600, #6c757d);
  }

  ::slotted(* + *)::before {
    content: var(--pao-breadcrumb-separator, '/');
    color: var(--pao-gray-400, #ced4da);
    margin-right: 0.5rem;
  }
`;
