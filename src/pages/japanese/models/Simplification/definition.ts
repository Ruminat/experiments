import { DJapaneseToken, TJapaneseToken } from "../JapaneseToken/definitions";

export type TSimplifiedResult = {
  originalText: string;
  simplifiedText: string;
  originalTextTokens: TJapaneseToken[];
  simplifiedTextTokens: TJapaneseToken[];
};

export type DSimplifiedResult = {
  originalText: string;
  simplifiedText: string;
  originalTextTokens: DJapaneseToken[];
  simplifiedTextTokens: DJapaneseToken[];
};
