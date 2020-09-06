import React from "react";
import { shallow } from "enzyme";
import { SelectCustomOption } from "components/SelectCustomOption";

describe("SelectCustomOption", () => {
  const getComp = (props = {}) => shallow(
    <SelectCustomOption
      label={props.label}
      value={props.value}
    />
  );

  it ("should not explode without given props", () => {
    expect(getComp().exists()).toBe(true);
  });

  it("should display currency flag for given value", () => {
    const comp = getComp({ value: "eur" });
    expect(comp.find(".currency-flag-eur").exists()).toBe(true);
  });

  
  it("should display given label", () => {
    const comp = getComp({ label: "EUR" });
    expect(comp.find(".currency-option").text()).toEqual("EUR");
  });

});
