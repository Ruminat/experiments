import { TFunction } from "../../common/functions/definitions"

export const tryExpr = (fn: TFunction, defaultValue = null) => {
  try {
    return fn()
  } catch (_) {
    return defaultValue
  }
}
