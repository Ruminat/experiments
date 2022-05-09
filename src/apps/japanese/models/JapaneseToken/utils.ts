import { CSSResultGroup } from "lit";
import { palette } from "../../../../styles/palette";
import { EMeCabTypeOfSpeech } from "../MeCab/definitions";
import { EJapaneseTokenPartOfSpeech } from "./definitions";

export function meCabPartOfSpeechToJapaneseOne(partOfSpeech: EMeCabTypeOfSpeech): EJapaneseTokenPartOfSpeech | undefined {
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.NOUN)) return EJapaneseTokenPartOfSpeech.NOUN;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.NA_ADJACTIVE)) return EJapaneseTokenPartOfSpeech.NA_ADJACTIVE;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.PRONOUN)) return EJapaneseTokenPartOfSpeech.PRONOUN;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.I_ADJACTIVE)) return EJapaneseTokenPartOfSpeech.I_ADJACTIVE;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.PARTICLE)) return EJapaneseTokenPartOfSpeech.PARTICLE;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.AUXILIARY_VERB)) return EJapaneseTokenPartOfSpeech.AUXILIARY_VERB;
  if (partOfSpeech.startsWith(EMeCabTypeOfSpeech.VERB)) return EJapaneseTokenPartOfSpeech.VERB;

  return undefined;
}

export function japanesePartOfSpeechToColor(partOfSpeech: EJapaneseTokenPartOfSpeech | undefined): CSSResultGroup | undefined {
  if (!partOfSpeech) return undefined;

  switch (partOfSpeech) {
    case EJapaneseTokenPartOfSpeech.NOUN:
      return palette.blue20;
    case EJapaneseTokenPartOfSpeech.NA_ADJACTIVE:
      return palette.blue10;
    case EJapaneseTokenPartOfSpeech.PRONOUN:
      return palette.blue01;
    case EJapaneseTokenPartOfSpeech.VERB:
      return palette.green20;
    case EJapaneseTokenPartOfSpeech.I_ADJACTIVE:
      return palette.green10;
    case EJapaneseTokenPartOfSpeech.AUXILIARY_VERB:
      return palette.green01;
    case EJapaneseTokenPartOfSpeech.PARTICLE:
      return palette.yellow10;
    default:
      return palette.gray01;
  }
}
