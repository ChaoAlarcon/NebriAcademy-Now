export const API_URL = "http://localhost:3000";

export const fetchData = async (endpoint) => {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return res.json();
};
