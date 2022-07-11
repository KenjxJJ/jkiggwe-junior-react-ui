import React, { Component } from "react";
import "./CartOverlay.css";
import "./Cart.css";
import productD from "../assets/Product D.jpg";

export default class CartOverlayComponent extends Component {
  render() {
    const style1 = "Blue";
    return (
      <>
        <main className="cart-overlay">
          <h1 className="cart-overlay-overview">
            {" "}
            <span className="title">My Bag</span>, 3 items{" "}
          </h1>
          <div className="cart-overlay-items cart-items">

            <div className="cart-overlay-item cart-item">
              <section className="cart-overlay-description-detail product-description-detail">
                <h2 className="cart-overlay-name">
                  Apollo <br />
                  Running Short
                </h2>
                <p className="cart-overlay-price-label product-price-label">$50.00</p>

                <section className="cart-overlay-size product-size">
                  <p>Size:</p>
                  <div className="cart-overlay-size product-size-attributes">
                    <span className="cart-overlay-size-label product-size-label">XS</span>
                    <span className=" cart-overlay-size-label product-size-label">S</span>
                  <span className="cart-overlay-size-label product-size-label">M</span>
                    <span className="cart-overlay-size-label product-size-label">L</span>
                  </div>
                </section>
                <section className="cart-overlay-color-attributes product-color-attributes">
                  <p>Color:</p>
                  <div className="product-color-selection">
                    <span className="cart-overlay-color product-color"></span>
                    {/* Use inbuilt styling */}
                    <span
                      className="cart-overlay-color product-color"
                      style={{ backgroundColor: style1 }}
                    ></span>
                    <span className="cart-overlay-color product-color"></span>
                  </div>
                </section>
              </section>

              <div className="image-quantity-section">
                <div className="cart-overlay-quantifiers quantifiers">
                  <span className="add-button"> + </span>
                  <span className="quantity-value">1</span>
                  <span className="subtract-button"> - </span>
                </div>
                <div className="cart-overlay-image-wrapper image-wrapper">
                  <img src={productD} alt="" />                  
                </div>
              </div>
            </div>
            
            <div className="cart-overlay-item cart-item">
              <section className="cart-overlay-description-detail product-description-detail">
                <h2>
                  Apollo <br />
                  Running Short
                </h2>
                <p className="cart-overlay-price-label product-price-label">$50.00</p>

                <section className="cart-overlay-size product-size">
                  <p>Size:</p>
                  <div className="cart-overlay-size-attributes product-size-attributes">
                    <span className="cart-overlay-size-label product-size-label">XS</span>
                    <span className=" cart-overlay-size-label product-size-label">S</span>
                    <span className="cart-overlay-size-label product-size-label">M</span>
                    <span className="cart-overlay-size-label product-size-label">L</span>
                  </div>
                </section>
                <section className="cart-overlay-color-attributes product-color-attributes">
                  <p>Color:</p>
                  <div className="product-color-selection">
                    <span className="cart-overlay-color product-color"></span>
                    {/* Use inbuilt styling */}
                    <span
                      className="cart-overlay-color product-color"
                      style={{ backgroundColor: style1 }}
                    ></span>
                    <span className="cart-overlay-color product-color"></span>
                  </div>
                </section>
              </section>

              <div className="image-quantity-section">
                <div className="cart-overlay-quantifiers quantifiers">
                  <span className="add-button"> + </span>
                  <span className="quantity-value"> 2 </span>
                  <span className="subtract-button"> - </span>
                </div>
                <div className="cart-overlay-image-wrapper image-wrapper">
                  <img src={productD} alt="" />
                  
                </div>
              </div>
            </div>


            <p className="total-bag-price">
              <span className="price-label">Total</span>
              <span className="price-cost">$200.00</span>
            </p>
          </div>
          <div className="cart-actions">
            <span className="view-bag-btn">View Bag</span>
            <span className="check-out-btn">Check Out</span>
          </div>
        </main>
      </>
    );
  }
}
