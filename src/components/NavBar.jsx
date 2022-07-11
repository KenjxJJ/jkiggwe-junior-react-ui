import React, { Component } from "react";
import "./NavBar.css";
import logoIcon from "./../assets/logo.svg";
import cartIcon from "./../assets/icon/cart.svg";
import CartOverlayComponent from "./CartOverlay";
import BackdropComponent from "./Backdrop";
import CurrencySwitcherComponent from "./CurrencySwitcher";

export class NavBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      showBag: false,
      displayCurrencySwitcher: false
    };

    this.showCurrencySwitcher = this.showCurrencySwitcher.bind(this);
    this.showMyBag = this.showMyBag.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
  }
  // Show currency switcher
  showCurrencySwitcher = () => {
    this.setState({ displayCurrencySwitcher: !this.state.displayCurrencySwitcher });
  };
  
  // Display the Cart Overlay
  showMyBag = () => {
    this.setState({ showBag: !this.state.showBag });
  };

  // Close the Cart Overlay
  closeOverlayHandler = () => {
    this.setState({ showBag: false });
  };

  render() {
    return (
      <>
        <nav>
          <header className="navigation">
            <div className="category-name">
              <span>Women</span>
              <span>Men</span>
              <span>Kids</span>
            </div>
            <div id="logo-wrapper">
              <img id="logo" src={logoIcon} alt="Logo" />
            </div>
            <div className="category-action-buttons">
              <span
                name="currency-switcher"
                id="currency-switcher"
                onClick={this.showCurrencySwitcher}
              >
                $
              {this.state.displayCurrencySwitcher === true && <CurrencySwitcherComponent />}
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

export default NavBarComponent;
