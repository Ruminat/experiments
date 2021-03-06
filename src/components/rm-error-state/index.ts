
import { css, html, LitElement, TemplateResult } from "lit";
import { tagName } from "./definitions";
import { cssBorderRadius, cssFlexFullAlign, size } from "../../styles/utils";
import { palette } from "../../styles/palette";
import { customElement } from "../../lib/lit/customElement";

@customElement(tagName)
export class RmErrorState extends LitElement {
  protected render(): TemplateResult {
    return html`
      <div class="error-state">
        <div class="error-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .error-state {
      ${cssFlexFullAlign("flex")};
      padding: ${size(4)};
      ${cssBorderRadius()};

      text-align: center;
      color: ${palette.red90};
      background: ${palette.red10};

      cursor: default;
    }
  `;
}
