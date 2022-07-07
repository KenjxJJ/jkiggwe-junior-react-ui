import React, { Component } from "react";
import "./NavBar.css";
import logoIcon from "./../assets/logo.svg";
import cartIcon from './../assets/icon/cart.svg';

export class NavBarComponent extends Component {
  render() {
    return (
      <>
        <header>
          <div className="category-name">
            <span>
             Women
            </span>
            <span>
              Men
            </span>
            <span>
              Kids
            </span>
          </div>
          <div id="logo-wrapper">
            <img id="logo" src={logoIcon} alt="Logo"/>
          </div>
          <div className="category-action-buttons">
            <span name="currency-switcher" 
              id="currency-switcher">$
              {/* <span></span> */}
            </span>
            <span id="cart-btn"><img src={cartIcon} alt="cart-icon"/></span>
          </div>
        </header>
      </>
    );
  }
}

export default NavBarComponent;
