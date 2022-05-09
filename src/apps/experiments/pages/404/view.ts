import { css, LitElement, TemplateResult } from "lit";
import { RmEmptyState } from "../../../../components/rm-empty-state";
import { RmPage } from "../../../../components/rm-page";
import { customElement } from "../../../../lib/lit/customElement";
import { preHTML } from "../../../../lib/lit/preHTML";
import { commonStyles } from "../../../../styles/common";
import { colors } from "../../../../styles/palette";
import { tagName } from "./definitions";

@customElement(tagName)
export class Page404View extends LitElement {
  protected render(): TemplateResult {
    return preHTML/* html */ `
      <${RmPage}>
        <${RmEmptyState}>
          <h1 class="error-code">Error 404: page was not found</h1>
          <h3>Use the top menu for navigation.</h3>
        </${RmEmptyState}>
      </${RmPage}>
    `;
  }

  static styles = css`
    ${commonStyles}

    .error-code {
      color: ${colors.errorText};
    }
  `;
}
