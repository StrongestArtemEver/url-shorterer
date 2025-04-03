const BASE_URL = "http://localhost:3000";

export const createShortLink = async (originalLink) => {
  const url = `${BASE_URL}/short`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(originalLink),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.results;
};