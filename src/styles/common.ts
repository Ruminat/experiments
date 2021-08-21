import { css } from "lit";
import { palette } from "./palette";

export const commonStyles = css`
  a {
    text-decoration: none !important;
    color: ${palette.blue100};
  }
  code, pre {
    font-family: var(--codeFont);
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }
`;