
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import "../../components/rm-page";
import "../../components/rm-button";
import "../../components/rm-empty-state";
import "./components/ProcessedJapaneseText";
import "../../components/rm-input";
import { svgJapaneseExperiment, svgGithub } from "../../components/rm-icon/icons";
import { commonStyles } from '../../styles/common';
import { palette } from '../../styles/palette';
import { cssFlexFullAlign, cssSquare, size } from "../../styles/utils";
import { SimplificationController } from './controllers/Simplification';
import { EJapaneseFormFields, tagName, defaultFormValues } from "./definitions";

@customElement(tagName)
export class PageExperimentJapanese extends LitElement {
  private formValues = defaultFormValues;

  private simplification = new SimplificationController(this);

  protected render(): TemplateResult {
    return html`
      <rm-page>
        ${this.renderInfo()}

        <div class="delimiter"></div>

        <h2 class="page-header">
          <rm-icon class="header-icon" .icon=${svgJapaneseExperiment}></rm-icon>
          Japanese Language Tools
        </h2>
        ${this.renderInput()}

        <div class="delimiter"></div>

        ${this.renderContent()}
      </rm-page>
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
          .onSubmit=${this.submit}
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

  private renderInfo = (): TemplateResult => {
    return html`
      <div class="info-block">
        <div class="info-block-header">Links to check out</div>
        <div class="resources-links">
          ${this.renderGitHubLink("Server", "https://github.com/Ruminat/Japanese-simplification")}
          ${this.renderGitHubLink("Web App", "https://github.com/Ruminat/experiments")}
          ${this.renderGitHubLink("Read the paper", "https://github.com/Ruminat/master-thesis")}
        </div>
      </div>
    `;
  };

  private renderGitHubLink = (title: string, url: string): TemplateResult => {
    return html`
      <a class="resource-link" href="${url}" target="_blank">
        <rm-icon class="resource-icon" .icon=${svgGithub}></rm-icon>
        <span>${title}</span>
      </a>
    `;
  };

  private inputValueChanged = (field: EJapaneseFormFields, value: string): void => {
    this.formValues[field] = value;
  };

  private submit = (): void => {
    const sentence = this.formValues[EJapaneseFormFields.INPUT];
    this.simplification.simplify(sentence);
  };

  private renderContent = (): TemplateResult => {
    return html`
      <processed-japanese-text
        .processedData=${this.simplification.result}
        .error=${this.simplification.error}
        .isLoading=${this.simplification.isLoading}
      ></processed-japanese-text>
    `;
  };

  static styles = css`
    ${commonStyles}

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

    .info-block {
      ${cssFlexFullAlign()};
      flex-direction: column;
    }

    .info-block-header {
      color: ${palette.gray50};
      text-align: center;
      margin-bottom: ${size(1)};
    }

    .resource-icon {
      margin-right: ${size(1)};
    }

    .resources-links {
      display: flex;
      gap: ${size(4)};
    }

    .resource-link {
      ${cssFlexFullAlign()};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentJapanese;
  }
}

document.body.appendChild(document.createElement(tagName));
