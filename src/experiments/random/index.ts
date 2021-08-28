
import "./components/getRandomNumberForm";
import "../../components/pages-navigation-menu";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from '../../styles/common';
import { tagName } from "./definitions";
import { cssFlexFullAlign, size, cssSquare } from "../../styles/utils";
import { svgRandomExperiment } from "../../components/rm-icon/icons";

@customElement(tagName)
export class PageExperimentRandom extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2 class="page-header">
            <rm-icon class="header-icon" .icon=${svgRandomExperiment}></rm-icon>
            Random tools
          </h2>

          <get-random-number-form></get-random-number-form>
        </div>
      </div>
    `;
  }

  static styles = css`
    ${commonStyles}
    ${pageStyles}

    .page-header {
      ${cssFlexFullAlign()};
    }

    .header-icon {
      ${cssSquare(6)};
      margin-right: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentRandom;
  }
}
