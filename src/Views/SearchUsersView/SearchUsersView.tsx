import { Grid2 as Grid } from "@mui/material";
import UserCard from "../../components/UserCard/UserCard";
import { User } from "../../types/user";

import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import SearchForm from "../../components/SearchForm/SearchForm";
import { FormInputs } from "./SearchUsersViewContainer";

interface Props {
  fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
  hasNextPage: boolean;
  isLoading: boolean;
  loadingError?: Error | null;
  notFoundError?: {
    message: string;
  };
  register: UseFormRegister<FormInputs>;
  usersPages?: User[][];
  validationErrors: FieldErrors<FormInputs>;
}

const SearchUserView = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  loadingError,
  notFoundError,
  register,
  usersPages,
  validationErrors,
}: Props) => (
  <SearchForm
    infiniteScrollProps={{
      loadMore: () => fetchNextPage,
      hasMore: hasNextPage,
    }}
    inputProps={{
      error: !!validationErrors.username,
      helperText: validationErrors.username?.message,
      ...register("username", { required: true }),
    }}
    isLoading={isLoading}
    loadingError={loadingError}
    notFoundError={notFoundError}
  >
    {usersPages?.map((page) =>
      page.map((user) => (
        <Grid key={user.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <UserCard user={user} />
        </Grid>
      ))
    )}
  </SearchForm>
);

export default SearchUserView;
