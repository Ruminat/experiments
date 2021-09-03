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

  code, pre {
    font-family: var(--codeFont);
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
