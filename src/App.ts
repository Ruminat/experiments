
import "./components/rm-textarea";
import "./components/rm-button";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from './styles/common';
import { cssBorder, cssBorderRadius, flexFullAlign, size, square } from './styles/utils';
import { rmButtonThemes } from "./components/rm-button";
import { palette } from "./styles/palette";

@customElement("rm-app")
export class App extends LitElement {
  render() {
    return html`
      <div class="content">
        <h1>Wanna die?</h1>

        <div>
          <rm-textarea></rm-textarea>
          <pre><code>
            Hello there,
            my dudes,
            it is friday I say!
          </code></pre>
        </div>

        <rm-button @click=${this.yeah} .disabled=${true} .theme=${rmButtonThemes.danger.toString()}>No!</rm-button>
        <rm-button @click=${this.yeah} .disabled=${true} .theme=${rmButtonThemes.default.toString()}>OK</rm-button>
        <rm-button @click=${this.yeah} .disabled=${true} .theme=${rmButtonThemes.success.toString()}>Yeah!</rm-button>

        <div class="square">!</div>
      </div>
    `;
  }

  protected yeah = (...args: unknown[]) => {
    console.log("LETS GO!", args);
  }

  static styles = css`
    ${commonStyles}

    .content {
      display: block;

      padding: ${size(2)};
      ${cssBorder()};
      ${cssBorderRadius()};
    }

    .square {
      ${flexFullAlign()};
      ${square(16)};
      font-size: ${size(12)};
      background: ${palette.yellow100};
      border-radius: ${size(1 / 2)};
      color: ${palette.white};
    }

    rm-textarea {
      margin-top: ${size(2)};
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "rm-app": App;
  }
}
