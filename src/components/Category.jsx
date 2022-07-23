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
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ category: this.props.category[0] });
    }
  }

  componentDidMount() {
    if (this.props.category !== null) {
      this.setState({ category: this.props.category[0] });
    }
  }

  render() {
    const { category } = this.state;
    let currency_index = 0; // Default 0 - USD

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
                products.map(({ id, name, brand, prices, gallery }) => {
                  return (
                    <section className="item" key={id}>
                      <img className="item-image" src={gallery[0]} alt="" />
                      <a href={id}>
                        <h2 className="title">
                          {brand} {name}
                        </h2>
                        <h3 className="price-label">
                          {prices[currency_index].currency.symbol}
                          {prices[currency_index].amount}
                        </h3>
                      </a>
                    </section>
                  );
                })}
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
  return { category };
};

export default connect(mapStateToProps, {
  loadCategoryDetails,
  getCategoryByTitle,
})(CategoryComponent);
