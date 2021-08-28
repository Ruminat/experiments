export const FORM_VALIDATION_SUCCESS = "valid-form" as const;
export const FORM_VALIDATION_ERROR = "invalid-form" as const;

export type TFormValidationError = {
  is: typeof FORM_VALIDATION_ERROR;
  message: string;
}

export type TFormValidationResult = typeof FORM_VALIDATION_SUCCESS | TFormValidationError;

export type TFormValidator = (value: string) => TFormValidationResult;
