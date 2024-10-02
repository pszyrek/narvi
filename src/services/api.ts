const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchGitHubUsers = async (username: string) => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/users?q=${username}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok"); // Obsługa błędów
  }

  const data = await response.json();
  return data.items; // Zwróci tylko listę użytkowników
};
