import { css, html, LitElement, TemplateResult } from "lit";
import { RmButton } from "../../../../components/rm-button";
import { RmIcon } from "../../../../components/rm-icon";
import {
  svgGithub,
  svgJapaneseExperiment,
} from "../../../../components/rm-icon/icons";
import { RmInput } from "../../../../components/rm-input";
import { RmPage } from "../../../../components/rm-page";
import { customElement } from "../../../../lib/lit/customElement";
import { preHTML } from "../../../../lib/lit/preHTML";
import { commonStyles } from "../../../../styles/common";
import { colors, palette } from "../../../../styles/palette";
import { cssFlexFullAlign, cssSquare, size } from "../../../../styles/utils";
import { ProcessedJapaneseText } from "../../components/ProcessedJapaneseText";
import { SimplificationController } from "../../controllers/Simplification";
import { defaultFormValues, EJapaneseFormFields, tagName } from "./definitions";
// import AES from "crypto-js/aes";
// import { enc } from "crypto-js";

// // Encrypt
// const ciphertext = AES.encrypt("my message", "secret key 123").toString();

// console.log("HOBA!", ciphertext);

// // Decrypt
// const bytes = AES.decrypt(ciphertext, "secret key 123");
// const originalText = bytes.toString(enc.Utf8);

// console.log(originalText); // 'my message'

@customElement(tagName)
export class PageExperimentJapaneseView extends LitElement {
  private formValues = defaultFormValues;

  private simplification = new SimplificationController(this);

  protected render(): TemplateResult {
    return preHTML/* html */ `
      <${RmPage}>
        ${this.renderInfo()}

        <div class="delimiter"></div>

        <h2 class="page-header">
          <${RmIcon} class="header-icon" .icon=${svgJapaneseExperiment}></${RmIcon}>
          Japanese Language Tools
        </h2>
        ${this.renderInput()}

        <div class="delimiter"></div>

        ${this.renderContent()}
      </${RmPage}>
    `;
  }

  private renderInput = (): TemplateResult => {
    return preHTML/* html */ `
      <div class="input-bar">
        <${RmInput}
          class="japanese-input"
          .placeholder="${"Put you Japanese text here"}"
          .name=${EJapaneseFormFields.INPUT}
          .onInput=${this.inputValueChanged}
          .value=${this.formValues[EJapaneseFormFields.INPUT]}
          .onSubmit=${this.submit}
        ></${RmInput}>

        <${RmButton}
          @click=${this.submit}
          .isLoading=${this.simplification.isLoading}
        >
          Simplify
        </${RmButton}>
      </div>
    `;
  };

  private renderInfo = (): TemplateResult => {
    return html`
      <div class="info-block">
        <div class="info-block-header">Links to check out</div>
        <div class="resources-links">
          ${this.renderGitHubLink(
            "Server",
            "https://github.com/Ruminat/Japanese-simplification"
          )}
          ${this.renderGitHubLink(
            "Web App",
            "https://github.com/Ruminat/experiments"
          )}
          ${this.renderGitHubLink(
            "Read the paper",
            "https://github.com/Ruminat/master-thesis"
          )}
        </div>
      </div>
    `;
  };

  private renderGitHubLink = (title: string, url: string): TemplateResult => {
    return preHTML/* html */ `
      <a class="resource-link" href="${url}" target="_blank">
        <${RmIcon} class="resource-icon" .icon=${svgGithub}></${RmIcon}>
        <span>${title}</span>
      </a>
    `;
  };

  private inputValueChanged = (
    field: EJapaneseFormFields,
    value: string
  ): void => {
    this.formValues[field] = value;
  };

  private submit = (): void => {
    const sentence = this.formValues[EJapaneseFormFields.INPUT];
    this.simplification.simplify(sentence);
  };

  private renderContent = (): TemplateResult => {
    return preHTML/* html */ `
      <${ProcessedJapaneseText}
        .processedData=${this.simplification.result}
        .error=${this.simplification.error}
        .isLoading=${this.simplification.isLoading}
      ></${ProcessedJapaneseText}>
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
      color: ${colors.secondaryText};
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
