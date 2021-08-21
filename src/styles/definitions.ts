import { css, CSSResult } from "lit";

export const styles = {
  borderWidthSm: css`1px`,
}

export type TCssClass = {
  css: CSSResult;
  toString: () => string;
}
