export const capitalize = (str: string | undefined): string =>
  !str ? "" : str[0].toUpperCase() + str.substr(1);

// Because Number("") === 0.
export const stringToNumber = (str: string): number => !str ? NaN : Number(str);

export const isStringAValidNumber = (str: string): boolean => Number.isFinite(stringToNumber(str));
export const isStringANonIntegerNumber = (str: string): boolean => {
  const n = stringToNumber(str);
  return Number.isFinite(n) && !Number.isInteger(n);
};
export const isStringAnInteger = (str: string): boolean => Number.isInteger(stringToNumber(str));
export const isStringANaturalNumber = (str: string): boolean => {
  const n = stringToNumber(str);
  return Number.isInteger(n) && n >= 1;
};
