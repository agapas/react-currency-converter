import React from "react";
import { Amount } from "./Amount";
import { CurrencySelector } from "./CurrencySelector";
import { CurrencySwitcher } from "./CurrencySwitcher";

const getSorted = (arrayToSort) => arrayToSort.sort((a, b) => a[0].localeCompare(b[0]));

const getCurrencyOptions = (rates) => {
  const sorted = getSorted(Object.keys(rates));
  return sorted.map(s => ({ label: s, value: s.toLowerCase() }));
};

export class CurrencyForm extends React.Component {
  static displayName = "CurrencyForm";
  state = {
    amount: 1,
    from: undefined,
    to: undefined,
    value: undefined,
    // error: undefined,
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log("submitted: ", this.state.value);
  }

  onChangeAmount = (event) => {
    console.log("onChangeAmount: ", event.target.value);
    // const newAmount = event.target.value;
    // if (newAmount && !Number(newAmount)) {
    //   this.setState({ error: <strong>The amount must be a number</strong> });
    // }
    this.setState({ amount: event.target.value });
  }

  onChangeFrom = (event) => {
    console.log("onChangeFrom: ", event.target.value);
    this.setState({ from: event.target.value });
  }

  onChangeTo = (event) => {
    console.log("onChangeTo: ", event.target.value);
    this.setState({ to: event.target.value });
  }
  
  render() {
    const { amount, from, to } = this.state;
    const { rates /*, base */ } = this.props;
    
    // const sortedRates = getSorted(Object.entries(rates));
    const currencyOptions = getCurrencyOptions(rates);

    const errorClass = !!amount ? "" : "has-error" ;

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <Amount className={errorClass} value={amount} onChange={this.onChangeAmount} />
          <CurrencySelector
            label="From"
            options={currencyOptions}
            value={from}
            onChange={this.onChangeFrom}
          />
          <CurrencySwitcher />
          <CurrencySelector
            label="To"
            options={currencyOptions}
            value={to}
            onChange={this.onChangeTo}
          />
          <input type="submit" value="Submit" />
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
