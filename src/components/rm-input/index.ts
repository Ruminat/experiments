import { LitElement, css, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { noop } from "../../lib/functions/utils";
import { palette } from "../../styles/palette";
import { cssBorder, cssBorderRadius, cssClass, cssPadding, cssTransition } from "../../styles/utils";
import { tagName } from "./definitions";

export const rmInputClasses = {
  default: cssClass("default"),
  error: cssClass("danger"),
  success: cssClass("success"),
};

@customElement(tagName)
export class RmInput extends LitElement {
  @property({ type: String }) public value = "";
  @property({ type: String }) public placeholder = "";
  @property({ type: String }) public inputState = rmInputClasses.default.toString();
  @property({ type: Boolean }) public disabled = false;

  @property({ type: String }) public errorMessage?: string;

  public onInput: (event: InputEvent) => void = noop;
  public onChange: (event: InputEvent) => void = noop;

  render(): TemplateResult {
    return html`
      <input
        class="rm-input ${this.inputState}"
        placeholder="${this.placeholder}"
        value="${this.value}"
        ?disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange}
      >
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      ${cssPadding(0.5, 1)};
      ${cssBorder("2px", palette.gray10)};
      ${cssBorderRadius()};
      outline: none;
      font-family: var(--mainFont);

      ${cssTransition()};
      resize: none;
    }
    input.${rmInputClasses.error.css} { border-color: ${palette.red50}; }
    input.${rmInputClasses.success.css} { border-color: ${palette.green50}; }
    input:disabled {
      background: ${palette.gray01};
      cursor: not-allowed;
    }

    input:focus {
      ${cssBorder("2px", palette.blue50)};
    }
    input.${rmInputClasses.error.css}:focus { border-color: ${palette.red100}; }
    input.${rmInputClasses.success.css}:focus { border-color: ${palette.green100}; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmInput;
  }
}
