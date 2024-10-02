import useDebounce from "../../hooks/useDebounce";
import { useGitHubSearch } from "../../hooks/useGitHubSearch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SearchUser from "./SearchUser";

export interface IFormInputs {
  username: string;
}

const schema = yup.object().shape({
  username: yup.string().default("").matches(/.{3,}/, {
    excludeEmptyString: true,
    message: "Username must be at least 3 characters long",
  }),
});

const SearchUserContainer = () => {
  const {
    register,
    watch,
    formState: { errors: validationErrors },
  } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const username = watch("username");
  const debouncedUsername = useDebounce(username, 2000);
  const {
    data: users,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isRefetching,
    isFetching,
    error: loadingError,
  } = useGitHubSearch({
    username: debouncedUsername,
  });

  return (
    <SearchUser
      username={debouncedUsername}
      isLoading={isLoading || isRefetching || isFetching}
      usersPages={users?.pages}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      register={register}
      validationErrors={validationErrors}
      loadingError={loadingError}
    />
  );
};

export default SearchUserContainer;
