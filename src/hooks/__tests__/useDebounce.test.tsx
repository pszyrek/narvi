import React from "react";
import { render, act } from "@testing-library/react";
import useDebounce from "../useDebounce";

const TestComponent: React.FC<{ value: string; delay: number }> = ({
  value,
  delay,
}) => {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { getByTestId } = render(<TestComponent value="test" delay={500} />);
    expect(getByTestId("debounced-value")).toHaveTextContent("test");
  });

  it("should update the debounced value after the specified delay", () => {
    jest.useFakeTimers();

    const { getByTestId, rerender } = render(
      <TestComponent value="test" delay={500} />
    );

    expect(getByTestId("debounced-value")).toHaveTextContent("test");

    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId("debounced-value")).toHaveTextContent("updated");

    jest.useRealTimers();
  });

  it("should not update the debounced value before the delay", () => {
    jest.useFakeTimers();

    const { getByTestId, rerender } = render(
      <TestComponent value="test" delay={500} />
    );

    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(300); // 300ms
    });

    expect(getByTestId("debounced-value")).toHaveTextContent("test");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(getByTestId("debounced-value")).toHaveTextContent("updated");

    jest.useRealTimers();
  });
});
