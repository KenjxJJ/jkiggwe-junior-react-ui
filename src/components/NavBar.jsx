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
              <a href="#">Women</a>
            </span>
            <span>
              <a href="#">Men</a>
            </span>
            <span>
              <a href="#">Kids</a>
            </span>
          </div>
          <div className="logo">
            <img src={logoIcon} alt="Logo"/>
          </div>
          <div className="category-action-buttons">
            <span name="currency-switcher" 
              id="currency-switcher">$
            </span>
            <span><img src={cartIcon} alt="cart-icon"/></span>
          </div>
        </header>
      </>
    );
  }
}

export default NavBarComponent;
