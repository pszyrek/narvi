import { render, screen } from "@testing-library/react";
import SearchInput from "../SearchInput/SearchInput";
import userEvent from "@testing-library/user-event";

test("renders SearchInput with the correct label", () => {
  render(<SearchInput />);
  expect(screen.getByLabelText(/GitHub Username/i)).toBeInTheDocument();
});

test("renders SearchInput with a default value", () => {
  render(<SearchInput defaultValue="testuser" />);
  expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
});

test("calls onChange when the input value is changed", async () => {
  const user = userEvent.setup();
  const handleChange = jest.fn();

  render(<SearchInput onChange={handleChange} />);

  const input = screen.getByLabelText(/GitHub Username/i);

  await user.type(input, "newuser");

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledTimes(7);
});

test("passes props correctly to the TextField", () => {
  render(<SearchInput placeholder="Search GitHub Users" />);
  const input = screen.getByPlaceholderText("Search GitHub Users");

  expect(input).toBeInTheDocument();
});
