
import { css, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { commonStyles } from '../../../../styles/common';
import { palette } from "../../../../styles/palette";
import { cssFlexFullAlign, cssSizes, size } from "../../../../styles/utils";
import { TSimplifiedResult } from '../../models/Simplification/definition';
import { TJapaneseToken } from "./../../models/JapaneseToken/definitions";
import { japanesePartOfSpeechToColor } from "./../../models/JapaneseToken/utils";
import { getTranslationUrl } from "./../../models/Translation/utils";
import { tagName } from "./definitions";
import { customElement } from "../../../../lib/lit/customElement";
import { RmEmptyState } from '../../../../components/rm-empty-state';
import { preHTML } from '../../../../lib/lit/preHTML';
import { RmErrorState } from '../../../../components/rm-error-state';
import { RmSkeleton } from '../../../../components/rm-skeleton';

@customElement(tagName)
export class ProcessedJapaneseText extends LitElement {
  @property({ type: Boolean })
  public isLoading = false;

  @property({ type: String })
  public error?: string;

  @property({ type: Object })
  public processedData?: TSimplifiedResult;

  protected render() {
    return html`
      <div class="processed-info">
        <div class="processed-info-wrapper">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }

  private renderContent = (): TemplateResult | null => {
    if (this.error) return this.renderError(this.error);
    if (this.processedData) return this.renderSimplificationContent(this.processedData);
    if (this.isLoading) return this.renderLoadingState();

    return this.renderEmptyState();
  };

  private renderError = (error: string): TemplateResult => {
    return preHTML/* html */ `<${RmErrorState}>${error}</${RmErrorState}>`;
  };

  private renderEmptyState = (): TemplateResult => {
    return preHTML/* html */ `
      <${RmEmptyState}>
        <div>Type the Japanese text you want to simplify in the input above and press <kbd>Enter</kbd></div>
        <div>(e.g. 知識豊富な人は実は馬鹿である)</div>
      </${RmEmptyState}>
    `;
  };

  private renderSimplificationContent = (processedData: TSimplifiedResult): TemplateResult => {
    return html`
      <div class="processed-title">Your text</div>
      ${this.renderTranslationLink(processedData.originalText)}
      ${this.renderTokens(processedData.originalTextTokens)}
      <div class="processed-title">Simplified version</div>
      ${this.renderTranslationLink(processedData.simplifiedText)}
      ${this.renderTokens(processedData.simplifiedTextTokens)}
    `;
  };

  private renderLoadingState = (): TemplateResult => {
    return preHTML/* html */ `
      <div class="processed-title">Your text</div>
      <${RmSkeleton} class="skeleton" .height=${2} .width=${16}></${RmSkeleton}>
      <${RmSkeleton} class="skeleton" .height=${3}></${RmSkeleton}>
      <div class="processed-title">Simplified version</div>
      <${RmSkeleton} class="skeleton" .height=${2} .width=${16}></${RmSkeleton}>
      <${RmSkeleton} class="skeleton" .height=${3}></${RmSkeleton}>
    `;
  };

  private renderTranslationLink = (sentence: string): TemplateResult => {
    return html`
      <div class="translation-block">
        <a class="translation-link" href="${getTranslationUrl(sentence)}" target="_blank">translation</a>
      </div>
    `;
  };

  private renderTokens = (tokens: TJapaneseToken[]): TemplateResult => {
    return html`<div class="tokens">${tokens.map((token) => this.renderToken(token))}</div>`;
  };

  private renderToken = (token: TJapaneseToken): TemplateResult => {
    const color = japanesePartOfSpeechToColor(token.partOfSpeech);
    const backgroundStyle = color ? `background: ${color};` : "";
    return html`<span class="token" style="${backgroundStyle}">${token.content}</span>`;
  };


  static styles = css`
    ${commonStyles}

    .processed-info {
      ${cssFlexFullAlign()};
    }

    .processed-info-wrapper {
      min-width: ${size(42)};
      max-width: 80vw;
    }

    .processed-title {
      margin-top: ${size(2)};
      margin-bottom: ${size(0.5)};
    }

    .translation-block {
      margin-bottom: ${size(1)};
    }

    .tokens {
      display: flex;
      flex-wrap: wrap;
      gap: ${cssSizes(1, 1 / 4)};
    }
    .token {
      border-radius: ${size(1 / 2)};
      padding: 0 ${size(1 / 2)};
      border: 1px solid ${palette.gray10};
      background: ${palette.gray01};
    }

    .skeleton + .skeleton {
      margin-top: ${size(1)};
    }
  `;
}
