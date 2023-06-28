import { render, screen } from "@testing-library/react";

import Calendar from "./components/Calendar";
import moment from "moment";

test("testing selected date in calendar", () => {
  render(<Calendar date={moment("2023-06-27")} />);
  const linkElement = screen.getByTestId("selected_date");
  expect(linkElement).toHaveTextContent("27");
});
