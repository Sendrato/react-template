export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL = '';
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        baseURL = reader.result as string;
        resolve(baseURL);
      }
    };
  });
};
