import { LitElement, css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { TFormValidator } from "../../common/forms/definitions";
import { hasValidationError } from "../../common/forms/utils";
import { noop } from "../../lib/functions/utils";
import { queryExistingElement } from "../../lib/lit/utils";
import { palette } from "../../styles/palette";
import { fontSize } from "../../styles/text";
import { cssBorder, cssBorderRadius, cssClass, cssPadding, cssTransition, size } from "../../styles/utils";
import { tagName } from "./definitions";
import { delay } from "../../lib/delays/utils";
import { customElement } from "../../lib/lit/customElement";

export const rmInputClasses = {
  default: cssClass("default"),
  error: cssClass("danger"),
  success: cssClass("success"),
};

@customElement(tagName)
export class RmInput extends LitElement {
  @property({ type: String }) public value = "";
  @property({ type: String }) public name = "";
  @property({ type: String }) public placeholder = "";
  @property({ type: String }) public inputState = rmInputClasses.default.toString();
  @property({ type: Array }) public validators: TFormValidator[] = [];
  @property({ type: Boolean }) public disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSubmit: (name: any, value: string) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onInput: (name: any, value: string) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange: (name: any, value: string) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onKeyUp: (name: any, event: KeyboardEvent) => void = noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onValidationChange: (name: any, validation: boolean) => void = noop;

  @state() protected errorMessage = "";

  protected $input?: HTMLInputElement | null;

  render(): TemplateResult {
    return html`
      <form action="${this.submit}">
        <input
          class="rm-input ${this.inputState} ${this.errorMessage ? "error" : ""}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          ?disabled=${this.disabled}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @keyup=${this.handleOnKeyUp}
        >
        ${this.errorMessage ? html`<div class="error-message">${this.errorMessage}</div>` : null}
      </form>
    `;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    delay(0).then(() => {
      const $form = this.shadowRoot?.querySelector("form");
      if ($form) {
        $form.addEventListener("submit", this.submit);
      }
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    const $form = this.shadowRoot?.querySelector("form");
    if ($form) {
      $form.removeEventListener("submit", this.submit);
    }
  }

  private submit = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();

    this.onSubmit(this.name, this.getValue());
  };

  protected getValue = (): string => {
    if (this.$input) {
      return this.$input.value;
    } else {
      this.$input = queryExistingElement<HTMLInputElement>(this, "input");
      return this.$input.value ?? "";
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

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      ${cssPadding(0.8, 1)};
      ${cssBorder("2px", palette.gray10)};
      ${cssBorderRadius()};
      outline: none;
      font-family: var(--mainFont);

      transition: border-color 100ms, color 100ms, border-radius 100ms;
      resize: none;
    }
    input:focus {
      ${cssBorder("2px", palette.blue50)};
    }
    input:disabled {
      background: ${palette.gray01};
      cursor: not-allowed;
    }

    input.${rmInputClasses.success.css} { border-color: ${palette.green50}; }
    input.${rmInputClasses.success.css}:focus { border-color: ${palette.green100}; }

    input.${rmInputClasses.error.css} { border-color: ${palette.red50}; }
    input.${rmInputClasses.error.css}:focus { border-color: ${palette.red100}; }

    .error-message {
      font-size: ${fontSize.tiny};
      margin-top: ${size(0.5)};
      color: ${palette.red100};
    }

    input.rm-input.error {
      border-color: ${palette.red100};
    }
  `;
}

// declare global {
//   interface HTMLElementTagNameMap {
//     [tagName]: RmInput;
//   }
// }
