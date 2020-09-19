import React from "react";
import { Error } from "./Error";
import { LoadingIcon } from "./LoadingIcon";
import { CurrencyForm } from "./CurrencyForm";
import { Source } from "./Source";

// const mockData = {
//   "rates": {
//     "CAD": 1.5233,
//     "HKD": 8.6987,
//     "ISK": 156.3,
//     "PHP": 55.536,
//     "DKK": 7.4516,
//     "HUF": 352.55,
//     "CZK": 26.665,
//     "AUD": 1.6175,
//     "RON": 4.837,
//     "SEK": 10.4715,
//     "IDR": 16286.02,
//     "INR": 83.821,
//     "BRL": 6.0117,
//     "RUB": 80.2153,
//     "HRK": 7.557,
//     "JPY": 120.68,
//     "THB": 34.918,
//     "CHF": 1.0623,
//     "SGD": 1.5654,
//     "PLN": 4.4687,
//     "BGN": 1.9558,
//     "TRY": 7.6957,
//     "CNY": 7.931,
//     "NOK": 10.6775,
//     "NZD": 1.7204,
//     "ZAR": 19.1761,
//     "USD": 1.1224,
//     "MXN": 25.3049,
//     "ILS": 3.8567,
//     "GBP": 0.9012,
//     "KRW": 1346.54,
//     "MYR": 4.8123,
//   },
//   "base": "EUR",
//   "date": "2020-07-03"
// };

export class DataController extends React.Component {
  static displayName = "DataController";
  state = {
    data: undefined,
    error: undefined,
    loading: false,
  };
  
  componentDidMount() {
    // this.setState({ data: mockData });
    this.loadData();
  }

  loadData = () => {
    const { url } = this.props;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            loading: false,
            data,
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
  }
  
  render() {
    const { url } = this.props;
    const { error, loading, data } = this.state;

    if (error) {
      return <Error message={error.message} />;
    }

    if (loading) {
      return <LoadingIcon />;
    }

    if (!data?.base || !data?.rates) {
      return (<Error message="There is no results to display. Please try again later." />);
    }

    const { base, rates, date } = data;

    return (<>
      <CurrencyForm base={base} rates={rates} />
      <Source url={url} date={date} />
    </>);
  }
}
