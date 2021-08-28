
import "../../components/pages-navigation-menu";
import "../../components/rm-textarea";
import "../../components/rm-icon";
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { cssFlexAlignItems, size, cssSquare } from './../../styles/utils';
import { svgGithub, svgGmail, svgTelegram, svgVK } from "../../components/rm-icon/icons";
import { TIcon } from "../../components/rm-icon/definitions";
import { tagName } from "./definitions";
import { ENavigationPages } from "../../components/pages-navigation-menu/definitions";
import { externalUrls } from "../../common/urls/definitions";

@customElement(tagName)
export class PageAbout extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu .activePage="${ENavigationPages.ABOUT}"></pages-navigation-menu>

        <div class="page-content">
          <h2>About this website</h2>
          <p>This site is a collection of my experiments about pretty much anything.</p>

          <h2>About me</h2>
          <p>Hello there,</p>
          <p>I'm Vlad Furman, a web developer from Russia (st. Petersburg),</p>
          <p>you can contact me in multiple ways:</p>
          ${this.renderMyContacts()}
          ${this.renderCv()}
        </div>
      </div>
    `;
  }

  protected renderMyContacts = (): TemplateResult => {
    return html`
      <div class="contacts-block-wrapper">
        <div class="contacts">
          ${this.renderIconLink("Blowlyge@gmail.com (Email)", svgGmail, externalUrls.contacts.email)}
          ${this.renderIconLink("WhatIsLove_Furman (VK)", svgVK, externalUrls.contacts.vk)}
          ${this.renderIconLink("Ruminat (Telegram)", svgTelegram, externalUrls.contacts.telegram)}
          ${this.renderIconLink("Ruminat (GitHub)", svgGithub, externalUrls.contacts.github)}
        </div>
      </div>
    `;
  };

  protected renderCv = (): TemplateResult => {
    return html`
      <p>You can also check out my curriculum vitae:</p>
      <div class="cv-block">
        <a href="${externalUrls.cv.ru}" class="list-link" target="_blank">— 🇬🇧 in English</a>
        <a href="${externalUrls.cv.en}" class="list-link" target="_blank">— 🇷🇺 in Russian</a>
      </div>
    `;
  };

  protected renderIconLink = (text: string, icon: TIcon, link: string): TemplateResult => {
    return html`
      <a class="list-link icon-link" href="${link}" target="_blank">
        <span>—</span>
        <rm-icon .icon=${icon}></rm-icon>
        <span>${text}</span>
      </a>
    `;
  };

  static styles = css`
    ${commonStyles}
    ${pageStyles}

    p {
      margin: 0;
    }

    .contacts-block-wrapper {
      margin: ${size(1)} 0 ${size(2)} 0;
    }

    .contacts, .cv-block {
      display: inline-flex;
      flex-direction: column;
    }

    .list-link {
      display: block;
    }
    .list-link + .list-link {
      margin-top: ${size(1)};
    }

    .icon-link {
      ${cssFlexAlignItems("inline-flex")};
    }

    .contacts rm-icon {
      ${cssSquare(2.5)};
      margin: 0 ${size(1)};
    }

    .cv-block {
      margin-top: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageAbout;
  }
}
