import React, { Component } from "react";
import "./Category.css";
import ProductOverlayComponent from "./ProductOverlay";
import BackdropComponent from "./Backdrop";
import cartButton from "../assets/icon/empty_cart.svg";

import {
  getCategoryByTitle,
  loadCategoryDetails,
} from "../actions/categoriesActions";

// Redux
import { connect } from "react-redux";


class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      currencyIndex: 0, // Default 0 - USD Currency
      isSelected: [],
      productByID: null
    };

    this.showProductOnOverlay = this.showProductOnOverlay.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
  }

  // Show selected product
  showProductOnOverlay = (productName) => {
    this.setState({ productByID: productName });
  }

  // Get id by selected to show the quick button
  // Return new state
  toggleSelection = (_id) => {
    let newItemsSelected = this.state.isSelected.map((productById) => {
      if (productById.id === _id) productById.selected = !productById.selected;
      return productById;
    });

    this.setState({ isSelected: [...newItemsSelected] })
  }

  // Close the overlays
  closeOverlayHandler = () => {
    this.setState({ productByID: null })
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ category: this.props.category[0] });
    }
    if (this.props.currencyIndex !== prevProps.currencyIndex) {
      this.setState({ currencyIndex: this.props.currencyIndex });
    }
  }

  componentDidMount() {
    if (this.props.category !== null) {
      this.setState({ category: this.props.category });
    }
  }

  render() {
    const { category, currencyIndex, isSelected, productByID } = this.state;

    if (category !== null) {
      const { products, name } = category;
      return (
        <>
          <main className="category-display">
            <header>
              <h1>{name}</h1>
            </header>
            <div className="items-wrapper">
              {products &&
                products.map(
                  ({ id, name, brand, prices, inStock, gallery, attributes }, index) => {
                    // Create local selection object based on incoming product list
                    isSelected.push({ id, selected: false });
                    return (
                      <>
                        <section className="item" key={`${id}-${index}`}>
                          <span onClick={() => this.toggleSelection(id)}>
                            <div
                              className={
                                !inStock
                                  ? "img-wrapper img-overlay"
                                  : "img-wrapper"
                              }
                            >
                              {!inStock ? <div className="out-of-stock-text">Out of stock</div> : ""}
                              <img
                                className="item-image"
                                src={gallery[0]}
                                alt=""
                              />
                            </div>
                            <h2 className="title">
                              {brand} {name}
                            </h2>
                            <h3 className="price-label">
                              {prices[currencyIndex].currency.symbol}
                              {prices[currencyIndex].amount.toFixed(2)}
                            </h3>
                            {/* Quick Shop Button */}
                            {inStock && attributes.length > 0 && isSelected[index].selected ? (
                              <div className="quick-shop-wrapper" onClick={() => this.showProductOnOverlay(id)}>
                                <img className="quick-shop-btn" alt="quick-shop-btn" src={cartButton} />
                              </div>
                            ) : ""}
                          </span>
                        </section>
                      </>
                    );
                  }
                )}
              {/* Show Backdrop on demand */}
              {productByID !== null && (
                <BackdropComponent
                  show={true}
                  clicked={this.closeOverlayHandler}
                />
              )}

              {/* Show Product Overlay */}
              {productByID !== null && (
                <ProductOverlayComponent
                  productID={productByID}
                  clicked={this.closeOverlayHandler}
                />
              )}
            </div>
          </main>
        </>
      );
    } else {
      return (
        <>
          <main className="category-display">Loading!...</main>
        </>
      );
    }
  }
}

// Redux Operations
const mapStateToProps = (state) => {
  const category = state.category.category;
  const currencyIndex = state.category.currencyIndex;
  return { category, currencyIndex };
};

export default connect(mapStateToProps, {
  loadCategoryDetails,
  getCategoryByTitle,
})(CategoryComponent);
