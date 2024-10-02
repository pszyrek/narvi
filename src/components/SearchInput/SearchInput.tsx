import { TextField } from "@mui/material";

interface Props {
  username: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ username, onChange }: Props) => {
  return (
    <TextField
      sx={{ width: "100%" }}
      label="Search GitHub User"
      variant="outlined"
      value={username}
      onChange={onChange}
    />
  );
};

export default SearchInput;
