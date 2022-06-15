import { fetchGET } from "../../../../lib/api/definitions";
import { DSimplifiedResult } from "./definition";

export async function processJapaneseText(text: string): Promise<DSimplifiedResult | Error> {
  const urlParams = { text };
  const response = await fetchGET<DSimplifiedResult>("processJapaneseText", { urlParams });
  return response;
}
