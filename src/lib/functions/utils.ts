import { TFunction } from "./definitions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noop = (..._args: any[]): any => {};

export const tryExpr = (fn: TFunction, defaultValue = null) => {
  try {
    return fn()
  } catch (_) {
    return defaultValue
  }
}
