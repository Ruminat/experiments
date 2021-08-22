
import "../../components/pages-navigation-menu";
import "../../components/rm-textarea";
import "../../components/rm-icon";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles, pageStyles } from './../../styles/common';
import { tagName } from "./definitions";
import { ENavigationPages } from "../../components/pages-navigation-menu/definitions";

@customElement(tagName)
export class PageHome extends LitElement {
  render() {
    return html`
      <div class="page">
        <pages-navigation-menu .activePage="${ENavigationPages.HOME}"></pages-navigation-menu>
        <div class="page-content">
          <h1>Web experiments</h1>

          <div class="experiment">
            <h3>
              <a href="/pages/japanese">Japanese language tools</a>
            </h3>
            <p>
              Some shit for Japanese.
            </p>
          </div>

          <div class="experiment">
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
    `;
  }

  static styles = css`
    ${commonStyles}
    ${pageStyles}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageHome;
  }
}
