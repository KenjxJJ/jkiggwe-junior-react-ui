import React, { Component } from "react";
import "./Category.css";
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
    };
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
      this.setState({ category: this.props.category[0] });
    }
  }

  render() {
    const { category, currencyIndex } = this.state;

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
                  ({ id, name, brand, prices, inStock, gallery }) => {
                    return (
                      <>
                        <section className="item" key={id}>
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
                          <a href={id}>
                            <h2 className="title">
                              {brand} {name}
                            </h2>
                            <h3 className="price-label">
                              {prices[currencyIndex].currency.symbol}
                              {prices[currencyIndex].amount}
                            </h3>
                          </a>
                        </section>
                      </>
                    );
                  }
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
