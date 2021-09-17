import '../../../../components/rm-input';
import '../../../../components/rm-button';
import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { commonStyles } from '../../../../styles/common';
import {
  cssBorder,
  cssBorderRadius,
  cssPadding,
  cssFlexFullAlign,
  cssFlexJustifyContent,
  size,
  cssCls,
  cls,
  cssMedia,
} from '../../../../styles/utils';
import { palette } from '../../../../styles/palette';
import { classNames, EFormFields, tagName } from './definitions';
import { customElement, state } from 'lit/decorators';
import { integerValidator } from '../../../../common/forms/validators';
import { isFormInvalid } from '../../../../common/forms/utils';
import { fontSize } from '../../../../styles/text';
import { randomFrom } from '../../../../lib/random/utils';
import { addToElement, queryExistingElement } from '../../../../lib/lit/utils';
import { range } from '../../../../lib/generators/utils';
import { isEnterOnly } from '../../../../common/keyboard/utils';
import { animate } from '../../../../common/animation/utils';

@customElement(tagName)
export class GetRandomNumberForm extends LitElement {
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
        </div>
      </div>

      <div class="submit-block">
        <rm-button .disabled=${this.isFormInvalid} ?isLoading=${this.isLoading} @click=${this.rollTheNumbers}>
          Get the answer!
        </rm-button>
      </div>

      <div class="${classNames.RESULT_WRAPPER}">
        <div class="${classNames.RESULT}"></div>
      </div>
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

    const elementsCount = 10;
    const minDuration = 10;
    const maxDuration = 150;

    const $result = queryExistingElement(this, cls(classNames.RESULT));
    $result.innerHTML = "";
    const $element = addToElement($result, `div.${classNames.RESULT_VALUE}`);
    let duration: number;

    for (const i of range(1, elementsCount)) {
      $element.innerText = randomFrom(["Yes", "No"]);
      duration = minDuration + (maxDuration - minDuration) * (i / elementsCount);
      await this.animateValue($element, { duration, top: -$element.clientHeight, bottom: $result.clientHeight });
    }

    $element.innerText = randomFrom(["Yes", "No"]);
    await this.animateValue($element, {
      duration: maxDuration,
      top: -$element.clientHeight,
      bottom: 0.5 * $result.clientHeight - 0.5 * $element.clientHeight
    });

    this.isLoading = false;
  };

  protected animateValue = async (
    $element: HTMLElement,
    { duration, top, bottom }: { duration: number; top: number; bottom: number }
  ): Promise<void> => {
    const distance = Math.abs(top - bottom);
    await animate(
      (time, dt) => {
        const newPosition = top + (time * dt * distance);
        $element.style.top = `${newPosition}px`;
      },
      { duration }
    );
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

    ${cssCls(classNames.RESULT_WRAPPER)} {
      ${cssFlexFullAlign()};
    }

    ${cssCls(classNames.RESULT)} {
      position: relative;
      width: 100%;
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

    ${cssMedia((index) => css`
      ${cssCls(classNames.RESULT)} {
        width: ${100 - index * 15}%;
      }
    `)}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GetRandomNumberForm;
  }
}
