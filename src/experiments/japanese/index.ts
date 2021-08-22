
import "../../components/rm-textarea";
import "../../components/pages-navigation-menu";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { tagName } from "./definitions";
import { flexFullAlign, size, square } from "../../styles/utils";
import { palette } from "../../styles/palette";
import { svgJapaneseExperiment } from "../../components/rm-icon/icons";

@customElement(tagName)
export class PageExperimentJapanese extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2 class="page-header">
            <rm-icon class="header-icon" .icon=${svgJapaneseExperiment}></rm-icon>
            Japanese language tools
          </h2>
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

    .page-header {
      ${flexFullAlign()};
    }

    .header-icon {
      ${square(6)};
      margin-right: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentJapanese;
  }
}
