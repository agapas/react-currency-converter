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
const currencyOptions = [
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
  { label: "USD", value: "usd" },
];

describe("CurrencyForm", () => {
  const getComp = (noData) => shallow(
    <CurrencyForm
      base={noData ? undefined : base}
      rates={noData ? undefined : rates} />
  );

  it("should not explode when no given props", () => {
    const comp = getComp(true);
    expect(comp.exists()).toBe(true);
    expect(comp.type()).toBe("form");
  });

  it("should render currency selectors without options when no given props", () => {
    const comp = getComp(true);
    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);
    currencySelectors.forEach(selector => {
      expect(selector.prop("options")).toEqual([]);
    });
  });

  it("should render successfully when base and rates are defined", () => {
    const comp = getComp();
    expect(comp.exists()).toBe(true);
    expect(comp.type()).toBe("form");
  });

  it("should render Amount component by default", () => {
    const comp = getComp();
    const amount = comp.find(Amount);
    expect(amount.exists()).toBe(true);
    expect(amount.prop("error")).toBeUndefined();
    expect(amount.prop("value")).toEqual("1");
  });

  it("should render 2 currency selectors when by default", () => {
    const comp = getComp();

    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);

    const fromSelector = currencySelectors.filter({ label: "From" });
    expect(fromSelector.exists()).toBe(true);
    expect(fromSelector.prop("options")).toEqual(currencyOptions);
    expect(fromSelector.prop("value")).toBeUndefined();

    const toSelector = currencySelectors.filter({ label: "To" });
    expect(toSelector.exists()).toBe(true);
    expect(toSelector.prop("options")).toEqual(currencyOptions);
    expect(toSelector.prop("value")).toBeUndefined();
  });

  it("should render CurrencySwitcher component by default", () => {
    const comp = getComp();
    const currencySwitcher = comp.find(CurrencySwitcher);
    expect(currencySwitcher.exists()).toBe(true);
    expect(currencySwitcher.prop("disabled")).toBe(true);
  });

  it("should render submit button by default", () => {
    const comp = getComp();
    expect(comp.find("input[type='submit']").exists()).toBe(true);
  });

  it("should render Result component by default", () => {
    const comp = getComp();
    expect(comp.find(Result).prop("value")).toBeUndefined();
  });

  it("should deal with amount change", () => {
    const comp = getComp();
    const amount = comp.find(Amount);
    amount.invoke("onChange")({ target: { value: 100 } });
    expect(comp.find(Amount).prop("value")).toEqual(100);
  });

  it("should deal with currency 'from' change", () => {
    const comp = getComp();
    const fromSelector = comp.find(CurrencySelector).filter({ label: "From" });

    const from = { label: "GBP", value: "gbp" };
    fromSelector.invoke("onChange")(from);

    expect(comp.find(CurrencySelector).filter({ label: "From" }).prop("value"))
      .toEqual(from);
  });

  it("should deal with currency 'to' change", () => {
    const comp = getComp();
    const toSelector = comp.find(CurrencySelector).filter({ label: "To" });

    const to = { label: "USD", value: "usd" };
    toSelector.invoke("onChange")(to);

    expect(comp.find(CurrencySelector).last().prop("value")).toEqual(to);
  });

  it("should deal with currency switch", () => {
    const comp = getComp();

    const from = { label: "EUR", value: "eur" };
    const to = { label: "USD", value: "usd" };
    comp.setState({ from, to });

    const fromSelector = comp.find(CurrencySelector).filter({ label: "From" });
    expect(fromSelector.prop("value")).toEqual(from);

    const toSelector = comp.find(CurrencySelector).filter({ label: "To" });
    expect(toSelector.prop("value")).toEqual(to);

    const currencySwitcher = comp.find(CurrencySwitcher);
    currencySwitcher.invoke("onSwitch")();

    expect(comp.find(CurrencySelector).filter({ label: "From" }).prop("value"))
      .toEqual(to);

    expect(comp.find(CurrencySelector).filter({ label: "To" }).prop("value"))
      .toEqual(from);
  });

  it("should submit currency form value", () => {
    const comp = getComp();

    const from = { label: "EUR", value: "eur" };
    const to = { label: "USD", value: "usd" };
    comp.setState({ from, to, amount: { value: "100" } });

    comp.find("form").invoke("onSubmit")({ preventDefault: () => true });

    const fromRate = rates["EUR"];
    const toRate = rates["USD"];
    const expectedResultValue = (100 * toRate) / fromRate;

    expect(comp.find(Result).prop("value")).toEqual(expectedResultValue);
  });
});

describe("CurrencyForm functions", () => {
  describe("getCurrencyOptions", () => {
    it("should return currency options when selectedRate has falsy value", () => {
      expect(getCurrencyOptions(rates, undefined)).toEqual(currencyOptions);
      expect(getCurrencyOptions(rates, {})).toEqual(currencyOptions);
    });

    it("should return currency options without given selected rate", () => {
      const selectedRate = { label: "EUR", value: "eur" };
      expect(getCurrencyOptions(rates, selectedRate)).toEqual([
        { label: "GBP", value: "gbp" },
        { label: "USD", value: "usd" },
      ]);
    });
  });

  describe("getAmountError", () => {
    it("should return error message for undefined value", () => {
      expect(getAmountError()).toEqual("The amount is required");
    });

    it("should return error message for non numeric value", () => {
      expect(getAmountError("abc")).toEqual("The amount must be a number");
    });

    it("should return error message for value smaller than 0", () => {
      expect(getAmountError("-1")).toEqual("The amount must be bigger than 0");
    });

    it("should return error message for value equal 0", () => {
      expect(getAmountError("0")).toEqual("The amount must be bigger than 0");
    });

    it("should return undefined for valid value", () => {
      expect(getAmountError("100")).toBeUndefined();
    });
  });

  describe("convertAmount", () => {
    it("should return 0 when amount is not valid", () => {
      const amount = {
        error: "The amount is required",
        value: undefined,
      };
      expect(convertAmount(base, rates, amount, "EUR", "USD")).toEqual(0);
    });

    it("should return 0 when 'from' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      };
      expect(convertAmount(base, rates, amount, undefined, "USD")).toEqual(0);
    });

    it("should return 0 when 'to' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      };
      expect(convertAmount(base, rates, amount, "USD", undefined)).toEqual(0);
    });

    it("should return converted amount", () => {
      const amount = {
        error: undefined,
        value: 100,
      };
      expect(convertAmount(base, rates, amount, "EUR", "USD")).toEqual(
        rates["USD"] * 100
      );
    });
  });
});
