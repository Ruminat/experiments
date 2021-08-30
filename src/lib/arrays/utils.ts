export function generateArray<T>(length: number, fn: (i: number) => T) {
  return Array.from({ length }, (_, i) => fn(i));
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
export const naturalCompare = collator.compare;
export function naturalSort(arr: string[]): string[] {
  return arr.sort(naturalCompare);
}

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function coerceToArray<T>(elements: T[] | NodeListOf<Element> | undefined | null): T[] {
  if (elements == null) return [];
  else return Array.from(elements as T[]);
}
