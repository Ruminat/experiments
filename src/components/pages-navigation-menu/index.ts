
import { LitElement, css, html, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { commonStyles } from "../../styles/common";
import { palette } from "../../styles/palette";
import { cssTransition, cssFlexAlignItems, cssFlexFullAlign, size, cssPadding } from "../../styles/utils";
import { ENavigationPages, tagName } from "./definitions";
import { svgHome, svgInfo } from "../rm-icon/icons";
import { customElement } from "../../lib/lit/customElement";
import { preHTML } from "../../lib/lit/preHTML";
import { RmIcon } from "../rm-icon";
import { getPageHomeUrl } from "../../apps/experiments/pages/home/route";
import { getPageAboutUrl } from "../../apps/experiments/pages/about/route";

@customElement(tagName)
export class PagesNavigationMenu extends LitElement {
  @property({ type: String }) public activePage?: ENavigationPages;

  protected activeCls = (page: ENavigationPages): string => this.activePage === page ? "active" : "";

  render(): TemplateResult {
    return html`
      <div class="navigation-menu">
        ${this.renderMenuLinks()}
      </div>
    `;
  }

  protected renderMenuLinks = () => {
    return preHTML/* html */ `
      <div class="menu-links">
        <a href="${getPageHomeUrl()}" class="menu-link ${this.activeCls(ENavigationPages.HOME)}">
          <${RmIcon} class="icon" .icon=${svgHome}></${RmIcon}>
          Home
        </a>
        <a href="${getPageAboutUrl()}" class="menu-link ${this.activeCls(ENavigationPages.ABOUT)}">
          <${RmIcon} class="icon" .icon=${svgInfo}></${RmIcon}>
          About
        </a>
      </div>
    `;
  };

  static styles = css`
    ${commonStyles}

    .navigation-menu {
      background: ${palette.gray100};
    }

    .menu-links {
      ${cssFlexFullAlign()};
    }

    .menu-link {
      ${cssFlexAlignItems()};
      ${cssPadding(1, 2)};
      height: 100%;
      color: ${palette.white};
      ${cssTransition("background")};
    }
    .menu-link:hover,
    .menu-link.active {
      background: ${palette.gray90};
      color: ${palette.white};
    }

    .menu-link .icon {
      fill: ${palette.white};
      margin-right: ${size(1)};
    }
  `;
}
