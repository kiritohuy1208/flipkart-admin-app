const baseUrl = "https://flipkart-rest-backend.herokuapp.com";
//const baseUrl = "http://localhost:8080";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};
