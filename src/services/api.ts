import { User } from "../types/user";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchGitHubUsers = async (
  username: string,
  page: number
): Promise<User[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/users?q=${username}&page=${page}&per_page=40`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.items;
};
