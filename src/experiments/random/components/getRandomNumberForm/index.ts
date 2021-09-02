import '../../../../components/rm-input';
import '../../../../components/rm-button';
import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { commonStyles } from '../../../../styles/common';
import { cssBorder, cssBorderRadius, cssPadding, cssFlexFullAlign, cssFlexJustifyContent, size, cssCls, cls } from '../../../../styles/utils';
import { palette } from '../../../../styles/palette';
import { classNames, EFormFields, tagName } from './definitions';
import { customElement, state } from 'lit/decorators';
import { integerValidator } from '../../../../common/forms/validators';
import { isFormInvalid } from '../../../../common/forms/utils';
import { fontSize } from '../../../../styles/text';
import { randomInt } from '../../../../lib/random/utils';
import { addToElement, queryExistingElement } from '../../../../lib/lit/utils';
import { range } from '../../../../lib/generators/utils';
import { isEnterOnly } from '../../../../common/keyboard/utils';
import { animate } from '../../../../common/animation/utils';

@customElement(tagName)
export class GetRandomNumberForm extends LitElement {
  @state() protected result?: number;
  @state() protected isLoading = false;
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
      <div class="range-block">
        <div class="form-block">
          <div class="label">From</div>
          <rm-input
            .value=${this.formValues[EFormFields.FROM]}
            .name=${EFormFields.FROM}
            .onInput=${this.inputValueChanged}
            .validators=${this.validators}
            .onKeyUp=${this.inputKeyUp}
            .onValidationChange=${this.validationChanged}
          ></rm-input>
        </div>
        <div class="form-block">
          <div class="label">To</div>
          <rm-input
            .value=${this.formValues[EFormFields.TO]}
            .name=${EFormFields.TO}
            .onInput=${this.inputValueChanged}
            .validators=${this.validators}
            .onKeyUp=${this.inputKeyUp}
            .onValidationChange=${this.validationChanged}
          ></rm-input>
        </div>
      </div>

      <div class="submit-block">
        <rm-button .disabled=${this.isFormInvalid} ?isLoading=${this.isLoading} @click=${this.rollTheNumbers}>
          Generate!
        </rm-button>
      </div>

      <div class="${classNames.RESULT}"></div>
    `;
  }

  protected inputValueChanged = (field: EFormFields, value: string): void => {
    this.formValues[field] = value;
  };

  protected inputKeyUp = (field: EFormFields, event: KeyboardEvent): void => {
    if (isEnterOnly(event) && [EFormFields.FROM, EFormFields.TO].includes(field)) {
      if (!this.isFormInvalid && !this.isLoading) {
        this.rollTheNumbers();
      }
    }
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

  protected rollTheNumbers = async (): Promise<void> => {
    this.isLoading = true;
    this.result = undefined;

    const from = Number(this.formValues[EFormFields.FROM]);
    const to = Number(this.formValues[EFormFields.TO]);
    const elementsCount = 10;
    const minDuration = 10;
    const maxDuration = 150;

    const $result = queryExistingElement(this, cls(classNames.RESULT));
    $result.innerHTML = "";
    let duration: number;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of range(1, elementsCount)) {
      const $element = addToElement($result, `div${cls(classNames.RESULT_VALUE)}`);
      $element.innerText = `${randomInt(from, to)}`;
      duration = minDuration + (maxDuration - minDuration) * (i / elementsCount);
      await this.animateValue($element, { duration });
      $element.remove();
    }

    const $element = addToElement($result, `div${cls(classNames.RESULT_VALUE)}`);
    const resultValue = randomInt(from, to);
    $element.innerText = `${resultValue}`;
    await this.animateValue($element, { duration: 1.5 * maxDuration, bottom: 15 });

    this.result = resultValue;
    this.isLoading = false;
  };

  protected animateValue = async ($element: HTMLElement, { duration = 1000, top = -42, bottom = 72 } = {}): Promise<void> => {
    const distance = Math.abs(top - bottom);
    await animate((time, frequency) => {
      const newPosition = top + ((frequency * time) * distance);
      $element.style.top = `${newPosition}px`;
    }, { duration });
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

    ${cssCls(classNames.RESULT)} {
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

    ${cssCls(classNames.RESULT_VALUE)} {
      position: absolute;
      top: -1000px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GetRandomNumberForm;
  }
}
