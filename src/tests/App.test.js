import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";

describe("<App />", () => {
  it("Renders <App/> correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Sort By/i)).toBeInTheDocument();
  });
});
