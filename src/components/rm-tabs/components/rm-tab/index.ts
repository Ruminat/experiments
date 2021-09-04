import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators";
import { palette } from "../../../../styles/palette";
import { cssBorder, cssPadding, cssTransition } from "../../../../styles/utils";
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
      ${cssPadding(1)};
      ${cssBorder("2px")};
      ${cssTransition("border-color")};
      cursor: pointer;
    }

    :host(.selected) {
      cursor: default;
      border-bottom-color: ${palette.blue100};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmTab;
  }
}
