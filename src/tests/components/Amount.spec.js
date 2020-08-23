import React from "react";
import { shallow } from "enzyme";
import { Amount } from "components/Amount";

describe("Amount", () => {
  const getComp = (props = {}) => shallow(
    <Amount
      className={props.className}
      error={props.error}
      value={props.value}
      onChange={props.onChange}
    />
  );

  it ("should render successfully with minimum settings", () => {
    expect(getComp().exists()).toBe(true);
  });

  it ("should render label and input by default", () => {
    const comp = getComp();

    const label = comp.find(".label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Amount to convert:");

    const input = comp.find("input");
    expect(input.exists()).toBe(true);
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("Set Amount");
    expect(input.prop("value")).toBeUndefined();
    expect(input.prop("onChange")).toBeUndefined();
  });

  it ("should not display error by default", () => {
    const comp = getComp();
    expect(comp.prop("className")).toEqual("");
    expect(comp.find(".error-hint").exists()).toBe(false);
  });

  it ("should set error class and display hint when error is set", () => {
    const comp = getComp({ error: "error message" });
    expect(comp.prop("className")).toEqual("has-error");
    expect(comp.find(".error-hint").text()).toEqual("error message");
  });

  it ("should display given value", () => {
    const comp = getComp({ value: 1 });
    expect(comp.find("input").prop("value")).toEqual(1);
  });

  it ("should use given onChange", () => {
    const mockOnChange = jest.fn();
    const comp = getComp({ onChange: mockOnChange });

    comp.find("input").invoke("onChange")({ target: { value: "3" }});

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith({ target: { value: "3" }});
  });
});
