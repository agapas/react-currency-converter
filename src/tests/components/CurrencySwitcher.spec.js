import React from "react";
import { shallow } from "enzyme";
import { CurrencySwitcher } from "components/CurrencySwitcher";

describe ("CurrencySwitcher", () => {
  const getComp = (props = {}) => {
    const onSwitchMock = jest.fn();
    const comp = shallow(
      <CurrencySwitcher
        disabled={props.disabled}
        onSwitch={onSwitchMock}
      />
    );
      return { comp, onSwitchMock };
  };

  it ("should render successfully with minimum settings", () => {
    const { comp } = getComp();
    expect(comp.exists()).toBe(true);
  });

  it ("should render enabled button when disabled is undefined", () => {
    const { comp } = getComp();
    expect(comp.prop("disabled")).toBe(false);
  });

  it ("should render enabled button when disabled is false", () => {
    const { comp } = getComp({ disabled: false });
    expect(comp.prop("disabled")).toBe(false);
  });

  it ("should render disabled button when disabled is true", () => {
    const { comp } = getComp({ disabled: true });
    expect(comp.prop("disabled")).toBe(true);
  });

  it ("should use given onSwitch", () => {
    const { comp, onSwitchMock } = getComp();

    comp.simulate("click");

    expect(onSwitchMock).toHaveBeenCalledTimes(1);
  });
});
