import kebabCase from "lodash/kebabCase";
import { customElement as litCustomElement } from "lit/decorators.js";

const setDefinedElements: Set<string> = new Set();

const TAG_NAME = Symbol("TAG_NAME");

let counterForUniqueNames = 0;

export const customElement: typeof litCustomElement = (tagName) => (resultClass) => {
  let tag = tagName;

  const extendedClass: (typeof resultClass & { is?: string; [TAG_NAME]?: unknown }) = resultClass;

  // HACK: redefine property is
  try {
    extendedClass.is = "";
  } catch (e) {
    Reflect.defineProperty(extendedClass, "is", {
      set(v) {
        extendedClass[TAG_NAME] = v;
      },
      get() {
        return extendedClass[TAG_NAME];
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

  extendedClass.is = tag;
  extendedClass.toString = () => tag;

  setDefinedElements.add(tag);
  window.customElements.define(tag, extendedClass as CustomElementConstructor);

  return extendedClass;
};
