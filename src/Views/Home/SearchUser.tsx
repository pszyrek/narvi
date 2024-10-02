import {
  Box,
  Container,
  Grid2 as Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import UserCard from "../../components/UserCard/UserCard";
import { User } from "../../types/user";

import InfiniteScroll from "react-infinite-scroller";
import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInputs } from "./SearchUserContainer";

interface Props {
  username: string;
  register: UseFormRegister<IFormInputs>;
  validationErrors: FieldErrors<IFormInputs>;
  fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
  hasNextPage: boolean;
  isLoading: boolean;
  usersPages?: User[][];
  loadingError?: Error | null;
}

const SearchUser = ({
  username,
  register,
  validationErrors,
  fetchNextPage,
  hasNextPage,
  isLoading,
  usersPages,
  loadingError,
}: Props) => {
  return (
    <Container sx={{ my: 3 }}>
      <form>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="GitHub Username"
              {...register("username", { required: true })}
              error={!!validationErrors.username}
              helperText={validationErrors.username?.message}
            />
          </Grid>
          <Grid container size={12}>
            {isLoading && (
              <Grid size={12}>
                <LinearProgress />
              </Grid>
            )}
            {!isLoading && !loadingError && usersPages?.length && (
              <InfiniteScroll
                pageStart={0}
                loadMore={() => fetchNextPage({})}
                hasMore={hasNextPage}
                loader={
                  <Box key="loader" my={2}>
                    <LinearProgress />
                  </Box>
                }
              >
                <Grid container spacing={2} size={12}>
                  {usersPages.map((page) =>
                    page.map((user) => (
                      <Grid key={user.id} size={{ xs: 6, sm: 4, md: 3 }}>
                        <UserCard user={user} />
                      </Grid>
                    ))
                  )}
                </Grid>
              </InfiniteScroll>
            )}
            {!isLoading &&
              !loadingError &&
              !usersPages?.length &&
              username?.length >= 3 && <Typography>No users found.</Typography>}
            {!isLoading && loadingError && (
              <Typography>{loadingError.message}</Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SearchUser;
