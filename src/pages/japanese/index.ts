
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import "../../components/pages-navigation-menu";
import "../../components/rm-button";
import "../../components/rm-empty-state";
import "./components/ProcessedJapaneseText";
import "../../components/rm-input";
import { isEnterOnly } from '../../common/keyboard/utils';
import { svgJapaneseExperiment } from "../../components/rm-icon/icons";
import { commonStyles, pageStyles } from '../../styles/common';
import { palette } from '../../styles/palette';
import { cssFlexFullAlign, cssSquare, size } from "../../styles/utils";
import { SimplificationController } from './controllers/Simplification';
import { EJapaneseFormFields, tagName } from "./definitions";

@customElement(tagName)
export class PageExperimentJapanese extends LitElement {
  private formValues = {
    [EJapaneseFormFields.INPUT]: "",
  };

  private simplification = new SimplificationController(this);

  protected render() {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2 class="page-header">
            <rm-icon class="header-icon" .icon=${svgJapaneseExperiment}></rm-icon>
            Japanese Language Tools
          </h2>
          ${this.renderInput()}

          <div class="delimiter"></div>

          ${this.renderContent()}
        </div>
      </div>
    `;
  }

  private renderInput = (): TemplateResult => {
    return html`
      <div class="input-bar">
        <rm-input
          class="japanese-input"
          .placeholder="${"Put you Japanese text here"}"
          .name=${EJapaneseFormFields.INPUT}
          .onInput=${this.inputValueChanged}
          .value=${this.formValues[EJapaneseFormFields.INPUT]}
          @keyup=${this.onKeyUp}
        ></rm-input>

        <rm-button
          @click=${this.submit}
          .isLoading=${this.simplification.isLoading}
        >
          Simplify
        </rm-button>
      </div>
    `;
  };

  private inputValueChanged = (field: EJapaneseFormFields, value: string): void => {
    this.formValues[field] = value;
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    if (isEnterOnly(event)) {
      this.submit();
    }
  };

  private submit = (): void => {
    const sentence = this.formValues[EJapaneseFormFields.INPUT];
    this.simplification.simplify(sentence);
  };

  private renderContent = (): TemplateResult => {
    if (!this.simplification.isLoading && !this.simplification.result) return this.renderEmptyState();
    return html`
      <processed-japanese-text
        .processedData=${this.simplification.result}
        .isLoading=${this.simplification.isLoading}
      ></processed-japanese-text>
    `;
  };

  private renderEmptyState = (): TemplateResult => {
    return html`
      <rm-empty-state>
        <div>Type the Japanese text you want to simplify in the input above and press <kbd>Enter</kbd></div>
        <div>(e.g. 知識豊富な人は実は馬鹿である)</div>
      </rm-empty-state>
    `;
  };

  static styles = css`
    ${commonStyles}
    ${pageStyles}

    .page-header {
      ${cssFlexFullAlign()};
    }

    .input-label {
      text-align: center;
      margin-bottom: ${size(1 / 2)};
    }

    .header-icon {
      ${cssSquare(6)};
      margin-right: ${size(1)};
    }

    .input-bar {
      ${cssFlexFullAlign()};
      margin: ${size(2)} 0;
    }

    .japanese-input {
      flex: 1;
      margin-right: ${size(1 / 2)};
    }

    .delimiter {
      margin-top: ${size(4)};
      margin-bottom: ${size(2)};
      border-top: 1px solid ${palette.gray10};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentJapanese;
  }
}

document.body.appendChild(document.createElement(tagName));
