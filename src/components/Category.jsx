import React, { Component } from "react";
import "./Category.css";
import productD from "../assets/Product D.jpg";

export class CategoryComponent extends Component {
  render() {
    return (
      <>
        <main className="category-display">
          <header>
            <h1>Category name</h1>
          </header>
          <div className="items-wrapper">
            <section className="item">
              <img className="item-image" src={productD} />
              <h2 className="title">Apollo Running Short</h2>
              <h3 className="price-label">$50.00</h3>
            </section>
            
            <section className="item">
              <img className="item-image" src={productD} />
              <h2 className="title">Apollo Running Short</h2>
              <h3 className="price-label">$50.00</h3>
            </section>
            
            <section className="item">
              <img className="item-image" src={productD} />
              <h2 className="title">Apollo Running Short</h2>
              <h3 className="price-label">$50.00</h3>
            </section>
            
            <section className="item">
              <img className="item-image" src={productD} />
              <h2 className="title">Apollo Running Short</h2>
              <h3 className="price-label">$50.00</h3>
            </section>
            
            <section className="item">
              <img className="item-image" src={productD} />
              <h2 className="title">Apollo Running Short</h2>
              <h3 className="price-label">$50.00</h3>
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default CategoryComponent;
