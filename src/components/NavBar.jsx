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
      bagSize: 0,
      inverted: false,
      categoryNames: [{ title: "all" }],
    };

    this.showCurrencySwitcher = this.showCurrencySwitcher.bind(this);
    this.showMyBag = this.showMyBag.bind(this);
    this.closeBagHandler = this.closeBagHandler.bind(this);
    this.selectCategoryName = this.selectCategoryName.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
  }
  // Show currency switcher
  showCurrencySwitcher = () => {
    this.setState({
      displayCurrencySwitcher: !this.state.displayCurrencySwitcher,
    });
    // Animated opening and closing
    this.setState({ inverted: !this.state.inverted });
  };

  // Display the Cart Overlay
  showMyBag = () => {
    this.setState({ showBag: true });
  };

  // Close the Cart Overlay
  closeOverlayHandler = () => {
    if (this.state.showBag) this.setState({ showBag: false });

    if (this.state.displayCurrencySwitcher)
      this.setState({ displayCurrencySwitcher: false });
  };

  closeBagHandler = (e) => {
    this.setState({ showBag: !this.state.showBag });
    e.stopPropagation();
  };

  componentDidUpdate(prevProps) {
    // Obtain the currency selected using currency index location in currencies
    if (this.props.currencyIndex !== prevProps.currencyIndex) {
      const currencyIndex = this.props.currencyIndex;
      const [currencies] = this.props.currencies;

      const { symbol } = currencies.find(
        (_curr, index) => index === currencyIndex
      );
      this.setState({ currencySymbol: symbol });
    }

    if (this.props.bagSize !== prevProps.bagSize) {
      this.setState({ bagSize: this.props.bagSize });
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

    // Set bag size
    this.setState({ bagSize: this.props.bagSize });
  }

  render() {
    let {
      inverted,
      bagSize,
      showBag,
      displayCurrencySwitcher,
      currencySymbol,
      categoryNames,
    } = this.state;

    let className = "nav-link-active";
    if (this.props.isActive) {
      className += "nav-link-active";
    }

    return (
      <>
        <nav>
          <header className="navigation">
            <div className="category-name">
              {categoryNames.map(({ title }) => {
                return (
                  <span
                    className={className}
                    key={title}
                    onClick={() => {
                      this.selectCategoryName(title);
                    }}
                  >
                    {title}
                  </span>
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
                className={inverted ? "inverted" : ""}
                onClick={this.showCurrencySwitcher}
              >
                {currencySymbol}
                {displayCurrencySwitcher === true && (
                  <CurrencySwitcherComponent />
                )}
              </span>
              {/* Overlay Backdrop */}
              {displayCurrencySwitcher === true && (
                <BackdropComponent
                  show={displayCurrencySwitcher}
                  clicked={this.closeOverlayHandler}
                />
              )}

              <span id="cart-btn" onClick={this.showMyBag}>
                <span id="cart-number-icon">{bagSize}</span>
                <img className="cart-icon" src={cartIcon} alt="cart-icon" />
                {/* Cart Overlay */}
                {showBag === true && (
                  <CartOverlayComponent clicked={this.closeBagHandler} />
                )}
              </span>
              {/* Overlay Backdrop */}
              {showBag === true && (
                <BackdropComponent
                  show={showBag}
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
  bagSize: state.category.myBag.length,
});

export default connect(mapStateToProps, {
  getCategoryNames,
  getCategoryByTitle,
  loadCategoryDetails,
})(NavBarComponent);
