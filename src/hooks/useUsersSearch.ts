import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/api";
import { useRef } from "react";
import { User } from "../types/user";

interface Props {
  username: string;
}

const INITIAL_PAGE = 0;
const MIN_SEARCH_LENGTH = 3;
const RETRY_COUNT = 3;
const STALE_TIME = 1000 * 60 * 5;
const USERS_PER_PAGE = 40;

const retryDelay = (attemptIndex: number) =>
  Math.min(1000 * 2 ** attemptIndex, 30000);

export const useUsersSearch = ({ username }: Props) => {
  const pageNumber = useRef(INITIAL_PAGE);
  const shouldDisplayUsers = !!username && username.length >= MIN_SEARCH_LENGTH;

  return useInfiniteQuery({
    enabled: shouldDisplayUsers,
    initialPageParam: INITIAL_PAGE,
    queryKey: ["users", username],
    retry: RETRY_COUNT,
    retryDelay,
    staleTime: STALE_TIME,

    getNextPageParam: (page: User[]) =>
      page.length > USERS_PER_PAGE ? pageNumber.current : undefined,
    queryFn: async ({ pageParam: page }) => {
      pageNumber.current += 1;
      return fetchUsers({
        username,
        page,
        usersPerPage: USERS_PER_PAGE,
      });
    },
  });
};
