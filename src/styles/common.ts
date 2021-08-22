import { css } from "lit";
import { palette } from "./palette";
import { cssTransition, size } from "./utils";

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

export const pageStyles = css`
  .page-content {
    padding: ${size(2)};
  }

  @media (min-width: 420px) { .page-content { padding: ${size(2)} 5%; } }
  @media (min-width: 600px) { .page-content { padding: ${size(2)} 10%; } }
  @media (min-width: 720px) { .page-content { padding: ${size(2)} 15%; } }
  @media (min-width: 1080px) { .page-content { padding: ${size(2)} 25%; } }
`;
