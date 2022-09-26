import React, { Component } from "react";
import "./CartOverlay.css";
import "./Cart.css";
import { withRouterWrapper } from "../wrapper/WithRouterComponent";

import { connect } from "react-redux";
import { removeCartItemFromBag } from "./../actions/categoriesActions";


class CartOverlayComponent extends Component {
  constructor() {
    super();
    this.state = {
      bagSize: 0,
      currencyIndex: 0,
      bagItems: [],
      imagePosition: 0,
      total_price: 0,
    };

    this.changeQuantity = this.changeQuantity.bind(this);
    this.changeTotalPrice = this.changeTotalPrice.bind(this);
  }


  // Change the value of quantities by addition or subtraction
  changeQuantity = ({ operation, index }) => {
    let { bagItems } = this.state;

    if (operation === "addition") {
      // Locate item by index
      let itemFound = bagItems.find((_itemInBag, _index) => _index === index);
      // Update the quantity value by index
      itemFound.quantity += 1;
      // Update total price
      this.changeTotalPrice();
    }

    if (operation === "subtraction") {
      // Obtain the quantity value of the selected item
      let itemFound = bagItems.find((_itemInBag, _index) => _index === index);
      let _quantityObtained = itemFound.quantity;

      // Reduce value by 1, if its greater or remove from list
      if (_quantityObtained > 1) {
        itemFound.quantity -= 1;
        this.changeTotalPrice();
      }
      else {
        // remove from list of items in the bag.
        this.props.removeCartItemFromBag(itemFound);
        this.setState({ bagSize: 0 });
      }
    }
  };

  changeTotalPrice = () => {
    let { currencyIndex: currIndex, bagItems } = this.state;

    let newPrice = 0;
    // note the different quantities of different items
    bagItems.forEach((curr, index) => {
      newPrice +=
        curr.prices[currIndex].amount * bagItems[index].quantity;
    });
    // Add Tax to final price
    let newPriceFinal = 0.21 * newPrice + newPrice;

    this.setState({ total_price: newPriceFinal.toFixed(2) });
  };

  componentDidMount() {
    const bagItems = this.props.myBag;
    // Set bag items, and size
    this.setState({ bagItems: bagItems });
    if (bagItems) {
      this.setState({ bagSize: bagItems.length }, () =>
        this.changeTotalPrice()
      );
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props._currencyIndex !== prevProps._currencyIndex) {
      this.setState({ currencyIndex: this.props._currencyIndex }, () => {
        this.changeTotalPrice();
      });
    }

    if (this.props.myBag.length !== prevProps.myBag.length) {
      this.setState({ bagItems: this.props.myBag }, () => {
        this.changeTotalPrice();
      });
    }

  }

  render() {
    const {
      bagSize,
      bagItems,
      currencyIndex,
      total_price,
      imagePosition,
    } = this.state;

    return (
      <>
        {bagSize !== 0 && (
          <main className="cart-overlay">
            <h1 className="cart-overlay-overview">
              {" "}
              <span className="title">My Bag</span>, {bagSize} item
              {bagSize > 1 ? "s" : ""}{" "}
            </h1>
            <div className="cart-overlay-items cart-items">
              {bagItems.map(
                (
                  { brand, name, attributes, attribSelected, gallery, prices, quantity },
                  index
                ) => (
                  <>
                    <div className="cart-overlay-item cart-item">
                      <section className="cart-overlay-description-detail product-description-detail">
                        <h2 className="cart-overlay-name">
                          {brand} <br />
                          {name}
                        </h2>
                        <p className="cart-overlay-price-label product-price-label">
                          {prices[currencyIndex].currency.symbol}
                          {prices[currencyIndex].amount}
                        </p>

                        <section className="cart-overlay-size product-attributes">
                          {attributes &&
                            attributes.map(({ id, type, items }) => (
                              <>
                                <p>{id}:</p>
                                <div className="cart-overlay-size product-info-attributes">
                                  {type !== "swatch" &&
                                    items.map(({ id:__id, value, index }) => {
                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => attr._value === value && attr._id === id
                                        );
                                      return (
                                        <span
                                          key={`${id}-${index}`}
                                          className={
                                            selectedAttrib
                                              ? "selected-attribute cart-overlay-size-label product-attributes-label"
                                              : "cart-overlay-size-label product-attributes-label"
                                          }
                                        >
                                          {value}
                                        </span>
                                      );
                                    })}
                                  {type === "swatch" &&
                                    items.map(({ id:__id, value }) => {
                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => attr._value === value && attr.id === id
                                        );
                                      return (
                                        <span
                                          key={id}
                                          style={{ backgroundColor: value }}
                                          className={
                                            selectedAttrib
                                              ? "selected-attribute-color cart-overlay-color product-color"
                                              : "cart-overlay-color product-color"
                                          }
                                        ></span>
                                      );
                                    })}
                                </div>
                              </>
                            ))}
                        </section>
                      </section>
                      <div className="image-quantity-section image-quantity-section-overlay">
                        <div className="cart-overlay-quantifiers quantifiers">
                          <span
                            className="add-button"
                            onClick={() =>
                              this.changeQuantity({
                                operation: "addition",
                                index: index,
                              })
                            }
                          >
                            {" "}
                            +{" "}
                          </span>
                          <span className="quantity-value">
                            {/* {quantities[index].numberOfItems} */}
                            {quantity}
                          </span>
                          <span
                            className="subtract-button"
                            onClick={() =>
                              this.changeQuantity({
                                operation: "subtraction",
                                index: index,
                              })
                            }
                          >
                            {" "}
                            -{" "}
                          </span>
                        </div>
                        <div className="cart-overlay-image-wrapper image-wrapper">
                          <img src={gallery[imagePosition]} alt="" />
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
              <p className="total-bag-price">
                <span className="price-label">Total</span>
                <span className="price-cost">
                  {bagItems[0].prices[currencyIndex].currency.symbol}
                  {total_price}
                </span>
              </p>
            </div>
            <div className="cart-actions">
              <span
                className="view-bag-btn"
                onClick={(e) => {
                  this.props.clicked(e);
                  this.props.navigate("/order");
                }}
              >
                View Bag
              </span>
              <span
                className="check-out-btn"
                onClick={(e) => {
                  this.props.clicked(e);
                  this.props.navigate("/");
                }}
              >
                Check Out
              </span>
            </div>
          </main>
        )}
        {this.state.bagSize === 0 && (
          <>
            <main className="cart-overlay empty-bag">
              <h2>Bag Empty!</h2>
              <p
                onClick={
                  (e) => this.props.clicked(e)
                }
              >
                Click to close
              </p>
            </main>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  _currencyIndex: state.category.currencyIndex,
  myBag: state.category.myBag,
});

export default connect(
  mapStateToProps,
  { removeCartItemFromBag }
)(withRouterWrapper(CartOverlayComponent));
