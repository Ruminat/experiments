
import "../../components/rm-textarea";
import "../../components/pages-navigation-menu";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { tagName } from "./definitions";
import { size } from "../../styles/utils";
import { palette } from "../../styles/palette";

@customElement(tagName)
export class PageExperimentJapanese extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2>Japanese language tools</h2>
          <div class="label">
            Type the Japanese you want to simplify and press Enter
            (e.g. 知識豊富な人は実は馬鹿だ)
          </div>
          <rm-textarea .placeholder="${"Put you Japanese text here"}"></rm-textarea>
        </div>
      </div>
    `;
  }


  static styles = css`
    ${commonStyles}
    ${pageStyles}

    .label {
      margin-bottom: ${size(1 / 2)};
      color: ${palette.gray80};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentJapanese;
  }
}
