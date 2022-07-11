import React, { Component } from "react";
import "./NavBar.css";
import logoIcon from "./../assets/logo.svg";
import cartIcon from "./../assets/icon/cart.svg";
import CartOverlayComponent from "./CartOverlay";
import BackdropComponent from "./Backdrop";

export class NavBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      showBag: false,
    };

    this.showMyBag = this.showMyBag.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
  }

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
              <span name="currency-switcher" id="currency-switcher">
                ${/* <span></span> */}
              </span>

              <span id="cart-btn" onClick={this.showMyBag}>
                <span id="cart-number-icon">3</span>
                <img className="cart-icon" src={cartIcon} alt="cart-icon" />
              </span>

              {/* Overlay Backdrop */}
              {this.state.showBag === true &&<BackdropComponent
                show={this.state.showBag}
                clicked={this.closeOverlayHandler}
              />}

              {/* Cart Overlay */}
              {this.state.showBag === true && <CartOverlayComponent />}
            </div>
          </header>
        </nav>
      </>
    );
  }
}

export default NavBarComponent;
