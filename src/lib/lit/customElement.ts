import kebabCase from "lodash/kebabCase";
// import { colors } from "../../common/styles/colors";
// import { size } from "../../common/styles/layout";
import { customElement as jopa } from 'lit/decorators.js';

const setDefinedElements: Set<string> = new Set();
const mapDefinedClassToName: Map<any, string> = new Map();

// export interface IQexElement extends Constructor<ICustomElement> {
//   is?: string;
// }

const TAG_NAME = Symbol("TAG_NAME");

let counterForUniqueNames = 0;

export const customElement: typeof jopa = (tagName) => (resultClass) => {
  // if (mapDefinedClassToName.has(resultClass)) {
  //   throw new Error("this class has already been used with this registry");
  // }

  let tag = tagName;

  // HACK: redefine property is
  try {
    resultClass.is = "";
  } catch (e) {
    Reflect.defineProperty(resultClass, "is", {
      set(v) {
        resultClass[TAG_NAME] = v;
      },
      get() {
        return resultClass[TAG_NAME];
      },
    });
  }

  if (tag.indexOf("-") === -1) {
    tag = `x-${kebabCase(tag)}`;
  }

  let tempTagName = tag;
  while (setDefinedElements.has(tempTagName) || window.customElements.get(tempTagName)) {
    tempTagName = `${tag}-${(counterForUniqueNames += 1)}`;
  }

  tag = tempTagName;

  resultClass.is = tag;
  resultClass.toString = () => tag;

  // if ((clazz as any).styles && !("__karma__" in window)) {
  //   const styles = (clazz as any).styles as
  //     | { styleSheet: CSSStyleSheet; cssText: string }
  //     | ({ styleSheet: CSSStyleSheet }[] & { cssText: string });
  //   const styleSheet = Array.isArray(styles) ? styles?.[0].styleSheet : styles?.styleSheet;
  //   if (styleSheet) {
  //     for (const rule of globalCssRules) {
  //       styleSheet.insertRule(rule);
  //     }
  //   } else {
  //     // Safari fallback
  //     styles.cssText += globalCssRules.join("\n");
  //   }
  // }

  setDefinedElements.add(tag);
  mapDefinedClassToName.set(resultClass, tag);
  window.customElements.define(tag, resultClass);

  return resultClass;
};

// const globalCssRules = [
//   `
//   :host::-webkit-scrollbar, :host *::-webkit-scrollbar {
//     width: ${size(1.5)};
//     height: ${size(1.5)};
//     background: ${colors.background};
//   }
//   `,
//   `
//   :host::-webkit-scrollbar-track, :host *::-webkit-scrollbar-track {
//     background: ${colors.background};
//   }
//   `,
//   `
//   :host::-webkit-scrollbar-corner, :host *::-webkit-scrollbar-corner {
//     background: ${colors.scrollbar.corner};
//   }
//   `,
//   `
//   :host::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:hover {
//     background: ${colors.scrollbar.thumbActive}
//   }
//   `,
//   `
//   :host::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb {
//     background: ${colors.scrollbar.thumb};
//   }
//   `,
//   // redefining Vaading css variables
//   `
//   :host {
//     --lumo-disabled-text-color: ${colors.controlDisabledText};
//   }
//   `,
// ];
