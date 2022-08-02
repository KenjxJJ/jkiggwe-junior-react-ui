import React, { Component } from "react";
import "./CartOverlay.css";
import "./Cart.css";
import { withRouterWrapper } from "../wrapper/WithRouterComponent";

import { connect } from "react-redux";

class CartOverlayComponent extends Component {
  constructor() {
    super();
    this.state = {
      bagSize: 0,
      currencyIndex: 0,
      bagItems: [],
      imagePosition: 0,
      total_price: 0,
      quantities: [
        { id: 0, numberOfItems: 1 },
        { id: 1, numberOfItems: 2 },
        { id: 2, numberOfItems: 4 },
      ],
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
    let { quantities, currencyIndex: currIndex, bagItems } = this.state;

    let newPrice = 0;
    // TODO- Note the different quantities of different items
    bagItems.forEach((curr, index) => {
      newPrice +=
        curr.prices[currIndex].amount * quantities[index].numberOfItems;
    });

    this.setState({ total_price: newPrice.toFixed(2) });
  };

  componentDidMount() {
    const [bagItems] = this.props.myBag;
    // Set bag items, and size
    this.setState({ bagItems: bagItems });
    if (bagItems) {
      this.setState({ bagSize: bagItems.length }, () =>
        this.changeTotalPrice()
      );
    }
  }

  render() {
    const {
      bagSize,
      bagItems,
      quantities,
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
                  { brand, name, attributes, attribSelected, gallery, prices },
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
                                              ? "selected-attribute-color cart-overlay-size-label product-attributes-label"
                                              : "cart-overlay-size-label product-attributes-label"
                                          }
                                        ></span>
                                      );
                                    })}
                                </div>
                              </>
                            ))}
                        </section>
                      </section>
                      <div className="image-quantity-section">
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
                        <div className="cart-overlay-image-wrapper image-wrapper">
                          <img src={gallery[imagePosition]} alt="" />
                          <div className="arrows arrows-overlay cart-overlay-quantifiers">
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
                  // this.props.navigate("/");
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
  null
)(withRouterWrapper(CartOverlayComponent));
