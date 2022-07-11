import React, { Component } from "react";
import "./CurrencySwitcher.css";

class CurrencySwitcherComponent extends Component {
  render() {
    return (
      <>
        <section className="currency-widget">
          <span>$ USD</span>
          <span>$ EUR</span>
          <span>$ JPY</span>
        </section>
      </>
    );
  }
}

export default CurrencySwitcherComponent;
