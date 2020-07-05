import React from "react";
import { shallow } from "enzyme";
import App, { API_URL } from "App";
import { CurrencyForm } from "components/CurrencyForm";

describe("App", () => {
  const comp = shallow(<App />);

  it ("should render without crashing", () => {
    expect(comp.exists()).toBe(true);
    expect(comp.hasClass("app")).toBe(true);
  });

  it ("should render header", () => {
    const header = comp.find(".app-header");
    expect(header.exists()).toBe(true);
    expect(header.text()).toEqual("Currency converter");
  });

  it ("should pass API_URL as a prop into CurrencyForm", () => {
    const currencyForm = comp.find(CurrencyForm);
    expect(currencyForm.exists()).toBe(true);
    expect(currencyForm.prop("url")).toEqual(API_URL);
  });
});
