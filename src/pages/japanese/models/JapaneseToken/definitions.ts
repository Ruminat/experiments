export type TJapaneseToken = {
  content: string;
  partOfSpeech?: EJapaneseTokenPartOfSpeech;
}

export enum EJapaneseTokenPartOfSpeech {
  NOUN = "noun",
  NA_ADJACTIVE = "na-adjactive",
  PRONOUN = "pronoun",
  I_ADJACTIVE = "i-adjactive",
  PARTICLE = "particle",
  VERB = "verb",
  AUXILIARY_VERB = "auxiliary-verb",
}
