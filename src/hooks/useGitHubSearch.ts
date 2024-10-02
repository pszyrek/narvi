import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUsers } from "../services/api";

interface UseGitHubSearchProps {
  username: string;
  staleTime?: number;
}

export const useGitHubSearch = ({
  username,
  staleTime = 1000 * 60 * 5,
}: UseGitHubSearchProps) => {
  return useQuery({
    queryKey: ["githubUsers", username],
    queryFn: () => fetchGitHubUsers(username),
    enabled: !!username,
    staleTime,
    retry: false,
  });
};
