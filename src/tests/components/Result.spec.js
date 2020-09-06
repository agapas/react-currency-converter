import React from "react";
import { shallow } from "enzyme";
import { Result } from "components/Result";

describe("Result", () => {
  const getComp = (value) => shallow(<Result value={value} />);

  it ("should render successfully with minimum settings", () => {
    expect(getComp().exists()).toBe(true);
  });

  it ("should render label and disabled input", () => {
    const comp = getComp();

    const label = comp.find(".label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Result:");

    const input = comp.find("input");
    expect(input.exists()).toBe(true);
    expect(input.prop("value")).toBeUndefined();
    expect(input.prop("disabled")).toBe(true);
  });

  it ("should display given value", () => {
    const comp = getComp(123.45);
    expect(comp.find("input").prop("value")).toEqual(123.45);
  });
});
