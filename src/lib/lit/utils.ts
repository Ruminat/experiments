import { LitElement } from "lit";
import { coerceToArray } from "../arrays/utils";

export function queryExistingElement<TElement extends Element = HTMLElement>(root: LitElement, query: string): TElement {
  return root.shadowRoot?.querySelector(query) as TElement;
}

export function queryExistingElements<TElement extends Element = HTMLElement>(root: LitElement, query: string): TElement[] {
  return coerceToArray(root.shadowRoot?.querySelectorAll(query)) as TElement[];
}

export function addToElement($parent: Element, query: string): HTMLElement {
  const { tagName, classNames, id } = getQueryStructure(query);
  const $element = document.createElement(tagName);
  $element.className = classNames.join(" ");
  if (id) $element.id = id;
  $parent.appendChild($element);
  return $element;
}

function getQueryStructure(query: string): { tagName: string; classNames: string[]; id?: string } {
  const tagName = query.match(/^(\w|-)+/)?.[0] ?? "div";
  const classNames = coerceToArray(query.match(/\.(\w|-)+/g)).map((className) => className.replace(/^\./, ""));
  const id = query.match(/#(\w|-)+/)?.[0] ?? "";
  return { tagName, classNames, id };
}
