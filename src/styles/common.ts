import { css } from "lit";
import { palette } from "./palette";
import { cssMedia, cssPadding, cssTransition, size } from "./utils";

export const commonStyles = css`
  a {
    text-decoration: none !important;
    color: ${palette.blue100};
    ${cssTransition("color")};
  }
  a:hover {
    color: ${palette.blue60};
  }
  a:active {
    color: ${palette.blue50};
  }

  a, button {
    outline: none;
  }

  code, pre, kbd {
    font-family: var(--codeFont);
  }
  kbd {
    margin: 0 0.1em;
    padding: 0.1em 0.6em;
    border-radius: 3px;
    border: 1px solid rgb(204, 204, 204);
    transform: translateY(-2px);
    color: rgb(51, 51, 51);
    line-height: 1.4;
    font-size: 10px;
    display: inline-block;
    box-shadow: 0px 1px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 2px #ffffff;
    background-color: rgb(247, 247, 247);
    -moz-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
    -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    text-shadow: 0 1px 0 #fff;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }
`;

const pageMediaStyles = (index: number) => css`
  .page-content {
    ${cssPadding(2, `${5 * index}%`)};
  }
`;

export const pageStyles = css`
  .page-content {
    padding: ${size(2)};
  }

  ${cssMedia(pageMediaStyles)}
`;
