
import "../rm-icon";import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { palette } from "../../styles/palette";
import { cssFlexFullAlign, cssSquare } from "../../styles/utils";
import { tagName } from "./definitions";
import { svgLoading } from "../rm-icon/icons";

@customElement(tagName)
export class RmInput extends LitElement {
  @property({ type: Number }) public size = 2;
  @property({ type: Object }) public color = palette.white;

  render(): TemplateResult {
    return html`
      <rm-icon .icon=${svgLoading} style="fill: ${this.color};"></rm-icon>
    `;
  }

  static styles = css`
    :host {
      ${cssFlexFullAlign("inline-flex")};
      ${cssSquare(2)};
    }

    rm-icon {
      ${cssSquare("100%")};
      animation-name: circleAround;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      transform-origin: center center;
      animation-timing-function: linear;
    }

    @keyframes circleAround {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmInput;
  }
}
