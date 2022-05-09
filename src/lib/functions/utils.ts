import { TFunction } from "./definitions";

// eslint-disable-next-line
export const noop: TFunction = () => {};

export const tryExpr = (fn: TFunction, defaultValue = null) => {
  try {
    return fn();
  } catch (_) {
    return defaultValue;
  }
};
