import React, { Component } from "react";
import "./NavBar.css";
import logoIcon from "./../assets/logo.svg";
import cartIcon from "./../assets/icon/cart.svg";
import CartOverlayComponent from "./CartOverlay";
import BackdropComponent from "./Backdrop";
import CurrencySwitcherComponent from "./CurrencySwitcher";

import { connect } from "react-redux";
import {
  getCategoryNames,
  getCategoryByTitle,
  loadCategoryDetails,
} from "../actions/categoriesActions";

class NavBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBag: false,
      displayCurrencySwitcher: false,
      currencySymbol: "$",
      inverted : false,
      categoryNames: [{ title: "all" }],
    };

    this.showCurrencySwitcher = this.showCurrencySwitcher.bind(this);
    this.showMyBag = this.showMyBag.bind(this);
    this.selectCategoryName = this.selectCategoryName.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
  }
  // Show currency switcher
  showCurrencySwitcher = () => {
    this.setState({
      displayCurrencySwitcher: !this.state.displayCurrencySwitcher,
    });
    // Animated opening and closing
    this.setState({inverted : !this.state.inverted})
  };

  // Display the Cart Overlay
  showMyBag = () => {
    this.setState({ showBag: !this.state.showBag });
  };

  // Close the Cart Overlay
  closeOverlayHandler = () => {
    this.setState({ showBag: false });
  };


  componentDidUpdate(prevProps) {

    // Obtain the currency selected using currency index location in currencies
    if (this.props.currencyIndex !== prevProps.currencyIndex) {
      const currencyIndex = this.props.currencyIndex;
      const [currencies] = this.props.currencies;
      const { symbol } = currencies.find((curr, index) => {
        if (index === currencyIndex) return curr;
      });
      this.setState({ currencySymbol: symbol });
    }
  }

  // Select Category by name(title)
  selectCategoryName = async (_title) => {
    this.setState({ categoryName: _title });
    await this.props.getCategoryByTitle(_title);
  };

  // On Mount
  async componentDidMount() {
    const { getCategoryNames } = this.props;
    await getCategoryNames();
    // Set the category names
    this.setState({ categoryNames: this.props.names });

    // Obtain the first result's title
    let title = this.props.names[0];
    this.selectCategoryName(title.title);
  }

  render() {
    let className = "nav-link-active";
    if (this.props.isActive) {
      className += "nav-link-active";
    }

    return (
      <>
        <nav>
          <header className="navigation">
            <div className="category-name">
              {this.state.categoryNames.map(({ title }) => {
                return (
                  <a
                    href="#"
                    className={className}
                    key={title}
                    onClick={() => {
                      this.selectCategoryName(title);
                    }}
                  >
                    {title}
                  </a>
                );
              })}
            </div>
            <div id="logo-wrapper">
              <img id="logo" src={logoIcon} alt="Logo" />
            </div>
            <div className="category-action-buttons">
              <span
                name="currency-switcher"
                id="currency-switcher"
                className={ this.state.inverted ? 'inverted' : ""}
                onClick={this.showCurrencySwitcher}
              >
                {this.state.currencySymbol}
                {this.state.displayCurrencySwitcher === true && (
                  <CurrencySwitcherComponent />
                )}
              </span>

              <span id="cart-btn" onClick={this.showMyBag}>
                <span id="cart-number-icon">3</span>
                <img className="cart-icon" src={cartIcon} alt="cart-icon" />
                {/* Cart Overlay */}
                {this.state.showBag === true && <CartOverlayComponent />}
              </span>

              {/* Overlay Backdrop */}
              {this.state.showBag === true && (
                <BackdropComponent
                  show={this.state.showBag}
                  clicked={this.closeOverlayHandler}
                />
              )}
            </div>
          </header>
        </nav>
      </>
    );
  }
}

// Redux Operations
const mapStateToProps = (state) => ({
  names: state.category.names,
  category: state.category.category,
  currencyIndex: state.category.currencyIndex,
  currencies: state.category.currencies,
});

export default connect(mapStateToProps, {
  getCategoryNames,
  getCategoryByTitle,
  loadCategoryDetails,
})(NavBarComponent);
