import React, { Component } from "react";
import "./Product.css";
import "./Cart.css";

import { withRouterWrapper } from "../wrapper/WithRouterComponent";
import { connect } from "react-redux";

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
      quantities: [{ id: 0, numberOfItems: 1 }],
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
    if (operation === "addition") {
      // Search and replace number of items based on indexed location of the product
      let _quantities = this.state.quantities.map((quantityItem) => {
        let { id, numberOfItems } = quantityItem;
        if (id === index) return { id, numberOfItems: (numberOfItems += 1) };
        return quantityItem;
      });
      this.setState(
        {
          quantities: _quantities,
        },
        () => this.changeTotalPrice()
      );
    }

    if (operation === "subtraction") {
      // Search and replace number of items based on indexed location of the product
      let _quantities = this.state.quantities.map((quantityItem) => {
        let { id, numberOfItems } = quantityItem;
        if (id === index)
          return {
            id,
            numberOfItems: numberOfItems > 1 ? (numberOfItems -= 1) : 1,
          };
        return quantityItem;
      });
      this.setState(
        {
          quantities: _quantities,
        },
        () => this.changeTotalPrice()
      );
    }
    // TODO - You can remove by minus to zero(quantity)
  };

  changeTotalPrice = () => {
    let {
      quantities,
      currencyIndex: currIndex,
      bagItems,
      bagSize,
    } = this.state;

    let newPrice = 0;
    let allItemsSize = 0;
    
    bagItems.forEach((curr, index) => {
      newPrice +=
        curr.prices[currIndex].amount * quantities[index].numberOfItems;
      allItemsSize += quantities[index].numberOfItems;
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

      let count = bagItems.length;
      let idNumber = 1;
      let newQuantitiesArray = [];

      while (count > 1) {
        newQuantitiesArray.push({ id: idNumber, numberOfItems: 1 });
        idNumber++;
        count--;
      }
      this.setState({
        quantities: [...this.state.quantities, ...newQuantitiesArray],
      });
    }
  }

  render() {
    const {
      bagSize,
      bagItems,
      quantities,
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
                  { brand, name, attributes, attribSelected, gallery, prices },
                  index
                ) => (
                  <>
                    <div className="cart-item">
                      <section className="cart-detail-item product-description-detail">
                        <h1 className="brand">{brand}</h1>
                        <h2 className="product-name">{name}</h2>
                        <p className="product-price-label">
                          {prices[currencyIndex].currency.symbol}
                          {prices[currencyIndex].amount}{" "}
                        </p>

                        <section className="product-size">
                          {attributes &&
                            attributes.map(({ id, type, items }) => (
                              <>
                                <p>{id}:</p>
                                <div className="cart-overlay-size product-info-attributes">
                                  {type !== "swatch" &&
                                    items.map(({ id, value, index }) => {
                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => attr._value === value
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
                                    items.map(({ id, value }) => {
                                      const selectedAttrib =
                                        attribSelected.find(
                                          (attr) => attr._value === value
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
                            {quantities[index].numberOfItems}
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
            <main className="cart-details">
              <h2>Bag Empty!</h2>
              <p onClick={this.props.navigate("/")}>See Categories</p>
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

export default connect(mapStateToProps, null)(withRouterWrapper(CartComponent));
