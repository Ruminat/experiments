export const capitalize = (str: string | undefined): string | undefined =>
  !str ? str : str[0].toUpperCase() + str.substr(1);
