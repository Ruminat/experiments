import { DJapaneseToken, TJapaneseToken } from "./definitions";
import { meCabPartOfSpeechToJapaneseOne } from "./utils";

export function fromBackendJapaneseToken(token: DJapaneseToken): TJapaneseToken {
  return {
    content: token.token,
    partOfSpeech: token.partOfSpeech ? meCabPartOfSpeechToJapaneseOne(token.partOfSpeech) : undefined,
  };
}
