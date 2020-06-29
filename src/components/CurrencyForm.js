import React from 'react';
import { Error } from './Error';
import { LoadingIcon } from './LoadingIcon';

export class CurrencyForm extends React.Component {
  static displayName = "CurrencyForm";
  state = {
    data: undefined,
    error: undefined,
    loading: false,
  };
  
  componentDidMount() {
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
    const { error, loading, data } = this.state;

    if (error) {
      console.log({ error });
      return <Error message={error.message} />;
    }

    if (loading) {
      return <LoadingIcon />;
    }

    const { date, rates = {} } = data || {};

    return (
      <>
        <p>{date}</p>
        <div>{
          Object.entries(rates)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((entry) => {
              const [key, value] = entry;
              return <div key={key} className="currency">
                <div className={`currency-flag currency-flag-${key.toLowerCase()}`}></div>
                <div className="currency-code">{`${key}: ${value}`}</div>
              </div>
            })
          }
        </div>
      </>
    );
  }
}
