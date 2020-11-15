import React from "react";
import { shallow } from "enzyme";
import { SelectCustomOption } from "components/SelectCustomOption";

describe("SelectCustomOption", () => {
  const getComp = (props) =>
    shallow(<SelectCustomOption label={props?.label} value={props?.value} />);

  it("should not explode without given props", () => {
    const comp = getComp();
    expect(comp.exists()).toBe(true);
    expect(comp.html()).toEqual('<div class="currency-option"></div>');
  });

  it("should display currency flag for given value", () => {
    const comp = getComp({ value: "eur" });
    expect(comp.find(".currency-flag-eur").exists()).toBe(true);
    expect(comp.text()).toEqual("");
  });

  it("should display given label", () => {
    const comp = getComp({ label: "EUR" });
    expect(comp.find(".currency-option").text()).toEqual("EUR");
    expect(comp.find(".currency-flag-eur").exists()).toBe(false);
  });

  it("should display flag icon and label when all props are set", () => {
    const comp = getComp({ label: "EUR", value: "eur" });
    expect(comp.find(".currency-flag-eur").exists()).toBe(true);
    expect(comp.find(".currency-option").text()).toEqual("EUR");
  });
});
