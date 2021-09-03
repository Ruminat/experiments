import { CSSResult, CSSResultGroup } from "lit";

export type TCSSSize = CSSResult | string | number;

export type TCSS = CSSResult | CSSResultGroup;

export const mediaSizeS = "420px";
export const mediaSizeM = "600px";
export const mediaSizeL = "720px";
export const mediaSizeXL = "1080px";

export const mediaSizesList = [mediaSizeS, mediaSizeM, mediaSizeL, mediaSizeXL] as const;

export type TCssClass = {
  css: CSSResult;
  toString: () => string;
}
