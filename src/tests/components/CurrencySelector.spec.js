import React from "react";
import Select, { components } from "react-select";
import { shallow } from "enzyme";
import {
  CurrencySelector,
  SelectIconOption,
  SelectValueOption,
} from "components/CurrencySelector";
import { SelectCustomOption } from "components/SelectCustomOption";

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
    expect(label.exists()).toBe(false);
    
    const select = comp.find(Select);
    expect(select.exists()).toBe(true);
    expect(select.prop("options")).toEqual([]);
    expect(select.prop("value")).toBeNull();
    expect(select.prop("onChange")).toBeDefined();
  });

  it ("should display given label", () => {
    const comp = getComp({ label: "Some Label"});

    const label = comp.find(".label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Some Label:");
  });

  it ("should pass given options and value into Select component", () => {
    const comp = getComp({ options, value: options[0] });

    const select = comp.find(Select);
    expect(select.prop("options")).toEqual(options);
    expect(select.prop("value")).toEqual(options[0]);
  });

  it ("should set custom components prop in Select", () => {
    const comp = getComp();
    const select = comp.find(Select);
    const components = select.prop("components");
    expect(components.Option).toEqual(SelectIconOption);
    expect(components.SingleValue).toEqual(SelectValueOption);
  });

  it ("should set custom theme prop in Select", () => {
    const expectedTheme = {
      borderRadius: 2,
      colors: {
        primary50: "gold",
        primary25: "gold",
        primary: "gold",
        neutral60: "black",
        neutral40: "darkslategray",
        neutral30: "darkslategray",
        neutral20: "darkslategray",
      },
    };
    const comp = getComp();
    const select = comp.find(Select);
    expect(select.prop("theme")({})).toEqual(expectedTheme);
  });

  it ("should use given onChange", () => {
    const mockOnChange = jest.fn();
    const comp = getComp({ onChange: mockOnChange });

    comp.find(Select).invoke("onChange")(options[1]);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith(options[1]);
  });
});

describe ("SelectIconOption", () => {
  const { Option } = components;
  const props = { data: { label: "OPTION", value: "opt" }};

  it ("should render Option with given props", () => {
    const comp = shallow(<SelectIconOption props={props} />);
    expect(comp.exists()).toBe(true);

    const option = comp.find(Option);
    expect(option.type()).toEqual(Option);
    expect(option.props().props).toEqual({ ...props });

    const selectCustomOption = option.find("SelectCustomOption");
    expect(selectCustomOption.type()).toEqual(SelectCustomOption);
  });
});

describe ("SelectValueOption", () => {
  const { SingleValue } = components;
  const props = { data: { label: "OPTION", value: "opt" }};

  it ("should render SingleValue with given props", () => {
    const comp = shallow(<SelectValueOption props={props} />);
    expect(comp.exists()).toBe(true);

    const singleValue = comp.find(SingleValue);
    expect(singleValue.type()).toEqual(SingleValue);
    expect(singleValue.props().props).toEqual({ ...props });

    const selectCustomOption = singleValue.find("SelectCustomOption");
    expect(selectCustomOption.type()).toEqual(SelectCustomOption);
  });
});
