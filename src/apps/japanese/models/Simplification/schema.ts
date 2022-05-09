import { fromBackendJapaneseToken } from "../JapaneseToken/schema";
import { DSimplifiedResult, TSimplifiedResult } from "./definition";

export function fromBackendSimplifiedResult(result: DSimplifiedResult): TSimplifiedResult {
  return {
    originalText: result.originalText,
    simplifiedText: result.simplifiedText,
    originalTextTokens: result.originalTextTokens.map(fromBackendJapaneseToken),
    simplifiedTextTokens: result.simplifiedTextTokens.map(fromBackendJapaneseToken),
  };
}
