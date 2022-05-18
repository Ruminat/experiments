
import "../../components/rm-textarea";import "../../components/pages-navigation-menu";
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
// import * as monaco from 'monaco-editor';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from '../../styles/common';
import { tagName } from "./definitions";
import { cssFlexFullAlign, size, cssSquare } from "../../styles/utils";
import { palette } from "../../styles/palette";

@customElement(tagName)
export class PageExperimentCalq extends LitElement {
  render(): TemplateResult {
    // console.log("N?", monaco);
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2 class="page-header">Reactive calculator</h2>
          <p>Hey there</p>
          <rm-textarea></rm-textarea>
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
    [tagName]: PageExperimentCalq;
  }
}

document.body.appendChild(document.createElement(tagName));
