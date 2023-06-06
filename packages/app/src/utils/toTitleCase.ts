export const toTitleCase = (str?: string | null) => {
  if (str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
};
