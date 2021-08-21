import { CSSResult, unsafeCSS } from "lit";
import { TCssClass } from "./definitions";
import { palette } from "./palette";

export const size = (units = 1, unitSize = 8, measure = 'px') => unsafeCSS(`${unitSize * units}${measure}`);

export const square = (sideSize = 1) => unsafeCSS(`
  width: ${size(sideSize)};
  height: ${size(sideSize)}
`);

export const cssBorder = (width = '1px', color = palette.gray01, type = 'solid') => unsafeCSS(`border: ${width} ${type} ${color}`);
export const cssBorderRadius = (width = size(3 / 5)) => unsafeCSS(`border-radius: ${width}`);
export const cssTransition = (type = 'background', time = '80ms') => unsafeCSS(`transition: ${type} ${time}`);

export const flexAlignItems = (align = 'center') => unsafeCSS(`
  display: flex;
  align-items: ${align}
`);

export const flexJustifyContent = (align = 'center') => unsafeCSS(`
  display: flex;
  justify-content: ${align}
`);

export const flexFullAlign = (align = 'center') => unsafeCSS(`
  display: flex;
  align-items: ${align};
  justify-content: ${align};
`);

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
