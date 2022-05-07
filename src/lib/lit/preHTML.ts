import { html, TemplateResult } from 'lit';

let str: string;

const cacheTemplateStringsToPreparedTemplateStrings = new WeakMap<TemplateStringsArray, string[]>();
const cacheTemplateStringsToNeedlessValuesIndexes = new WeakMap<TemplateStringsArray, number[]>();

type TValue = unknown;

// Сonvert dynamic tags to template strings
// example: <${'div'}>${'this is example'}</${'div'}> => <div>${'this is example'}</div>
export function preHTML (strings: TemplateStringsArray, ...values: TValue[]): TemplateResult {
  // check cache !important return equal link at first argument
  if (cacheTemplateStringsToPreparedTemplateStrings.has(strings)) {
    return html(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cacheTemplateStringsToPreparedTemplateStrings.get(strings) as any,
      ...dropIndexes(values, cacheTemplateStringsToNeedlessValuesIndexes.get(strings)!)
    );
  }

  const needlessIndexes: number[] = [];
  const newStrings: string[] = [];

  for (let i = 0; i < strings.length; i += 1) {
    str = strings[i];

    while (
      str[str.length - 1] === '<' // open tag
      || (str[str.length - 2] === '<' && str[str.length - 1] === '/') // close tag
    ) {
      needlessIndexes.push(i);
      str += values[i] + strings[++i];
    }

    newStrings.push(str);
  }

  cacheTemplateStringsToPreparedTemplateStrings.set(strings, newStrings);
  cacheTemplateStringsToNeedlessValuesIndexes.set(strings, needlessIndexes);

  return html(newStrings as any, ...dropIndexes(values, needlessIndexes));
}

function dropIndexes (arr: any[], indexes: number[]): any[] {
  let j = 0;
  const newArr = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (indexes[j] === i) {
      j += 1;
    } else {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}
