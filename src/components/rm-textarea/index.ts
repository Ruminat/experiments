import { LitElement, css, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { TFormValidator } from "../../common/forms/definitions";
import { hasValidationError } from "../../common/forms/utils";
import { noop } from "../../lib/functions/utils";
import { queryExistingElement } from "../../lib/lit/utils";
import { palette } from "../../styles/palette";
import { cssBorder, cssBorderRadius, cssClass, cssTransition, size } from "../../styles/utils";
import { tagName } from "./definitions";

export const rmTextareaClasses = {
  default: cssClass("default"),
  error: cssClass("danger"),
  success: cssClass("success"),
};

@customElement(tagName)
export class RmTextarea extends LitElement {
  @property({ type: String }) public value = "";
  @property({ type: String }) public name = "";
  @property({ type: String }) public placeholder = "";
  @property({ type: String }) public inputState = rmTextareaClasses.default.toString();
  @property({ type: Array }) public validators: TFormValidator[] = [];
  @property({ type: Boolean }) public disabled = false;
  @property({ type: Boolean }) public spellcheck = false;
  @property({ type: Number }) public rows = 5;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onInput: (name: any, value: string) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange: (name: any, value: string) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onKeyUp: (name: any, event: KeyboardEvent) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onValidationChange: (name: any, validation: boolean) => void = noop;

  @state() protected errorMessage = "";

  protected $textarea?: HTMLInputElement | null;

  render(): TemplateResult {
    return html`
      <textarea
        class="rm-textarea ${this.inputState} ${this.errorMessage ? "error" : ""}"
        placeholder="${this.placeholder}"
        ?disabled=${this.disabled}
        spellcheck="${this.spellcheck}"
        rows=${this.rows}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @keyup=${this.handleOnKeyUp}
      >${this.value}</textarea>
    `;
  }

  protected getValue = (): string => {
    if (this.$textarea) {
      return this.$textarea.value;
    } else {
      this.$textarea = queryExistingElement<HTMLInputElement>(this, "textarea");
      console.log(this.$textarea);
      return this.$textarea.value ?? "";
    }
  };

  protected handleInput = (): void => {
    this.onInput(this.name, this.getValue());
    this.validate();
  };

  protected handleChange = (): void => {
    this.onChange(this.name, this.getValue());
  }

  protected handleOnKeyUp = (event: KeyboardEvent): void => {
    this.onKeyUp(this.name, event);
  };

  protected validate = (): void => {
    const value = this.getValue();
    for (const validator of this.validators) {
      const validationResult = validator(value);
      if (hasValidationError(validationResult)) {
        this.errorMessage = validationResult.message;
        this.onValidationChange(this.name, false);
        return;
      }
    }

    this.onValidationChange(this.name, true);
    if (this.errorMessage !== "") this.errorMessage = "";
  };

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
    [tagName]: RmTextarea;
  }
}
