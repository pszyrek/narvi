import { render, screen } from "@testing-library/react";

import { User } from "../../types/user";
import UserCard from "../UserCard/UserCard";

const mockUser: User = {
  id: 1,
  login: "testuser",
  avatar_url: "https://example.com/avatar.jpg",
};

describe("UserCard", () => {
  test("renders UserCard with the user's avatar and login", () => {
    render(<UserCard user={mockUser} />);

    const avatar = screen.getByAltText(mockUser.login);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", mockUser.avatar_url);

    const loginText = screen.getByText(mockUser.login);
    expect(loginText).toBeInTheDocument();
  });

  test("displays correct avatar size", () => {
    render(<UserCard user={mockUser} />);
    const avatar = screen.getByAltText(mockUser.login);

    expect(avatar).toHaveStyle({ width: "100%", height: "100%" });
  });
});
