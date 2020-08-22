import React from "react";
import { shallow } from "enzyme";
import { CurrencySwitcher } from "components/CurrencySwitcher";

describe ("CurrencySwitcher", () => {
  const testValue = {
    from: "from",
    to: "to",
  };

  const getComp = (props = {}) => shallow(
    <CurrencySwitcher
      value={props.value}
      onChange={props.onChange}
    />
  );

  it ("should render successfully with minimum settings", () => {
    expect(getComp().exists()).toBe(true);
  });

  it ("should render disabled button when value is undefined", () => {
    expect(getComp().prop("disabled")).toBe(true);
  });

  it ("should render disabled button for value without 'from'", () => {
    expect(getComp({ value: { ...testValue, from: undefined }}).prop("disabled")).toBe(true);
  });

  it ("should render disabled button for value without 'to'", () => {
    expect(getComp({ value: { ...testValue, to: undefined }}).prop("disabled")).toBe(true);
  });

  it ("should render enabled button for value with 'from' and 'to'", () => {
    expect(getComp({ value: testValue }).prop("disabled")).toBe(false);
  });

  it ("should use given onChange", () => {
    const mockOnChange = jest.fn();
    const comp = getComp({ value: testValue, onChange: mockOnChange });

    comp.simulate("click");

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
