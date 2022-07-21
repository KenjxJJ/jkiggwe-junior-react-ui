import React, { Component } from "react";
import { getCurrencies } from "../queries/CurrencySwitcherQuery";
import "./CurrencySwitcher.css";

class CurrencySwitcherComponent extends Component {
  constructor() {
    super();
    this.state = {
      allCurrencies: null,
      loading: false,
    };
  }

  async componentDidMount() {
    const { currencies } = await getCurrencies();
    // Update state of currencies
    this.setState({ allCurrencies: currencies });
  }

  render() {
    let { allCurrencies } = this.state;

    if (allCurrencies !== null) {
      return (
        <>
          <section className="currency-widget">
            {allCurrencies.map(({ label, symbol }) => {
              return (
                <span key={label}>
                  {symbol} {label}
                </span>
              );
            })}
          </section>
        </>
      );
    } 
    // else {
    //   return (
    //     <div className="currency-widget">
    //       <small>Loading...</small>
    //     </div>
    //   );
    // }
  }
}

export default CurrencySwitcherComponent;
