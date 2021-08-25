export const capitalize = (str: string | undefined) => !str ? str : str[0].toUpperCase() + str.substr(1);
