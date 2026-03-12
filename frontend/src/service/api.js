const API_BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/all`);
  return response.json();
};


export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  return response.text(); // Eftersom din Spring-login returnerar en String
};
