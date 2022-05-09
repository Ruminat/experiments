// import { range } from "../generators/utils";

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// export async function until (fn: () => Promise<boolean>, { waitMs = 40, tries = Infinity } = {}): Promise<boolean> {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   for (const _ of range()) {
//     if (await fn()) return true
//     if (tries-- === 0) return false
//     await delay(waitMs)
//   }
//   return true
// }
