import React from "react";
import { shallow } from "enzyme";
import { CurrencyForm } from "components/CurrencyForm";
import { Amount } from "components/Amount";
import { CurrencySelector } from "components/CurrencySelector";
import { CurrencySwitcher } from "components/CurrencySwitcher";
import { Result } from "components/Result";

describe("CurrencyForm", () => {
  const getComp = (props = {}) => shallow(
    <CurrencyForm
      base={props.base}
      rates={props.rates}
    />
  );

  it ("should render successfully with default settings", () => {
    expect(getComp().type()).toBe("form");
  });

  it ("should render Amount component with default settings", () => {
    const comp = getComp();

    const amount = comp.find(Amount);
    expect(amount.prop("error")).toBeUndefined();
    expect(amount.prop("value")).toEqual("1");
  });

  it ("should render 2 currency selectors with default settings", () => {
    const comp = getComp();

    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);

    const firstSelector = currencySelectors.first();
    expect(firstSelector.prop("label")).toEqual("From");
    expect(firstSelector.prop("options")).toEqual([]);
    expect(firstSelector.prop("value")).toBeUndefined();

    const lastSelector = currencySelectors.last();
    expect(lastSelector.prop("label")).toEqual("To");
    expect(lastSelector.prop("options")).toEqual([]);
    expect(lastSelector.prop("value")).toBeUndefined();
  });

  it ("should render CurrencySwitcher component with default settings", () => {
    const comp = getComp();
    expect(comp.find(CurrencySwitcher).prop("value")).toEqual({});
  });

  it ("should render submit button", () => {
    const comp = getComp();
    expect(comp.find("input[type='submit']").exists()).toBe(true);
  });

  it ("should render Result component with default settings", () => {
    const comp = getComp();
    expect(comp.find(Result).prop("value")).toBeUndefined();
  });

  it ("should use given props to set options of CurrencySelector components", () => {
    const rates = {
      GBP: 0.89755,
      USD: 1.1769,
    }
    const expectedOptions = [
      { label: "EUR", value: "eur" },
      { label: "GBP", value: "gbp" },
      { label: "USD", value: "usd" },
    ];
    const comp = getComp({ base: "EUR", rates });

    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);

    const firstSelector = currencySelectors.first();
    expect(firstSelector.prop("options")).toEqual(expectedOptions);

    const lastSelector = currencySelectors.last();
    expect(lastSelector.prop("options")).toEqual(expectedOptions);
  });
});

// describe("CurrencyForm functions", () => {
//   describe("getAmountError", () => {
//     it ("should return error message for undefined value", () => {
//       expect(getAmountError()).toEqual("The amount is required");
//     });

//     it ("should return error message for non numeric value", () => {
//       expect(getAmountError("abc")).toEqual("The amount must be a number");
//     });

//     it ("should return error message for value smaller than 0", () => {
//       expect(getAmountError("-1")).toEqual("The amount must be bigger than 0");
//     });

//     it ("should return error message for value equal 0", () => {
//       expect(getAmountError("0")).toEqual("The amount must be bigger than 0");
//     });

//     it ("should return undefined for valid value", () => {
//       expect(getAmountError("100")).toBeUndefined();
//     });
//   });
// });
