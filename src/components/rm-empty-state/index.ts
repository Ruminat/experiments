
import { css, html, LitElement, TemplateResult } from 'lit';
import { tagName } from "./definitions";
import { cssBorderRadius, cssFlexFullAlign, size } from '../../styles/utils';
import { palette } from '../../styles/palette';
import { customElement } from '../../lib/lit/customElement';

@customElement(tagName)
export class RmEmptyState extends LitElement {
  protected render(): TemplateResult {
    return html`
      <div class="empty-state">
        <div class="empty-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .empty-state {
      ${cssFlexFullAlign("flex")};
      padding: ${size(4)};
      cursor: default;
      background: ${palette.gray01};
      ${cssBorderRadius()};
      color: ${palette.gray50};
      text-align: center;
    }
  `;
}
