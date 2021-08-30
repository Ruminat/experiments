import { css, CSSResult } from "lit";

export type TCSSSize = CSSResult | string | number;

export const styles = {
  borderWidthSm: css`1px`,
}

export type TCssClass = {
  css: CSSResult;
  toString: () => string;
}
