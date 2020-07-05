import React from "react";

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
    const { date, rates, base } = this.props;

    const currencyOptions = Object.keys(rates).sort((a, b) => a[0].localeCompare(b[0]));
    
    // console.log({ entries: Object.entries(rates).sort((a, b) => a[0].localeCompare(b[0])) });
    const sortedRates = Object.entries(rates).sort((a, b) => a[0].localeCompare(b[0]));

    return (
      <>
        <p>{date}</p>
        <div key={base} className="currency">
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
        </div>

        <form onSubmit={this.onSubmit}>
          <label>
            Amount:
            <input type="text" value={amount} onChange={this.onChangeAmount} />
          </label>
          <label>
            From:
            <select value={from} onChange={this.onChangeFrom}>
              {currencyOptions.map((entry) =>
                <option key={entry} className="currency" value={entry}>
                  {entry}
                </option>)
              }
            </select>
          </label>
          <label>
            To:
            <select value={to} onChange={this.onChangeTo}>
              {currencyOptions.map((entry) =>
                <option key={entry} className="currency" value={entry}>
                  {entry}
                </option>)
              }
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
