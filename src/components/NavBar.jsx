import React, { Component } from "react";
import "./NavBar.css";
import logoIcon from "./../assets/logo.svg";
import cartIcon from "./../assets/icon/cart.svg";

export class NavBarComponent extends Component {
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
              <span id="cart-btn">
                <span id="cart-number-icon">3</span>
                <img  className="cart-icon" src={cartIcon} alt="cart-icon" />
              </span>
            </div>
          </header>
        </nav>
      </>
    );
  }
}

export default NavBarComponent;
