import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { palette } from "../../../../styles/palette";
import { cssBorder, cssPadding } from "../../../../styles/utils";
import { tagName } from "./definitions";

@customElement(tagName)
export class RmTab extends LitElement {
  render(): TemplateResult {
    return html`
      <div class="tab">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      ${cssPadding(0.8, 1.2)};
      ${cssBorder("2px")};
      transition: border-color 100ms, color 100ms;
      color: ${palette.gray70};
      cursor: pointer;
    }

    :host(:hover) {
      color: ${palette.gray80};
      border-bottom-color: ${palette.blue50};
    }

    :host(.selected) {
      cursor: default;
      color: ${palette.gray100};
      border-bottom-color: ${palette.blue100};
    }

    .tab {
      white-space: nowrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmTab;
  }
}
