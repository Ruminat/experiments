
import "../../components/rm-icon";
import "./../../components/rm-textarea";
import "./../../components/rm-button";
import { LitElement, html, css, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from './../../styles/common';
import { cssBorder, cssBorderRadius, flexFullAlign, size, square } from './../../styles/utils';
import { palette } from "./../../styles/palette";
import { svgGithub } from "../../components/rm-icon/icons";

@customElement("page-home")
export class PageHome extends LitElement {
  render() {
    return html`
      <div class="page">
        <h1>Ruminat experiments</h1>
        <p>Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an «L» on her forehead...</p>
        <rm-icon .icon=${svgGithub}></rm-icon>
        <a href="https://github.com/Ruminat">Ruminat</a>
        <a href="https://vk.com/whatislove_furman">WhatIsLove_Furman</a>
        <a href="https://t.me/Ruminat">Ruminat</a>
        <a href="tailto:Blowlyge@gmail.com">Blowlyge@gmail.com</a>
      </div>
    `;
  }

  protected yeah = (...args: unknown[]) => {
    console.log("LETS GO!", args);
  }

  static styles = css`
    ${commonStyles}

    .content {
      display: block;

      padding: ${size(2)};
      ${cssBorder()};
      ${cssBorderRadius()};
    }

    .square {
      ${flexFullAlign()};
      ${square(16)};
      font-size: ${size(12)};
      background: ${palette.yellow100};
      border-radius: ${size(1 / 2)};
      color: ${palette.white};
    }

    rm-textarea {
      margin-top: ${size(2)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": PageHome;
  }
}
