import { html, TemplateResult } from 'lit';

type TParsedHtml = { strings: TemplateStringsArray; indexes: number[] };

const cachedResults = new WeakMap<TemplateStringsArray, TParsedHtml>();

// Сonvert dynamic tags to template strings
// Example: <${'div'}>${'this is example'}</${'div'}> => <div>${'this is example'}</div>
export function preHTML(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  const parsedHtml = getParsedHtml(strings, values);
  return html(parsedHtml.strings, ...dropIndexes(values, parsedHtml.indexes));
}

function getParsedHtml(strings: TemplateStringsArray, values: unknown[]): TParsedHtml {
  const cachedResult = cachedResults.get(strings);
  if (cachedResult) return cachedResult;

  const indexesToDrop: number[] = [];
  const newStrings: string[] = [];
  let str: string;

  for (let i = 0; i < strings.length; i++) {
    str = strings[i];

    while (hasUselessIndexes(str)) {
      indexesToDrop.push(i);
      str += values[i] + strings[++i];
    }

    newStrings.push(str);
  }

  const templateStrings = convertToTemplateStringsArray(newStrings);
  const htmlResult = { strings: templateStrings, indexes: indexesToDrop };
  cachedResults.set(strings, htmlResult);

  return htmlResult;
}

function hasUselessIndexes(str: string): boolean {
  const isOpenTag = str[str.length - 1] === "<";
  const isCloseTag = (str[str.length - 2] === "<" && str[str.length - 1] === "/");
  return isOpenTag || isCloseTag;
}

function convertToTemplateStringsArray(strings: string[]): TemplateStringsArray {
  return (strings as unknown) as TemplateStringsArray;
}

function dropIndexes<T>(arr: T[], indexes: number[]): T[] {
  let dropIndex = 0;
  const result: T[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (indexes[dropIndex] === i) {
      dropIndex += 1;
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}
