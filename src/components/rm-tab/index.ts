import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators";
import { cssBorder, cssBorderRadius, cssPadding } from "../../styles/utils";
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
    .tab {
      ${cssPadding(1)};
      ${cssBorder()};
      ${cssBorderRadius()};
      cursor: pointer;
    }

    :host(.selected) .tab {
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmTab;
  }
}
