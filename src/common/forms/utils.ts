import { FORM_VALIDATION_ERROR, FORM_VALIDATION_SUCCESS, TFormValidationError, TFormValidationResult } from "./definitions";

export function validationSuccess(): TFormValidationResult {
  return FORM_VALIDATION_SUCCESS;
}

export function validationError(message: string): TFormValidationResult {
  return { is: FORM_VALIDATION_ERROR, message };
}

export function hasValidationError(result: TFormValidationResult): result is TFormValidationError {
  return result !== FORM_VALIDATION_SUCCESS;
}

export function isFormInvalid(form: Record<string, boolean>): boolean {
  return Object.values(form).some((validationResult) => validationResult !== true);
}
