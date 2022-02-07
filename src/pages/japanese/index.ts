
import "../../components/rm-button";
import "../../components/rm-input";
import "../../components/pages-navigation-menu";
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from '../../styles/common';
import { firstSentence, secondSentence, tagName } from "./definitions";
import { cssFlexFullAlign, size, cssSquare } from "../../styles/utils";
import { palette } from "../../styles/palette";
import { svgJapaneseExperiment } from "../../components/rm-icon/icons";
import { getTranslationUrl } from "./models/Translation/utils";
import { TJapaneseToken } from "./models/JapaneseToken/definitions";
import { japanesePartOfSpeechToColor } from "./models/JapaneseToken/utils";

@customElement(tagName)
export class PageExperimentJapanese extends LitElement {
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
          ${this.renderProcessesJapaneseText()}
        </div>
      </div>
    `;
  }

  private renderInput = (): TemplateResult => {
    return html`
      <div class="input-label">
        Type the Japanese text you want to simplify and press <kbd>Enter</kbd>
        (e.g. 知識豊富な人は実は馬鹿である)
      </div>
      <div class="input-bar">
        <rm-input class="japanese-input" .placeholder="${"Put you Japanese text here"}"></rm-input>
        <rm-button>Simplify</rm-button>
      </div>
    `;
  };

  private renderProcessesJapaneseText = (): TemplateResult => {
    const tokens = firstSentence;
    const simplifiedTokens = secondSentence;

    return html`
      <div class="delimiter"></div>
      <div class="processed-info">
        <div class="processed-info-wrapper">
          <div class="processed-title">Your text</div>
          ${this.renderTranslationLink(tokens.join(""))}
          ${this.renderTokens(tokens)}

          <div class="processed-title">Simplified version</div>
          ${this.renderTranslationLink(simplifiedTokens.join(""))}
          ${this.renderTokens(simplifiedTokens)}
        </div>
      </div>
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

  protected renderToken = (token: TJapaneseToken): TemplateResult => {
    const color = japanesePartOfSpeechToColor(token.partOfSpeech);
    const backgroundStyle = color ? `background: ${color};` : "";
    return html`<span class="token" style="${backgroundStyle}">${token.content}</span>`;
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

    /* processed shit */

    .delimiter {
      margin-top: ${size(4)};
      margin-bottom: ${size(2)};
      border-top: 1px solid ${palette.gray10};
    }

    .processed-info {
      ${cssFlexFullAlign()};
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
      gap: ${size(1)} ${size(1 / 4)};
    }
    .token {
      border-radius: ${size(1 / 2)};
      padding: 0 ${size(1 / 2)};
      border: 1px solid ${palette.gray10};
      background: ${palette.gray01};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentJapanese;
  }
}

document.body.appendChild(document.createElement(tagName));
