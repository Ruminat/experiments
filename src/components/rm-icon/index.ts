
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tagName, TIcon } from "./definitions";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { size } from '../../styles/utils';

function renderSvg(
  content: string,
  {
    size = 16,
    width = size,
    height = size,
  }: { size?: number; width?: number; height?: number } = {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  return unsafeHTML(
    `<svg width="16" height="16" viewBox="0 0 35.318 35.318" xmlns="http://www.w3.org/2000/svg">
      ${content}
    </svg>`
  );
}

@customElement(tagName)
export class PageHome extends LitElement {
  @property({ type: String }) public icon!: TIcon;
  @property({ type: Number }) public size = 16;

  render() {
    const svg = renderSvg(this.icon, { size: this.size });
    // return html`<span style="width: ${this.size}px; height: ${this.size}px;">${svg}</span>`;
    return html`${svg}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: PageHome;
  }
}
