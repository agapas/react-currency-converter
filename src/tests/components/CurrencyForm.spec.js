import React from "react";
import { shallow } from "enzyme";
import {
  CurrencyForm,
  getCurrencyOptions,
  getAmountError,
  convertAmount,
} from "components/CurrencyForm";
import { Amount } from "components/Amount";
import { CurrencySelector } from "components/CurrencySelector";
import { CurrencySwitcher } from "components/CurrencySwitcher";
import { Result } from "components/Result";
import { mockData } from "../testsUtils";

const { base, rates } = mockData;

describe("CurrencyForm", () => {
  const comp = shallow(<CurrencyForm base={base} rates={rates} />);

  it ("should render successfully with default settings", () => {
    expect(comp.exists()).toBe(true);
    expect(comp.type()).toBe("form");
  });

  it ("should render Amount component with default settings", () => {
    const amount = comp.find(Amount);
    expect(amount.prop("error")).toBeUndefined();
    expect(amount.prop("value")).toEqual("1");
  });

  it ("should render 2 currency selectors", () => {
    const expectedOptions = [
      { label: "EUR", value: "eur" },
      { label: "GBP", value: "gbp" },
      { label: "USD", value: "usd" },
    ];

    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);

    const firstSelector = currencySelectors.first();
    expect(firstSelector.prop("label")).toEqual("From");
    expect(firstSelector.prop("options")).toEqual(expectedOptions);
    expect(firstSelector.prop("value")).toBeUndefined();

    const lastSelector = currencySelectors.last();
    expect(lastSelector.prop("label")).toEqual("To");
    expect(lastSelector.prop("options")).toEqual(expectedOptions);
    expect(lastSelector.prop("value")).toBeUndefined();
  });

  it ("should render CurrencySwitcher component with default settings", () => {
    expect(comp.find(CurrencySwitcher).prop("value")).toEqual({});
  });

  it ("should render submit button", () => {
    expect(comp.find("input[type='submit']").exists()).toBe(true);
  });

  it ("should render Result component with default settings", () => {
    expect(comp.find(Result).prop("value")).toEqual(0);
  });

  it ("should deal with amount change", () => {
    const amount = comp.find(Amount);
    amount.invoke("onChange")({ target: { value: 100 }});
    expect(comp.find(Amount).prop("value")).toEqual(100);
  });

  it ("should deal with currency 'from' change", () => {
    const fromCurrencySelector = comp.find(CurrencySelector).first();

    const newValue = { label: "GBP", value: "gbp" };
    fromCurrencySelector.invoke("onChange")(newValue);

    expect(comp.find(CurrencySelector).first().prop("value")).toEqual(newValue);
  });

  it ("should deal with currency 'to' change", () => {
    const toCurrencySelector = comp.find(CurrencySelector).last();

    const newValue = { label: "USD", value: "usd" };
    toCurrencySelector.invoke("onChange")(newValue);

    expect(comp.find(CurrencySelector).last().prop("value")).toEqual(newValue);
  });

  it ("should deal with currency switch", () => {
    const currencySwitcher = comp.find(CurrencySwitcher);
    expect(comp.find(CurrencySwitcher).prop("value")).toEqual({
      from: { label: "GBP", value: "gbp" },
      to: { label: "USD", value: "usd" },
    });

    currencySwitcher.invoke("onChange")({ preventDefault: () => true });

    expect(comp.find(CurrencySwitcher).prop("value")).toEqual({
      from: { label: "USD", value: "usd" },
      to: { label: "GBP", value: "gbp" },
    });
  });

  it ("should submit currency form value", () => {
    const fromRate = rates["USD"];
    const toRate = rates["GBP"];
    const expectedValue = 100 * toRate / fromRate;

    comp.find("form").invoke("onSubmit")({ preventDefault: () => true });
  
    expect(comp.find(Result).prop("value")).toEqual(expectedValue);
  });
});

describe("CurrencyForm functions", () => {
  describe("getCurrencyOptions", () => {
    it ("should return array with currency options", () => {
      expect(getCurrencyOptions(base, rates)).toEqual([
        { label: "EUR", value: "eur" },
        { label: "GBP", value: "gbp" },
        { label: "USD", value: "usd" },
      ]);
    });
  });

  describe("getAmountError", () => {
    it ("should return error message for undefined value", () => {
      expect(getAmountError()).toEqual("The amount is required");
    });

    it ("should return error message for non numeric value", () => {
      expect(getAmountError("abc")).toEqual("The amount must be a number");
    });

    it ("should return error message for value smaller than 0", () => {
      expect(getAmountError("-1")).toEqual("The amount must be bigger than 0");
    });

    it ("should return error message for value equal 0", () => {
      expect(getAmountError("0")).toEqual("The amount must be bigger than 0");
    });

    it ("should return undefined for valid value", () => {
      expect(getAmountError("100")).toBeUndefined();
    });
  });

  describe ("convertAmount", () => {
    it ("should return 0 when amount is not valid", () => {
      const amount = {
        error: "The amount is required",
        value: undefined,
      }
      expect(convertAmount(base, rates, amount, "EUR", "USD")).toEqual(0);
    });

    it ("should return 0 when 'from' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      }
      expect(convertAmount(base, rates, amount, undefined, "USD")).toEqual(0);
    });

    it ("should return 0 when 'to' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      }
      expect(convertAmount(base, rates, amount, "USD", undefined)).toEqual(0);
    });

    it ("should return converted amount", () => {
      const amount = {
        error: undefined,
        value: 100,
      }
      expect(convertAmount(base, rates, amount, "EUR", "USD")).toEqual(rates["USD"]*100);
    });
  });
});
