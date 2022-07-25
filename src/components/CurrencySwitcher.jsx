import React, { Component } from "react";
import { connect } from "react-redux";
import "./CurrencySwitcher.css";

import { changeCurrency, getAllCurrencies } from "../actions/categoriesActions";

class CurrencySwitcherComponent extends Component {
  constructor() {
    super();

    this.changeCurrencyHandler = this.changeCurrencyHandler.bind(this);
  }

  changeCurrencyHandler = (currencyName) => {
    // Find the currency index from state
    const currencyNameIndex = this.props.currencies[0].findIndex(
      (curr) => curr.label === currencyName
    );
    this.props.changeCurrency(currencyNameIndex);
  };

  async componentDidMount() {
    // Update state of currencies
    await this.props.getAllCurrencies();
  }
  
  render() {
    let [currencies] = this.props.currencies;

    if (currencies) {
      return (
        <>
          <section className="currency-widget">
            {currencies.map(({ label, symbol }) => {
              return (
                <span
                  key={label}
                  onClick={() => this.changeCurrencyHandler(label)}
                >
                  {symbol} {label}
                </span>
              );
            })}
          </section>
        </>
      );
    }
    else {
      return (
        <div className="currency-widget">
          <span>...</span>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const {currencies} = state.category;
  return { currencies };
};


export default connect(mapStateToProps, { changeCurrency, getAllCurrencies })(
  CurrencySwitcherComponent
);
