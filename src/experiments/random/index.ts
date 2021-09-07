
import "./components/getRandomFromForm";
import "./components/getYesOrNoForm";
import "../../components/rm-tabs/components/rm-tab";
import "./components/getRandomNumberForm";
import "../../components/pages-navigation-menu";
import "../../components/rm-tabs";
import { LitElement, html, css, TemplateResult } from 'lit';
import { cache } from 'lit/directives/cache';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles, pageStyles } from '../../styles/common';
import { EPageRandomTabs, pageRandomTabs, tagName } from "./definitions";
import { cssFlexFullAlign, size, cssSquare } from "../../styles/utils";
import { svgRandomExperiment } from "../../components/rm-icon/icons";
import { TRmTab } from "../../components/rm-tabs/definitions";

@customElement(tagName)
export class PageExperimentRandom extends LitElement {
  @property() public selectedTabName = EPageRandomTabs.YES_NO;

  render(): TemplateResult {
    return html`
      <div class="page">
        <pages-navigation-menu></pages-navigation-menu>

        <div class="page-content">
          <h2 class="page-header">
            <rm-icon class="header-icon" .icon=${svgRandomExperiment}></rm-icon>
            Random tools
          </h2>

          <div class="page-tabs">
            <rm-tabs
              .tabs=${pageRandomTabs}
              .selectedTabName=${this.selectedTabName}
              .onTabSelected=${this.onTabSelected}
            ></rm-tabs>
          </div>

          ${cache(this.renderTabContent())}
        </div>
      </div>
    `;
  }

  protected onTabSelected = (tab: TRmTab): void => {
    this.selectedTabName = tab.name as EPageRandomTabs;
  };

  protected renderTabContent = (): TemplateResult => {
    switch (this.selectedTabName) {
      case (EPageRandomTabs.YES_NO):
        return html`<get-yes-or-no-form></get-yes-or-no-form>`;
      case (EPageRandomTabs.RANDOM_FROM):
        return html`<get-random-from-form></get-random-from-form>`;
      case (EPageRandomTabs.RANDOM_NUMBER):
        return html`<get-random-number-form></get-random-number-form>`;
    }
  };

  static styles = css`
    ${commonStyles}
    ${pageStyles}

    .page-header {
      ${cssFlexFullAlign()};
    }

    .page-tabs {
      margin-bottom: ${size(2)};
    }

    .header-icon {
      ${cssSquare(6)};
      margin-right: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageExperimentRandom;
  }
}
