import React from "react";
import Select from "react-select";
import { shallow } from "enzyme";
import { CurrencySelector, CustomComponent } from "components/CurrencySelector";
import { SelectCustomOption } from "components/SelectCustomOption";

describe("CurrencySelector", () => {
  const options = [
    { label: "OPTION 1", value: "option 1" },
    { label: "OPTION 2", value: "option 2" },
  ];

  const getComp = (props = {}) =>
    shallow(
      <CurrencySelector
        label={props.label}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
      />
    );

  it("should not explode without given props", () => {
    const comp = getComp();

    expect(comp.exists()).toBe(true);
    expect(comp.find(".label").exists()).toBe(false);

    const select = comp.find(Select);
    expect(select.exists()).toBe(true);
    expect(select.prop("options")).toEqual([]);
    expect(select.prop("value")).toBeUndefined();
    expect(select.prop("onChange")).toBeDefined();
  });

  it("should display given label", () => {
    const comp = getComp({ label: "Some Label" });

    const label = comp.find(".label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Some Label:");
  });

  it("should pass given options into Select component", () => {
    const comp = getComp({ options });

    const select = comp.find(Select);
    expect(select.prop("options")).toEqual(options);
  });

  it("should pass given value into Select component", () => {
    const comp = getComp({ value: options[0] });

    const select = comp.find(Select);
    expect(select.prop("value")).toEqual(options[0]);
  });

  it("should set custom components prop in Select", () => {
    const comp = getComp({ options, value: options[0] });

    const componentsProp = comp.find(Select).prop("components");
    expect(componentsProp.Option).toBeDefined();
    expect(componentsProp.SingleValue).toBeDefined();
  });

  it("should use custom styles in theme prop of Select component", () => {
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
    expect(
      select.prop("theme")({
        colors: {
          primary50: "red",
        },
      })
    ).toMatchObject(expectedTheme);
  });

  it("should use given onChange", () => {
    const mockOnChange = jest.fn();
    const comp = getComp({ onChange: mockOnChange });

    comp.find(Select).invoke("onChange")(options[1]);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith(options[1]);
  });
});

describe("CustomComponent", () => {
  const dummyComp = (dummyProps) => (
    <div className="dummy" {...dummyProps}></div>
  );
  const props = {
    data: { label: "OPTION", value: "opt" },
    otherProp: "lalala",
  };

  it("should render given component as a wrapper with given props", () => {
    const comp = shallow(CustomComponent(dummyComp)(props));

    expect(comp.exists()).toBe(true);
    expect(comp.prop("className")).toEqual("dummy");
    expect(comp.prop("data")).toMatchObject(props.data);
    expect(comp.prop("otherProp")).toEqual(props.otherProp);
  });

  it("should render SelectCustomOption as a child with given props data", () => {
    const comp = shallow(CustomComponent(dummyComp)(props));

    const selectCustomOption = comp.find(SelectCustomOption);
    expect(selectCustomOption.exists()).toBe(true);
    expect(selectCustomOption.props()).toMatchObject({ ...props.data });
  });
});
