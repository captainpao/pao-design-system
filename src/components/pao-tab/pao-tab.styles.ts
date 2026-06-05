import { css } from 'lit';
import '../../styles/_fonts.scss';
import '../../styles/index.scss';

export const styles = css`
  :host {
    display: block;
  }

  .pao-tab-panel {
    outline: none;
  }

  .pao-tab-panel[hidden] {
    display: none;
  }
`;
