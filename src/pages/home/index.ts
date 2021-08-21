
import "../../components/rm-textarea";
import "../../components/rm-icon";
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from './../../styles/common';
import { flexAlignItems, size, square } from './../../styles/utils';
import { svgGithub, svgGmail, svgTelegram, svgVK } from "../../components/rm-icon/icons";
import { TIcon } from "../../components/rm-icon/definitions";
import { tagName } from "./definitions";

@customElement(tagName)
export class PageHome extends LitElement {
  render() {
    return html`
      <div class="page">
        <h1>Lit experiments</h1>
        <p>Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an «L» on her forehead...</p>

        <h3>Simplify Japanese</h3>
        <rm-textarea></rm-textarea>

        <h3>My contacts</h3>
        ${this.renderMyContacts()}
      </div>
    `;
  }

  protected renderMyContacts = (): TemplateResult => {
    return html`
      <div class="contacts">
        ${this.renderIconLink("Ruminat", svgGithub, "https://github.com/Ruminat")}
        ${this.renderIconLink("WhatIsLove_Furman", svgVK, "https://vk.com/whatislove_furman")}
        ${this.renderIconLink("Ruminat", svgTelegram, "https://t.me/Ruminat")}
        ${this.renderIconLink("Blowlyge@gmail.com", svgGmail, "mailto:Blowlyge@gmail.com")}
      </div>
    `;
  };

  protected renderIconLink = (text: string, icon: TIcon, link: string): TemplateResult => {
    return html`
      <a class="icon-link" href="${link}">
        <rm-icon .icon=${icon}></rm-icon>
        <span>${text}</span>
      </a>
    `;
  };

  static styles = css`
    ${commonStyles}

    .contacts .icon-link {
      ${flexAlignItems()};
    }
    .icon-link + .icon-link {
      margin-top: ${size(1)};
    }

    .contacts rm-icon {
      ${square(2.5)};
      margin-right: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageHome;
  }
}
