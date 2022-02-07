export function getTranslationUrl(sentence: string): string {
  return `https://translate.google.ru/?sl=ja&tl=en&text=${encodeURIComponent(sentence)}%0A&op=translate`;
}
