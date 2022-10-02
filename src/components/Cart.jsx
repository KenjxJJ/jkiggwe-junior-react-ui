import React, { Component } from "react";
import "./Product.css";
import "./Cart.css";

import { withRouterWrapper } from "../wrapper/WithRouterComponent";
import { connect } from "react-redux";
import { removeCartItemFromBag } from "./../actions/categoriesActions"

class CartComponent extends Component {
  constructor() {
    super();
    this.state = {
      bagSize: 0,
      currencyIndex: 0,
      bagItems: [],
      imagePosition: 0,
      total_price: 0,
      total_price_tax: 0,
    };

    this.changeQuantity = this.changeQuantity.bind(this);
    this.changeTotalPrice = this.changeTotalPrice.bind(this);
    this.showImageDisplay = this.showImageDisplay.bind(this);
  }

  // Show another image, by updating its index(value-location)
  showImageDisplay = ({ operation }) => {
    // show previous image-step backwards
    if (operation === "previous") {
      if (this.state.imagePosition !== 0)
        this.setState({ imagePosition: this.state.imagePosition - 1 });
    }
    //show next image forward
    if (operation === "next") {
      // Obtain the largest index of the gallery image
      const largest = this.state.bagItems[0].gallery.length;
      if (this.state.imagePosition < largest - 1)
        this.setState({ imagePosition: this.state.imagePosition + 1 });
    }
  };

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
        this.setState({ bagSize: this.state.bagSize - 1 });
      }
    }
  };


  changeTotalPrice = () => {
    let {
      currencyIndex: currIndex,
      bagItems
    } = this.state;

    let newPrice = 0;
    let allItemsSize = 0;

    bagItems.forEach((curr, index) => {
      newPrice +=
        curr.prices[currIndex].amount * bagItems[index].quantity;
      allItemsSize += bagItems[index].quantity;
    });

    // Add Tax to final price
    let tax = 0.21 * newPrice;
    let newPriceFinal = tax + newPrice;

    this.setState({ total_price: newPriceFinal.toFixed(2) });
    this.setState({ total_price_tax: tax.toFixed(2) });
    this.setState({ bagSize: allItemsSize });
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
        this.changeTotalPrice()
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
      total_price_tax,
      imagePosition,
    } = this.state;

    return (
      <>
        {bagSize !== 0 && (
          <main className="cart-details">
            <h1>Cart</h1>
            <div className="cart-items">
              {bagItems.map(
                (
                  { brand, name, attributes, attribSelected, quantity, gallery, prices },
                  index
                ) => (
                  <>
                    <div className="cart-item" key={`${name}-${index}`}>
                      <section className="cart-detail-item product-description-detail">
                        <h1 className="brand">{brand}</h1>
                        <h2 className="product-name cart-item-name">{name}</h2>
                        <p className="product-price-label">
                          {prices[currencyIndex].currency.symbol}
                          {prices[currencyIndex].amount.toFixed(2)}{" "}
                        </p>

                        <section className="product-size cart-item-info">
                          {attributes &&
                            attributes.map(({ id, type, items }) => (
                              <>
                                <p>{id}:</p>
                                <div className="product-info-attributes cart-item-info-attributes">
                                  {type !== "swatch" &&
                                    items.map(({ id: __id, value }) => {

                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => {
                                            return attr._value === value && attr._id === id
                                          }
                                        );

                                      return (
                                        <span
                                          className={
                                            selectedAttrib
                                              ? "selected-attribute product-attributes-label"
                                              : "product-attributes-label"
                                          }
                                        >
                                          {value}
                                        </span>
                                      );
                                    })}
                                  {type === "swatch" &&
                                    items.map(({ id: __id, value }) => {
                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => attr._value === value && attr.id === id
                                        );
                                      return (
                                        <span
                                          style={{ backgroundColor: value }}
                                          className={
                                            selectedAttrib
                                              ? "selected-attribute-color product-color cart-item-color"
                                              : "product-color cart-item-color"
                                          }
                                        ></span>
                                      );
                                    })}
                                </div>
                              </>
                            ))}
                        </section>

                        {/* END CART_DETAILS */}
                      </section>

                      <div className="image-quantity-section">
                        <div className="quantifiers">
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
                            - {" "}
                          </span>
                        </div>
                        <div className="image-wrapper">
                          <img src={gallery[imagePosition]} alt="" />
                          <div className="arrows">
                            <span
                              onClick={() =>
                                this.showImageDisplay({
                                  operation: "previous",
                                })
                              }
                            >
                              {"<"}
                            </span>
                            <span
                              onClick={() =>
                                this.showImageDisplay({
                                  operation: "next",
                                })
                              }
                            >
                              {">"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="order-details">
              <p className="tax">
                <span>Tax 21%: </span>
                <span>
                  {bagItems[0].prices[currencyIndex].currency.symbol}
                  {total_price_tax}
                </span>
              </p>
              <p className="cart-quantity">
                <span>Quantity:</span>
                <span>{bagSize}</span>
              </p>
              <p className="cart-total-price">
                <span>Total: </span>
                <span>
                  {bagItems[0].prices[currencyIndex].currency.symbol}
                  {total_price}
                </span>
              </p>
              <button
                className="order-btn"
                onClick={() => {
                  this.props.navigate("/");
                }}
              >
                Order
              </button>
            </div>
          </main>
        )}
        {bagSize === 0 && (
          <>
            <main className="cart-details empty-bag empty-bag-cart">
              <h1>Bag Empty!</h1>
              <p>See <a href="/" className="link-to-categories">
                Categories
              </a>
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

export default connect(mapStateToProps, { removeCartItemFromBag })(withRouterWrapper(CartComponent));
