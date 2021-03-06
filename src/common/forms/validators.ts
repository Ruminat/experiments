import { isStringAnInteger } from "../../lib/strings/utils";
import { TFormValidationResult } from "./definitions";
import { validationSuccess, validationError } from "./utils";

export const integerValidator = (value: string): TFormValidationResult => {
  return isStringAnInteger(value) ? validationSuccess() : validationError("The input value must be an integer (e.g. 42)");
};

export const requiredValidator = (value: string): TFormValidationResult => {
  return value.trim() ? validationSuccess() : validationError("The input must not be empty");
};
