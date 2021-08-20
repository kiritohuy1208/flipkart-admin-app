const baseUrl = "https://flipkart-rest-backend.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};
