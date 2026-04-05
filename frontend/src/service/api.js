const API_BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/all`);
  return response.json();
};

export const getUserByUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  return response.json();
};

export const getUserBioByUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/bio`);
  return response.json();
};

export const getUserImageByUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  return response.json();
};

export const updateUserBio = async (username, bioText) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/bio`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: bioText,
  });

  if (!response.ok) throw new Error("Failed to update bio");
  return response.json();
};

export const setUserImageByUsername = async (username, imageUrl) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/pfp`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: imageUrl,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update profile picture");
  }

  return response;
};

export const commentOnPost = async (postId, username, comment) => {
  await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, comment }),
  });
};

export const getAllPost = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  return response.json();
};

export const getPostById = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
  return response.json();
};

export const getPostsByUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/posts/user/${username}`);
  return response.json();
};
