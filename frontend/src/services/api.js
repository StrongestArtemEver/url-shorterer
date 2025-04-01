const BASE_URL = "https://localhost:3000/";

export const createShortLink = async () => {
  const url = `${BASE_URL}/short`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};