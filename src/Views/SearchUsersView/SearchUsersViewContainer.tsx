import useDebounce from "../../hooks/useDebounce";
import { useUsersSearch } from "../../hooks/useUsersSearch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SearchUser from "./SearchUsersView";

export interface FormInputs {
  username: string;
}

const schema = yup.object().shape({
  username: yup.string().default("").matches(/.{3,}/, {
    excludeEmptyString: true,
    message: "Username must be at least 3 characters long",
  }),
});

const SearchUsersViewContainer = () => {
  const {
    register,
    watch,
    formState: { errors: validationErrors },
  } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const username = watch("username");
  const debouncedUsername = useDebounce(username, 2000);
  const {
    data: users,
    error: loadingError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isRefetching,
  } = useUsersSearch({
    username: debouncedUsername,
  });

  const shouldDisplayNotFoundError =
    !isLoading &&
    !loadingError &&
    !users?.pages?.length &&
    debouncedUsername?.length >= 3;
  const notFoundError = shouldDisplayNotFoundError
    ? { message: "No users found" }
    : undefined;

  return (
    <SearchUser
      fetchNextPage={fetchNextPage}
      isLoading={isLoading || isRefetching || isFetching}
      loadingError={loadingError}
      notFoundError={notFoundError}
      register={register}
      hasNextPage={hasNextPage}
      usersPages={users?.pages}
      validationErrors={validationErrors}
    />
  );
};

export default SearchUsersViewContainer;
