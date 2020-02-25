import React from "react";
import { shallow } from "enzyme";

import PageHeader from "./PageHeader";

const defaultProps = {
  headerText: "Test Header"
};

describe("PageHeader", () => {
  it("renders correctly with default props", () => {
    const wrapper = shallow(<PageHeader {...defaultProps} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("correctly passes text to main header", () => {
    const newHeaderText = "New Test Header";
    const newProps = { ...defaultProps, headerText: newHeaderText };
    const wrapper = shallow(<PageHeader {...newProps} />);
    const mainHeader = wrapper.find("h1.PageHeader");
    expect(mainHeader.text()).toBe(newHeaderText);
  });
});
