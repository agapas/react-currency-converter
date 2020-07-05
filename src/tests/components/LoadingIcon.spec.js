import React from "react";
import { shallow } from "enzyme";
import { LoadingIcon } from "components/LoadingIcon";

describe("LoadingIcon", () => {
  it ("should render successfully", () => {
    const comp = shallow(<LoadingIcon />);
    expect(comp.hasClass("loading-icon")).toBe(true);
  });
});
