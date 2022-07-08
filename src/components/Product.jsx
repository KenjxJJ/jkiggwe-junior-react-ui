// import PropTypes from 'prop-types'
import React, { Component } from "react";
import "./Product.css";
import productD from "../assets/Product D.jpg";

class ProductComponent extends Component {
  //   static propTypes = {}
  // TODO - Initialize state for product

  render() {
    const style1 = "Blue";

    return (
      <>
        <main className="product-description">
          <div className="product-image-lists">
            <img src={productD} alt="" />
            <img src={productD} alt="" />
            <img src={productD} alt="" />
          </div>
          <div className="product-image-large-display">
            <img src={productD} alt="" />
          </div>
          <div className="product-description-detail">
            <h1 className="brand">Apollo</h1>
            <h2 className="product-name">Running Short</h2>
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

            <section className="product-price">
              <p>Price:</p>
              <span className="product-price-label">$50.00</span>
            </section>

            <div className="add-cart-btn">Add to cart</div>

            <section className="product-description-text">
              <p>
                Find stunning women's cocktail dresses and party dresses. Stand
                out in lace and metallic cocktail dresses and party dresses from
                all your favorite brands.
              </p>
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default ProductComponent;
