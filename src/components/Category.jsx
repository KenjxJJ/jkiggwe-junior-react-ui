import React, { Component } from "react";
import { getCategories } from "../queries/CategoriesQuery";
import "./Category.css";

export class CategoryComponent extends Component {
  constructor() {
    super();
    this.state = {
      categories: null,
    };
  }

  async componentDidMount() {
    const { category } = await getCategories();
    this.setState({ categories: category });
  }

  render() {
    const { categories } = this.state;

    let currency_index = 0; // Default 0 - USD

    if (categories !== null) {
      const { products, name } = categories;
      // console.log(categories.products);
      return (
        <>
          {/* {categories.map(({ products, name }) => { */}
          {/* return ( */}
          <main className="category-display">
            <header>
              <h1>{name}</h1>
            </header>
            <div className="items-wrapper">
              {products &&
                products.map(({ id, name, brand, prices, gallery }) => {
                  return (
                    <section className="item">
                      <img className="item-image" src={gallery[0]} alt="" />
                      <a href={id} key={id}>
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
          {/* ); */}
          {/* })} */}
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

export default CategoryComponent;
