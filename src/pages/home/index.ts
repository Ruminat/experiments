
import "../../components/pages-navigation-menu";
import "../../components/rm-textarea";
import "../../components/rm-icon";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { tagName } from "./definitions";
import { ENavigationPages } from "../../components/pages-navigation-menu/definitions";
import { svgCalqExperiment, svgJapaneseExperiment, svgRandomExperiment } from "../../components/rm-icon/icons";
import { size, square } from "../../styles/utils";
import { getPageJapaneseUrl } from "../../experiments/japanese/route";
import { getPageCalqUrl } from "../../experiments/calq/route";
import { externalUrls } from "../../common/urls/definitions";
import { getPageRandomUrl } from "../../experiments/random/route";

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
              <rm-icon class="experiment-image" .icon=${svgRandomExperiment}></rm-icon>
            </div>
            <div class="content">
              <h3>
                <a href="${getPageRandomUrl()}">Random tools</a>
              </h3>
              <p>There is no such thing as a coincidence.</p>
            </div>
          </div>

          <div class="experiment">
            <div class="side-block">
              <rm-icon class="experiment-image" .icon=${svgJapaneseExperiment}></rm-icon>
            </div>
            <div class="content">
              <h3>
                <a href="${getPageJapaneseUrl()}">Japanese language tools</a>
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
                <a href="${getPageCalqUrl()}">Reactive calculator</a>
                (fork of <a href="${externalUrls.grimalschiCalque}">Calque</a>)
              </h3>
              <p>
                Simple reactive calculator (shows you results as you type)
                with support for variables, custom functions and some other features.
                It's basically just a fork of <a href="${externalUrls.grimalschiCalque}">Calque</a> with a few tiny changes.
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
