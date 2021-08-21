import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { palette } from "../../styles/palette";
import { cssBorder, cssBorderRadius, cssClass, cssTransition, size } from "../../styles/utils";

export const rmButtonClasses = {
  default: cssClass("default"),
  danger: cssClass("danger"),
  success: cssClass("success"),
};

@customElement('rm-button')
export class RmButton extends LitElement {
  @property({ type: String }) public theme = rmButtonClasses.default.toString();
  @property({ type: Boolean }) public disabled = false;

  render() {
    return html`
      <button class="rm-button ${this.theme}" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    button.rm-button {
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

    button.rm-button.${rmButtonClasses.danger.css} { background: ${palette.red100}; }
    button.rm-button.${rmButtonClasses.danger.css}:hover { background: ${palette.red90}; }
    button.rm-button.${rmButtonClasses.danger.css}:active { background: ${palette.red80}; }
    button.rm-button.${rmButtonClasses.danger.css}:disabled { background: ${palette.red50}; }

    button.rm-button.${rmButtonClasses.success.css} { background: ${palette.green100}; }
    button.rm-button.${rmButtonClasses.success.css}:hover { background: ${palette.green90}; }
    button.rm-button.${rmButtonClasses.success.css}:active { background: ${palette.green80}; }
    button.rm-button.${rmButtonClasses.success.css}:disabled { background: ${palette.green50}; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "rm-button": RmButton;
  }
}
