import '../../../../components/rm-input';
import '../../../../components/rm-button';
import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { commonStyles } from '../../../../styles/common';
import { cssBorder, cssBorderRadius, cssPadding, cssFlexFullAlign, cssFlexJustifyContent, size } from '../../../../styles/utils';
import { palette } from '../../../../styles/palette';
import { EFormFields, tagName } from './definitions';
import { customElement, state } from 'lit/decorators';
import { integerValidator } from '../../../../common/forms/validators';
import { isFormInvalid } from '../../../../common/forms/utils';
import { fontSize } from '../../../../styles/text';

@customElement(tagName)
export class GetRandomNumberForm extends LitElement {
  @state() protected isFormInvalid = true;

  protected formValues = {
    [EFormFields.FROM]: "1",
    [EFormFields.TO]: "10",
  };
  protected formValidation = {
    [EFormFields.FROM]: true,
    [EFormFields.TO]: true,
  };
  protected validators = [integerValidator];

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.checkValidation();
  }

  protected render(): TemplateResult {
    return html`
      <h3>Get a random number</h3>

      <div class="range-block">
        <div class="form-block">
          <div class="label">From</div>
          <rm-input
            .value=${this.formValues[EFormFields.FROM]}
            .name=${EFormFields.FROM}
            .onInput=${this.inputValueChanged}
            .validators=${this.validators}
            .onValidationChange=${this.validationChanged}
          ></rm-input>
        </div>
        <div class="form-block">
          <div class="label">To</div>
          <rm-input
            .value=${this.formValues[EFormFields.TO]}
            .onInput=${this.inputValueChanged}
            .validators=${this.validators}
            .onValidationChange=${this.validationChanged}
          ></rm-input>
        </div>
      </div>

      <div class="submit-block">
        <rm-button .disabled=${this.isFormInvalid}>Generate!</rm-button>
      </div>

      <div class="result">
        <div class="result-value">1251251</div>
      </div>
    `;
  }

  protected inputValueChanged = (field: EFormFields, value: string): void => {
    this.formValues[field] = value;
  };

  protected validationChanged = (field: EFormFields, validation: boolean): void => {
    this.formValidation[field] = validation;
    this.checkValidation();
  };

  protected checkValidation = (): void => {
    const formInvalid = isFormInvalid(this.formValidation);
    if (this.isFormInvalid !== formInvalid) {
      this.isFormInvalid = formInvalid;
    }
  };

  static styles = css`
    ${commonStyles}

    h3 {
      text-align: center;
    }

    .range-block,
    .submit-block {
      ${cssFlexJustifyContent()};
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

    .result {
      position: relative;
      height: ${size(4)};
      margin-top: ${size(2)};
      overflow: hidden;
      ${cssFlexFullAlign()};
      ${cssPadding(2)};
      ${cssBorder()};
      ${cssBorderRadius()};
      font-size: ${fontSize.huge};
    }

    .result-value {
      position: absolute;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GetRandomNumberForm;
  }
}
