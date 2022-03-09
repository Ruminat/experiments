
import "./components/rm-tab";
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cssFlexFullAlign, size } from "../../styles/utils";
import { tagName, TRmTab } from "./definitions";
import { noop } from "../../lib/functions/utils";

@customElement(tagName)
export class RmTabs extends LitElement {
  @property({ type: String }) public selectedTabName?: string;
  @property({ type: Array }) public tabs: TRmTab[] = [];

  @property() public onTabSelected: (tab: TRmTab) => void = noop;

  render(): TemplateResult {
    return html`
      <div class="tabs">
        ${this.tabs.map((tab) => this.renderTab(tab))}
      </div>
    `;
  }

  protected renderTab = (tab: TRmTab): TemplateResult => {
    return html`
      <rm-tab
        class="${tab.name === this.selectedTabName ? "selected" : ""}"
        @click=${() => this.tabSelected(tab)}
      >${tab.label}</rm-tab>
    `;
  };

  protected tabSelected = (tab: TRmTab): void => {
    this.selectedTabName = tab.name;
    this.onTabSelected(tab);
  };

  static styles = css`
    .tabs {
      ${cssFlexFullAlign()};
      max-width: 100%;
      overflow-x: auto;
    }

    rm-tab {
      border-top-left-radius: ${size(1)};
      border-bottom-left-radius: ${size(1)};
    }
    rm-tab + rm-tab {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }
    rm-tab:last-child {
      border-top-right-radius: ${size(1)};
      border-bottom-right-radius: ${size(1)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmTabs;
  }
}
