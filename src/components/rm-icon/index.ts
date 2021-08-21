
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tagName, TIcon } from "./definitions";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { flexFullAlign, size } from '../../styles/utils';

@customElement(tagName)
export class RmIcon extends LitElement {
  @property({ type: String }) public icon!: TIcon;

  protected render(): TemplateResult {
    return html`${unsafeHTML(this.icon)}`;
  }

  static styles = css`
    :host {
      ${flexFullAlign("inline-flex")};
      width: ${size(2)};
      height: ${size(2)};
      user-select: none;
    }

    :host svg {
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: RmIcon;
  }
}
