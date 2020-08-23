import React from "react";
import Select from "react-select";
import { shallow } from "enzyme";
import { CurrencySelector } from "components/CurrencySelector";

describe("CurrencySelector", () => {
  const options = [
    { label: "OPTION 1", value: "option 1" },
    { label: "OPTION 2", value: "option 2" },
  ];

  const getComp = (props = {}) => shallow(
    <CurrencySelector
      label={props.label}
      options={props.options}
      value={props.value}
      onChange={props.onChange}
    />
  );

  it ("should not explode without given props", () => {
    const comp = getComp();
    expect(comp.exists()).toBe(true);

    const label = comp.find(".label");
    expect(label.text()).toEqual("Currency:");
    
    const select = comp.find(Select);
    expect(select.prop("options")).toEqual([]);
    expect(select.prop("value")).toBeNull();
  });

  it ("should display given label", () => {
    const comp = getComp({ label: "Some Label"});

    const label = comp.find(".label");
    expect(label.text()).toEqual("Some Label:");
  });

  it ("should pass given options and value into Select component", () => {
    const comp = getComp({ options, value: options[0] });

    const select = comp.find(Select);
    expect(select.prop("options")).toEqual(options);
    expect(select.prop("value")).toEqual(options[0]);
  });

  it ("should use given onChange", () => {
    const mockOnChange = jest.fn();
    const comp = getComp({ onChange: mockOnChange });

    comp.find(Select).invoke("onChange")(options[1]);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith(options[1]);
  });
});
