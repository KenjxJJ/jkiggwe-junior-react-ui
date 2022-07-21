// import PropTypes from 'prop-types'
import React, { Component } from "react";
import "./Product.css";
import productD from "../assets/Product D.jpg";
import { getProduct } from "../queries/ProductQuery";
import { useLocation } from "react-router-dom";

class ProductComponent extends Component {
  constructor() {
    super();

    this.state = {
      _product: null,
    };
  }
  // TODO - Initialize state for product
  async componentDidMount() {
    // Obtain id from the browser
    const id = window.location.pathname.substring(1);
    const { product } = await getProduct(id);
    this.setState({ _product: product });
  }

  render() {
    const { _product } = this.state;

    if (_product !== null) {
      const {
        id,
        name,
        inStock,
        gallery,
        attributes,
        brand,
        description,
        prices,
        category,
      } = _product;

      return (
        <>
          <main className="product-description">
            <div className="product-image-lists">
              {gallery.map((imgLink) => {
                return <img src={imgLink} alt="" />;
              })}
            </div>
            <div className="product-image-large-display">
              <img src={productD} alt="" />
            </div>
            <div className="product-description-detail">
              <h1 className="brand">{brand}</h1>
              <h2 className="product-name">{name}</h2>
              <section className="product-size">
                {attributes &&
                  attributes.map(({ id, items }) => {
                    return (
                      <>
                        <p>{id}:</p>
                        <div className="product-size-attributes">
                          {id !== "Color" &&
                            items.map(({ id, value }) => {
                              return (
                                <span key={id} className="product-size-label">
                                  {value}
                                </span>
                              );
                            })}
                          {id === "Color" &&
                            items.map(({ id, value }) => {
                              return (
                                <span
                                  key={id}
                                  className="product-color"
                                  style={{ backgroundColor: value }}
                                ></span>
                              );
                            })}
                        </div>
                      </>
                    );
                  })}
              </section>
              {/* <section className="product-color-attributes">
                <p>Color:</p>
                <div className="product-color-selection">
                  <span
                    className="product-color"
                    style={{ backgroundColor: style1 }}
                  ></span>
                </div>
              </section> */}

              <section className="product-price">
                <p>Price:</p>
                <span className="product-price-label">
                  {prices[0].currency.symbol}
                  {prices[0].amount}
                </span>
              </section>

              <div className="add-cart-btn">Add to cart</div>

              <section
                className="product-description-text"
                dangerouslySetInnerHTML={{ __html: description }}
              ></section>
            </div>
          </main>
        </>
      );
    } else {
      return <div>Loading!...</div>;
    }
  }
}

export default ProductComponent;
