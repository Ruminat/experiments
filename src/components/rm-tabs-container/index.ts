import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { cssFlexFullAlign } from "../../styles/utils";
import { tagName } from "./definitions";

@customElement(tagName)
export class RmTabsContainer extends LitElement {
  @property() public selected?: string;

  render(): TemplateResult {
    return html`
      <div class="tabs">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .tabs {
      ${cssFlexFullAlign()};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmTabsContainer;
  }
}
