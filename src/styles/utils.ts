import { CSSResult, unsafeCSS } from "lit";
import { mediaSizesList, TCSS, TCssClass, TCSSSize } from "./definitions";
import { palette } from "./palette";

export const cls = (className: string): string => `.${className}`;
export const cssCls = (className: string): CSSResult => unsafeCSS(`.${className}`);

export const size = (units = 1, unitSize = 8, measure = "px") => unsafeCSS(`${unitSize * units}${measure}`);

export const cssSize = (s: TCSSSize): CSSResult => unsafeCSS(typeof s === "number" ? size(s) : s);

export const cssSquare = (sideSize: TCSSSize = 1): CSSResult => {
  return unsafeCSS(`
    width: ${cssSize(sideSize)};
    height: ${cssSize(sideSize)};
  `);
};

export const cssMedia = (cssFn: (index: number, maxIndex: number, mediaSize: TCSSSize) => TCSS) => {
  return mediaSizesList.reduce((acc, curr, i) => {
    return unsafeCSS(`${acc}\n@media (min-width: ${cssSize(curr)}) { ${cssFn(i + 1, mediaSizesList.length, curr)} }`)
  }, unsafeCSS(``));
};

export const cssPadding = (top?: TCSSSize, right?: TCSSSize, bottom?: TCSSSize, left?: TCSSSize) => {
  if (top !== undefined && right === undefined && bottom === undefined && left === undefined) {
    return unsafeCSS(`padding: ${cssSize(top)}`);
  } else if (top !== undefined && right !== undefined && bottom === undefined && left === undefined) {
    return unsafeCSS(`padding: ${cssSize(top)} ${cssSize(right)}`);
  } else if (top !== undefined && right !== undefined && bottom !== undefined && left !== undefined) {
    return unsafeCSS(`padding: ${cssSize(top)} ${cssSize(right)} ${cssSize(bottom)} ${cssSize(left)}`);
  } else {
    throw new Error(`BITCH, WHAT DO YOU WANT? cssPadding(${top}, ${right}, ${bottom}, ${left})`);
  }
};

export const cssBorder = (width = "1px", color = palette.gray10, type = "solid") =>
  unsafeCSS(`border: ${width} ${type} ${color}`);
export const cssBorderRadius = (width: TCSSSize = size(3 / 5)) => unsafeCSS(`border-radius: ${cssSize(width)}`);
export const cssTransition = (type = "background", time = "80ms") => unsafeCSS(`transition: ${type} ${time}`);

export const cssFlexAlignItems = (flex = "flex", align = "center") => unsafeCSS(`
  display: ${flex};
  align-items: ${align};
`);

export const cssFlexJustifyContent = (flex = "flex", align = "center") => unsafeCSS(`
  display: ${flex};
  justify-content: ${align};
`);

export const cssFlexFullAlign = (flex = "flex", align = "center") => unsafeCSS(`
  display: ${flex};
  align-items: ${align};
  justify-content: ${align};
`);

export const cssShadow = (offsetX = size(1), offsetY = offsetX, blurRadius = size(0.5), color = palette.gray10) => {
  return unsafeCSS(`box-shadow: ${cssSize(offsetX)} ${cssSize(offsetY)} ${cssSize(blurRadius)} ${color};`);
}

export function cssClasses(classes: Record<string, string>): Record<string, CSSResult> {
  const result: Record<string, CSSResult> = {};
  for (const [key, value] of Object.entries(classes)) {
    result[key] = unsafeCSS(value);
  }
  return result;
}

export function cssClass(cls: string): TCssClass {
  return {
    css: unsafeCSS(cls),
    toString: () => cls,
  }
}
