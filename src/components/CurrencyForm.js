import React from "react";
import { Amount } from "./Amount";
import { CurrencySelector } from "./CurrencySelector";
import { CurrencySwitcher } from "./CurrencySwitcher";

const getSorted = (arrayToSort) => arrayToSort.sort((a, b) => a[0].localeCompare(b[0]));

const getCurrencyOptions = (base, rates) => {
  const ratesWithBase = Object.keys(rates).concat(base);
  const sorted = getSorted(ratesWithBase);
  return sorted.map(s => ({ label: s, value: s.toLowerCase() }));
};

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const getAmountError = (value) => {
  return value
    ? isNumeric(value)
      ? value <= 0
        ? "The amount must be bigger than 0"
        : undefined
      : "The amount must be a number"
    : "The amount is required";
};

export class CurrencyForm extends React.Component {
  static displayName = "CurrencyForm";
  state = {
    amount: 1,
    from: undefined,
    to: undefined,
    value: undefined,
    error: undefined,
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target.value);
  }

  onChangeAmount = (e) => {
    const error = getAmountError(e.target.value);
    this.setState({ amount: e.target.value, error });
  }

  onChangeFrom = (val) => {
    console.log("onChangeFrom: ", val);
    this.setState({ from: val });
  }

  onChangeTo = (val) => {
    console.log("onChangeTo: ", val);
    this.setState({ to: val });
  }

  // TODO: make it fully work (changing state here don't change values of both selectors)
  onSwitch = (e) => {
    e.preventDefault();
    console.log("onSwitch");
    const { from, to } = this.state;
    this.setState({ from: to, to: from });
  }
  
  render() {
    const { amount, from, to, error } = this.state;
    const { rates, base } = this.props;
    
    // const sortedRates = getSorted(Object.entries(rates));
    const currencyOptions = getCurrencyOptions(base, rates);

    const errorClass = error ? "has-error" : "";

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <Amount className={errorClass} error={error} value={amount} onChange={this.onChangeAmount} />
          <CurrencySelector
            label="From"
            options={currencyOptions}
            value={from}
            onChange={this.onChangeFrom}
          />
          <CurrencySwitcher value={{ from, to }} onChange={this.onSwitch} />
          <CurrencySelector
            label="To"
            options={currencyOptions}
            value={to}
            onChange={this.onChangeTo}
          />
          <input className="button" type="submit" value="Submit" />

          <label className="result">
            <div className="label">Result:</div>
            <input type="text" value={this.state.value || 0} onChange={undefined} disabled />
          </label>
        </form>


        {/* just temporary to see entire data */}
        {/* <div key={base} className="currency">
          <div className={`currency-flag currency-flag-${base.toLowerCase()}`}></div>
          <div className="currency-code">{`${base}: 1.0000`}</div>
        </div>
        <div>{
          sortedRates.map((entry) => {
              const [key, val] = entry;
              return <div key={key} className="currency">
                <div className={`currency-flag currency-flag-${key.toLowerCase()}`}></div>
                <div className="currency-code">{`${key}: ${val}`}</div>
              </div>
            })
          }
        </div> */}
      </>
    );
  }
}
