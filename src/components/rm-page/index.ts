
import { css, html, LitElement, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from '../../styles/common';
import { size, cssMedia, cssPadding } from "../../styles/utils";
import { tagName } from "./definitions";
import "../pages-navigation-menu";

@customElement(tagName)
export class RmPage extends LitElement {
  protected render() {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>
        <div class="page-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    ${commonStyles}

    .page-content {
      padding: ${size(2)};
    }

    ${cssMedia(pageMediaStyles)}
  `;
}

function pageMediaStyles (index: number): CSSResultGroup {
  return css`
    .page-content {
      ${cssPadding(2, `${5 * index}%`)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmPage;
  }
}
