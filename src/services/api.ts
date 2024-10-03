import { User } from "../types/user";

const GITHUB_API_BASE_URL = "https://api.github.com";

interface FetchUsers {
  page: number;
  username: string;
  usersPerPage: number;
}

export const fetchUsers = async ({
  page,
  username,
  usersPerPage,
}: FetchUsers): Promise<User[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/users?q=${username}&page=${page}&per_page=${usersPerPage}`
  );

  if (!response.ok) {
    throw new Error("Couldn't fetch users!");
  }

  const data = await response.json();
  return data.items;
};
