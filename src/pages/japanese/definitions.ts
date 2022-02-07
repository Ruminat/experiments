import { TJapaneseToken } from "./models/JapaneseToken/definitions";
import { meCabPartOfSpeechToJapaneseOne } from "./models/JapaneseToken/utils";
import { EMeCabTypeOfSpeech } from "./models/MeCab/definitions";

export const tagName = "experiments-japanese";

[
  { content: "知識" },
  { content: "豊富" },
  { content: "な" },
  { content: "人" },
  { content: "は" },
  { content: "実" },
  { content: "は" },
  { content: "馬鹿" },
  { content: "で" },
  { content: "ある" },
]

export const firstSentence: TJapaneseToken[] = [
  { content: "知識", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "豊富", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NA_ADJACTIVE) },
  { content: "な", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "人", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "は", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "実", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "は", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "馬鹿", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "で", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.AUXILIARY_VERB) },
  { content: "ある", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.VERB) },
];

export const secondSentence: TJapaneseToken[] = [
  { content: "いろいろ", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NA_ADJACTIVE) },
  { content: "な", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "こと", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "を", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "しっ", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.VERB) },
  { content: "てる", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.AUXILIARY_VERB) },
  { content: "人", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "は", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "本当", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NA_ADJACTIVE) },
  { content: "は", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.PARTICLE) },
  { content: "バカ", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.NOUN) },
  { content: "だ", partOfSpeech: meCabPartOfSpeechToJapaneseOne(EMeCabTypeOfSpeech.AUXILIARY_VERB) },
];
