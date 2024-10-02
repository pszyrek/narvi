import { Box, Container, Grid2 as Grid, LinearProgress } from "@mui/material";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserCard from "../../components/UserCard/UserCard";
import { User } from "../../types/user";

import InfiniteScroll from "react-infinite-scroller";
import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";

interface Props {
  fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
  handleChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
  hasNextPage: boolean;
  isLoading: boolean;
  username: string;
  usersPages?: User[][];
}

const Home = ({
  fetchNextPage,
  handleChangeUsername,
  hasNextPage,
  isLoading,
  username,
  usersPages,
}: Props) => {
  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <SearchInput username={username} onChange={handleChangeUsername} />
        </Grid>
        <Grid container size={12}>
          {isLoading && (
            <Grid size={12}>
              <LinearProgress />
            </Grid>
          )}
          {!isLoading && (
            <InfiniteScroll
              pageStart={0}
              loadMore={() => fetchNextPage({})}
              hasMore={hasNextPage}
              loader={
                <Box my={2}>
                  <LinearProgress />
                </Box>
              }
            >
              <Grid container spacing={2} size={12}>
                {usersPages?.map((page) =>
                  page.map((user) => (
                    <Grid key={user.id} size={{ xs: 6, sm: 4, md: 3 }}>
                      <UserCard user={user} />
                    </Grid>
                  ))
                )}
              </Grid>
            </InfiniteScroll>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
