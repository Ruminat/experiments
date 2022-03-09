
import "../rm-icon";import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { palette } from "../../styles/palette";
import { cssFlexFullAlign, cssSquare, size } from "../../styles/utils";
import { tagName } from "./definitions";

@customElement(tagName)
export class RmLoadingElement extends LitElement {
  @property({ type: Number }) public size = 2;
  @property({ type: Object }) public color = palette.white;

  render(): TemplateResult {
    const style = `
      ${cssSquare(this.size)};
      border: ${this.border(palette.green10)};
      border-top: ${this.border(palette.blue30)};
      border-bottom: ${this.border(palette.red30)};
    `;

    return html`<div class="loader" style=${style}></div>`;
  }

  private border = (color: CSSResultGroup): string => {
    return `${size(this.size / 8)} solid ${color}`;
  };

  static styles = css`
    :host {
      ${cssFlexFullAlign("inline-flex")};
    }

    .loader {
      box-sizing: border-box;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmLoadingElement;
  }
}
