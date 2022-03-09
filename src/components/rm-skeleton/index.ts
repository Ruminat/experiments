
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { colors } from "../../styles/palette";
import { cssBorderRadius, cssSize } from "../../styles/utils";
import { tagName } from "./definitions";

@customElement(tagName)
export class RmSkeleton extends LitElement {
  @property()
  public height: number | string = 2;

  @property()
  public width: number | string = "100%";

  protected render(): TemplateResult {
    const style = `
      height: ${cssSize(this.height)};
      width: ${cssSize(this.width)};
    `;

    return html`<div class="skeleton" style=${style}></div>`;
  }

  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      display: inline-block;
      background: linear-gradient(110deg, ${colors.skeleton.gradiend1} 8%, ${colors.skeleton.gradiend2} 18%, ${colors.skeleton.gradiend3} 33%);
      ${cssBorderRadius()};
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
    }

    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmSkeleton;
  }
}
