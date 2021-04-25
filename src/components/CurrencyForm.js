import React from "react";
import { Amount } from "./Amount";
import { CurrencySelector } from "./CurrencySelector";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { Result } from "./Result";

const getSorted = (arrayToSort) =>
  arrayToSort.sort((a, b) => a[0].localeCompare(b[0]));

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const getCurrencyRate = (currency, base, rates) =>
  currency === base ? 1 : rates[currency];

export const getCurrencyOptions = (rates, selectedRate) => {
  const ratesKeys = Object.keys(rates);
  const ratesWitoutSelected = selectedRate
    ? ratesKeys.filter(rk => rk !== selectedRate.label)
    : ratesKeys;
  const sortedRates = getSorted(ratesWitoutSelected);
  return sortedRates.map((s) => ({ label: s, value: s.toLowerCase() }));
};

export const convertAmount = (base, rates, amount, from, to) => {
  const { value, error } = amount;
  if (error || !from || !to) return 0;

  const fromRate = getCurrencyRate(from, base, rates);
  const toRate = getCurrencyRate(to, base, rates);
  return (toRate * value) / fromRate;
};

export const getAmountError = (value) => {
  return value
    ? isNumeric(value)
      ? value <= 0
        ? "The amount must be bigger than 0"
        : undefined
      : "The amount must be a number"
    : "The amount is required";
};

export class CurrencyForm extends React.Component {
  static displayName = "CurrencyForm";
  state = {
    amount: {
      value: "1",
      error: undefined,
    },
    from: undefined,
    to: undefined,
    value: undefined,
  };

  onChangeAmount = (e) => {
    const error = getAmountError(e.target.value);
    const newAmount = { value: e.target.value, error };
    this.setState({ amount: newAmount });
  };

  onChangeFrom = (val) => {
    this.setState({ from: val });
  };

  onChangeTo = (val) => {
    this.setState({ to: val });
  };

  onSwitch = (e) => {
    e.preventDefault();
    const { from, to } = this.state;
    this.setState({ from: to, to: from });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { base, rates } = this.props;
    const { amount, from, to } = this.state;
    const newValue = convertAmount(base, rates, amount, from?.label, to?.label);
    this.setState({ value: newValue });
  };

  render() {
    const { amount, from, to, value } = this.state;
    const { value: amountValue, error } = amount;
    const { rates } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Amount
          error={error}
          value={amountValue}
          onChange={this.onChangeAmount}
        />
        <CurrencySelector
          label="From"
          options={getCurrencyOptions(rates, from)}
          value={from}
          onChange={this.onChangeFrom}
        />
        <CurrencySwitcher value={{ from, to }} onChange={this.onSwitch} />
        <CurrencySelector
          label="To"
          options={getCurrencyOptions(rates, to)}
          value={to}
          onChange={this.onChangeTo}
        />
        <input className="button" type="submit" value="Submit" />

        <Result value={value || 0} onChange={undefined} />
      </form>
    );
  }
}
