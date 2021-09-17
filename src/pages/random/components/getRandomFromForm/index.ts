
import "../../../../components/rm-textarea";
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
import { requiredValidator } from '../../../../common/forms/validators';
import { isFormInvalid } from '../../../../common/forms/utils';
import { fontSize } from '../../../../styles/text';
import { randomFrom } from '../../../../lib/random/utils';
import { addToElement, queryExistingElement } from '../../../../lib/lit/utils';
import { range } from '../../../../lib/generators/utils';
import { isCtrlEnter } from '../../../../common/keyboard/utils';
import { animate } from '../../../../common/animation/utils';

@customElement(tagName)
export class GetRandomFromForm extends LitElement {
  @state() protected isLoading = false;
  @state() protected isFormInvalid = true;

  protected formValues = {
    [EFormFields.VALUES]: "Fool, King, Babe, Coco",
  };
  protected formValidation = {
    [EFormFields.VALUES]: true,
  };
  protected validators = [requiredValidator];

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.checkValidation();
  }

  protected render(): TemplateResult {
    return html`
      <div class="range-block">
        <div class="form-block">
          <div class="label">The fools</div>
          <rm-textarea
            .value=${this.formValues[EFormFields.VALUES]}
            .name=${EFormFields.VALUES}
            .onInput=${this.inputValueChanged}
            .validators=${this.validators}
            .onKeyUp=${this.inputKeyUp}
            .onValidationChange=${this.validationChanged}
            .placeholder=${"The idiots (e.g. «Fool, King, Babe, Coco»)"}
          ></rm-textarea>
        </div>
      </div>

      <div class="submit-block">
        <rm-button .disabled=${this.isFormInvalid} ?isLoading=${this.isLoading} @click=${this.rollTheNumbers}>
          Generate!
        </rm-button>
      </div>

      <div class="${classNames.RESULT_WRAPPER}">
        <div class="${classNames.RESULT}"></div>
      </div>
    `;
  }

  protected inputValueChanged = (field: EFormFields, value: string): void => {
    console.log("N?", field, value);
    this.formValues[field] = value;
  };

  protected inputKeyUp = (field: EFormFields, event: KeyboardEvent): void => {
    if (isCtrlEnter(event) && [EFormFields.VALUES].includes(field)) {
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

    const values = this.formValues[EFormFields.VALUES].split(",").map((value) => value.trim());
    const elementsCount = 10;
    const minDuration = 10;
    const maxDuration = 150;

    const $result = queryExistingElement(this, cls(classNames.RESULT));
    $result.innerHTML = "";
    const $element = addToElement($result, `div.${classNames.RESULT_VALUE}`);
    let duration: number;

    for (const i of range(1, elementsCount)) {
      $element.innerText = `${randomFrom(values)}`;
      duration = minDuration + (maxDuration - minDuration) * (i / elementsCount);
      await this.animateValue($element, { duration, top: -$element.clientHeight, bottom: $result.clientHeight });
    }

    const resultValue = randomFrom(values);
    $element.innerText = `${resultValue}`;
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
        const newPosition = top + time * dt * distance;
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

    .form-block {
      width: 100%;
    }

    rm-textarea {
      width: 100%;
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
      .form-block {
        width: ${100 - index * 10}%;
      }

      ${cssCls(classNames.RESULT)} {
        width: ${100 - index * 15}%;
      }
    `)}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GetRandomFromForm;
  }
}
