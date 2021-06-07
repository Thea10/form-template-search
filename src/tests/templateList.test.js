import React from "react";
import { render } from "@testing-library/react";
import TemplateList from "../features/Templates/TemplateList";
import TemplateCard from "../features/Templates/TemplateCard";

describe("template list views", () => {
  it("should show empty text description if templates length is 0", () => {
    const templates = [];
    const { getByText } = render(<TemplateList items={templates} />);
    expect(getByText(/No templates available/i)).toBeInTheDocument();
  });

});
