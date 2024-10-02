import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGitHubUsers } from "../services/api";
import { useRef } from "react";

interface UseGitHubSearchProps {
  username: string;
  staleTime?: number;
}

const initialPage = 0;

export const useGitHubSearch = ({ username }: UseGitHubSearchProps) => {
  const page = useRef(initialPage);

  return useInfiniteQuery({
    queryKey: ["users", username],
    queryFn: ({ pageParam }) => {
      page.current += 1;
      return fetchGitHubUsers(username, pageParam);
    },
    initialPageParam: initialPage,
    getNextPageParam: () => page.current,
    retry: false,
    enabled: !!username,
  });
};
