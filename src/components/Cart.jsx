// import PropTypes from 'prop-types'
import React, { Component } from "react";
import "./Product.css";
import "./Cart.css";
import productD from "../assets/Product D.jpg";

class CartComponent extends Component {
  //   static propTypes = {}

  render() {
    const style1 = "Blue";

    return (
      <>
        <main className="cart-details">
          <h1>Cart</h1>

          <div className="cart-items">
            <div className="cart-item">
              <section className="product-description-detail">
                <h1 className="brand">Apollo</h1>
                <h2 className="product-name">Running Short</h2>
                <p className="product-price-label">$50.00</p>

                <section className="product-size">
                  <p>Size:</p>
                  <div className="product-size-attributes">
                    <span className="product-size-label">XS</span>
                    <span className="product-size-label">S</span>
                    <span className="product-size-label">M</span>
                    <span className="product-size-label">L</span>
                  </div>
                </section>
                <section className="product-color-attributes">
                  <p>Color:</p>
                  <div className="product-color-selection">
                    <span className="product-color"></span>
                    {/* Use inbuilt styling */}
                    <span
                      className="product-color"
                      style={{ backgroundColor: style1 }}
                    ></span>
                    <span className="product-color"></span>
                  </div>
                </section>
              </section>

              <div className="image-quantity-section">
                <div className="quantifiers">
                  <span className="add-button"> + </span>
                  <span className="quantity-value">1</span>
                  <span className="subtract-button"> - </span>
                </div>
                <div className="image-wrapper">
                  <img src={productD} alt="" />
                  <div className="arrows">
                    <span className="left-arrow"></span>
                    <span className="right-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-item">
              <section className="product-description-detail">
                <h1 className="brand">Apollo</h1>
                <h2 className="product-name">Running Short</h2>
                <p className="product-price-label">$50.00</p>

                <section className="product-size">
                  <p>Size:</p>
                  <div className="product-size-attributes">
                    <span className="product-size-label">XS</span>
                    <span className="product-size-label">S</span>
                    <span className="product-size-label">M</span>
                    <span className="product-size-label">L</span>
                  </div>
                </section>
                <section className="product-color-attributes">
                  <p>Color:</p>
                  <div className="product-color-selection">
                    <span className="product-color"></span>
                    {/* Use inbuilt styling */}
                    <span
                      className="product-color"
                      style={{ backgroundColor: style1 }}
                    ></span>
                    <span className="product-color"></span>
                  </div>
                </section>
              </section>

              <div className="image-quantity-section">
                <div className="quantifiers">
                  <span className="add-button"> + </span>
                  <span className="quantity-value">1</span>
                  <span className="subtract-button"> - </span>
                </div>
                <div className="image-wrapper">
                  <img src={productD} alt="" />
                  <div className="arrows">
                    <span className="left-arrow"></span>
                    <span className="right-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-details">
            <p className="tax">
              {" "}
              <span>Tax 21%: </span>
              <span>$42.00</span>
            </p>
            <p className="cart-quantity">
              <span>Quantity:</span>
              <span>3</span>
            </p>
            <p className="cart-total-price">
              <span>Total: </span>
              <span>$200.00</span>
            </p>
            <button className="order-btn">Order</button>
          </div>
        </main>
      </>
    );
  }
}

export default CartComponent;
