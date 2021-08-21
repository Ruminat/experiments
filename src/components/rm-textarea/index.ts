import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { noop } from "../../common/functions/utils";
import { palette } from "../../styles/palette";
import { cssBorder, cssBorderRadius, cssClass, cssTransition, size } from "../../styles/utils";

export const rmTextareaClasses = {
  default: cssClass("default"),
  error: cssClass("danger"),
  success: cssClass("success"),
};

@customElement('rm-textarea')
export class RmTextarea extends LitElement {
  @property({ type: String }) public value = '';
  @property({ type: String }) public inputState = rmTextareaClasses.default.toString();
  @property({ type: Boolean }) public disabled = false;
  @property({ type: Boolean }) public spellcheck = false;
  @property({ type: Number }) public rows = 5;

  @property({ type: String }) public errorMessage?: string;

  public onInput: (event: InputEvent) => void = noop;
  public onChange: (event: InputEvent) => void = noop;

  render() {
    return html`
      <textarea
        class="rm-textarea ${this.inputState}"
        ?disabled=${this.disabled}
        spellcheck="${this.spellcheck}"
        rows=${this.rows}
        @input=${this.onInput}
        @change=${this.onChange}
      ></textarea>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    textarea.rm-textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: ${size(2)};
      font-family: var(--mainFont);
      ${cssBorder('2px', palette.gray10)};
      ${cssBorderRadius()};
      outline: none;

      ${cssTransition()};
      resize: none;
    }
    textarea.rm-textarea.${rmTextareaClasses.error.css} { border-color: ${palette.red50}; }
    textarea.rm-textarea.${rmTextareaClasses.success.css} { border-color: ${palette.green50}; }
    textarea.rm-textarea:disabled {
      background: ${palette.gray01};
      cursor: not-allowed;
    }

    textarea.rm-textarea:focus {
      ${cssBorder('2px', palette.blue50)};
    }
    textarea.rm-textarea.${rmTextareaClasses.error.css}:focus { border-color: ${palette.red100}; }
    textarea.rm-textarea.${rmTextareaClasses.success.css}:focus { border-color: ${palette.green100}; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'rm-textarea': RmTextarea;
  }
}
