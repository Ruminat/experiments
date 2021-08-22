
import "../../components/pages-navigation-menu";
import "../../components/rm-textarea";
import "../../components/rm-icon";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { tagName } from "./definitions";
import { ENavigationPages } from "../../components/pages-navigation-menu/definitions";
import { svgCalqExperiment, svgJapaneseExperiment } from "../../components/rm-icon/icons";
import { size, square } from "../../styles/utils";

@customElement(tagName)
export class PageHome extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu .activePage="${ENavigationPages.HOME}"></pages-navigation-menu>
        <div class="page-content">
          <h1>Web experiments</h1>

          <div class="experiment">
            <div class="side-block">
              <rm-icon class="experiment-image" .icon=${svgJapaneseExperiment}></rm-icon>
            </div>
            <div class="content">
              <h3>
                <a href="/pages/japanese">Japanese language tools</a>
              </h3>
              <p>Some shit for Japanese.</p>
            </div>
          </div>

          <div class="experiment">
            <div class="side-block">
              <rm-icon class="experiment-image" .icon=${svgCalqExperiment}></rm-icon>
            </div>
            <div class="content">
              <h3>
                <a href="https://github.com/Ruminat/prettyCalque">Reactive calculator</a>
                (fork of <a href="https://github.com/grimalschi/calque">Calque</a>)
              </h3>
              <p>
                Simple reactive calculator (shows you results as you type)
                with support for variables, custom functions and some other features.
                It's basically just a fork of <a href="https://github.com/grimalschi/calque">Calque</a> with a few tiny changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    ${commonStyles}
    ${pageStyles}

    .experiment {
      display: flex;
    }
    .experiment + .experiment {
      margin-top: ${size(2)};
    }

    .experiment h3 {
      margin: 0;
    }

    .experiment-image {
      ${square(6)};
      margin-right: ${size(2)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageHome;
  }
}
