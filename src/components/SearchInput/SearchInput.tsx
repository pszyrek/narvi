import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export type Props = Omit<TextFieldProps, "fullWidth" | "variant" | "label">;

const SearchInput = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <TextField
    {...props}
    fullWidth
    label="GitHub Username"
    ref={ref}
    variant="outlined"
  />
));

export default SearchInput;
