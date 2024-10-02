import { useState } from "react";
import Home from "./Home";
import useDebounce from "../../hooks/useDebounce";
import { useGitHubSearch } from "../../hooks/useGitHubSearch";

const HomeContainer = () => {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 2000);
  const {
    data: users,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGitHubSearch({
    username: debouncedUsername,
  });

  console.log(users);

  const handeChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value);
  };

  return (
    <Home
      isLoading={isLoading}
      username={username}
      usersPages={users?.pages}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      handleChangeUsername={handeChangeUsername}
    />
  );
};

export default HomeContainer;
