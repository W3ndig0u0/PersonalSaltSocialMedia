const API_BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/all`);
  return response.json();
};

