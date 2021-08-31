
import "../rm-loading-circle";import { LitElement, css, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { palette } from "../../styles/palette";
import { cssBorder, cssBorderRadius, cssClass, cssSquare, cssTransition, size } from "../../styles/utils";
import { tagName } from "./definitions";

export const rmButtonThemes = {
  default: cssClass("default"),
  danger: cssClass("danger"),
  success: cssClass("success"),
};

@customElement(tagName)
export class RmButton extends LitElement {
  @property({ type: String }) public theme = rmButtonThemes.default.toString();
  @property({ type: Boolean }) public isLoading = false;
  @property({ type: Boolean }) public disabled = false;

  render(): TemplateResult {
    const loading = this.isLoading
      ? html`
          <div class="loading">
            <rm-loading-circle></rm-loading-circle>
          </div>
        `
      : null;

    return html`
      <button class="rm-button ${this.theme}" ?disabled=${this.disabled || this.isLoading}>
        <span class="slot-content">
          <slot></slot>
        </span>
        ${loading}
      </button>
    `;
  }

  static styles = css`
    button.rm-button {
      position: relative;
      padding: ${size(1)};
      background: ${palette.blue100};
      color: ${palette.white};
      ${cssBorder()};
      ${cssBorderRadius()};

      ${cssTransition('background')};
      cursor: pointer;
    }

    button.rm-button:hover {
      background: ${palette.blue90};
    }

    button.rm-button:active {
      background: ${palette.blue80};
    }

    button.rm-button:disabled {
      background: ${palette.blue50};
      cursor: not-allowed;
    }

    button.rm-button.${rmButtonThemes.danger.css} { background: ${palette.red100}; }
    button.rm-button.${rmButtonThemes.danger.css}:hover { background: ${palette.red90}; }
    button.rm-button.${rmButtonThemes.danger.css}:active { background: ${palette.red80}; }
    button.rm-button.${rmButtonThemes.danger.css}:disabled { background: ${palette.red50}; }

    button.rm-button.${rmButtonThemes.success.css} { background: ${palette.green100}; }
    button.rm-button.${rmButtonThemes.success.css}:hover { background: ${palette.green90}; }
    button.rm-button.${rmButtonThemes.success.css}:active { background: ${palette.green80}; }
    button.rm-button.${rmButtonThemes.success.css}:disabled { background: ${palette.green50}; }

    rm-loading-circle {
      ${cssSquare(2)};
    }

    .loading {
      position: absolute;
      top: calc(50% - ${size(1)});
      left: calc(50% - ${size(1)});
    }

    :host([isLoading]) .slot-content {
      opacity: 0 !important;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmButton;
  }
}
