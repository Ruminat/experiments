import { css, LitElement, TemplateResult } from "lit";
import { PagesNavigationMenu } from "../../../../components/pages-navigation-menu";
import { ENavigationPages } from "../../../../components/pages-navigation-menu/definitions";
import { RmIcon } from "../../../../components/rm-icon";
import { svgJapaneseExperiment } from "../../../../components/rm-icon/icons";
import { customElement } from "../../../../lib/lit/customElement";
import { preHTML } from "../../../../lib/lit/preHTML";
import { commonStyles, pageStyles } from "../../../../styles/common";
import { cssSquare, size } from "../../../../styles/utils";
import { getPageJapaneseUrl } from "../../../japanese/pages/simplification/route";
import { tagName } from "./definitions";

@customElement(tagName)
export class PageHomeView extends LitElement {
  protected render(): TemplateResult {
    return preHTML/* html */ `
      <div class="page">
        <${PagesNavigationMenu} .activePage="${ENavigationPages.HOME}"></${PagesNavigationMenu}>
        <div class="page-content">
          <h1>Web experiments</h1>
          ${this.renderJapanese()}
        </div>
      </div>
    `;
  }

  // private renderRandom = (): TemplateResult => {
  //   return html`
  //     <div class="experiment">
  //       <div class="side-block">
  //         <${RmIcon} class="experiment-image" .icon=${svgRandomExperiment}></${RmIcon}>
  //       </div>
  //       <div class="content">
  //         <h3>
  //           <a href="${getPageRandomUrl()}">Random tools</a>
  //         </h3>
  //         <p>There is no such thing as a coincidence.</p>
  //       </div>
  //     </div>
  //   `;
  // };

  private renderJapanese = (): TemplateResult => {
    return preHTML/* html */ `
      <div class="experiment">
        <div class="side-block">
          <${RmIcon} class="experiment-image" .icon=${svgJapaneseExperiment}></${RmIcon}>
        </div>
        <div class="content">
          <h3>
            <a href="${getPageJapaneseUrl()}">Japanese language tools</a>
          </h3>
          <p>Some shit for Japanese.</p>
        </div>
      </div>
    `;
  };

  // private renderCalc = (): TemplateResult => {
  //   return html`
  //     <div class="experiment">
  //       <div class="side-block">
  //         <${RmIcon} class="experiment-image" .icon=${svgCalqExperiment}></${RmIcon}>
  //       </div>
  //       <div class="content">
  //         <h3>
  //           <a href="${getPageCalqUrl()}">Reactive calculator</a>
  //           (fork of <a href="${externalUrls.grimalschiCalque}">Calque</a>)
  //         </h3>
  //         <p>
  //           Simple reactive calculator (shows you results as you type)
  //           with support for variables, custom functions and some other features.
  //           It's basically just a fork of <a href="${externalUrls.grimalschiCalque}">Calque</a> with a few tiny changes.
  //         </p>
  //       </div>
  //     </div>
  //   `;
  // };

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
      ${cssSquare(6)};
      margin-right: ${size(2)};
    }
  `;
}
