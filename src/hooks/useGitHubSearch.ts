import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGitHubUsers } from "../services/api";
import { useRef } from "react";

interface UseGitHubSearchProps {
  username: string;
  staleTime?: number;
}

const initialPage = 0;
const minSearchLength = 3;
const retryCount = 3;
const staleTime = 1000 * 60 * 5;

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
    staleTime,
    retry: retryCount,
    enabled: !!username && username?.length >= minSearchLength,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
