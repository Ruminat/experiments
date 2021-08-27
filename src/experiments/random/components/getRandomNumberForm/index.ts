
import "../../../../components/rm-input";
import "../../../../components/rm-button";
import { css, html, LitElement, TemplateResult } from "lit";
import { commonStyles } from "../../../../styles/common";
import { flexJustifyContent, size } from "../../../../styles/utils";
import { palette } from "../../../../styles/palette";
import { tagName } from "./definitions";
import { customElement, state } from "lit/decorators";

@customElement(tagName)
export class GetRandomNumberForm extends LitElement {
  @state() protected fromValue = "1";
  @state() protected toValue = "10";

  protected render(): TemplateResult {
    return html`
      <h3>Get a random number</h3>

      <div class="range-block">
        <div class="form-block">
          <div class="label">From</div>
          <rm-input .value=${this.fromValue} .onInput=${this.updateFromValue}></rm-input>
        </div>
        <div class="form-block">
          <div class="label">To</div>
          <rm-input .value=${this.toValue} .onInput=${this.updateToValue}></rm-input>
        </div>
      </div>

      <div class="submit-block">
        <rm-button>Generate!</rm-button>
      </div>
    `;
  }

  protected updateFromValue = () => {
    console.log(event);
  };

  static styles = css`
    ${commonStyles}

    h3 {
      text-align: center;
    }

    .range-block, .submit-block {
      ${flexJustifyContent()};
    }

    .range-block {
      margin-bottom: ${size(2)};
    }

    .range-block > .form-block + .form-block {
      margin-left: ${size(2)};
    }

    .label {
      margin-bottom: ${size(1 / 2)};
      color: ${palette.gray80};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GetRandomNumberForm;
  }
}
