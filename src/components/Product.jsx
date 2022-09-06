import React, { Component } from "react";
import "./Product.css";
import { connect } from "react-redux";

import { getProductById, addToMyBag } from "../actions/categoriesActions";
import { withRouterWrapper } from "../wrapper/WithRouterComponent";
import Parser from "html-react-parser";

class ProductComponent extends Component {
  constructor() {
    super();
    this.state = {
      _product: null,
      currencyIndex: 0, // Default Currency
      imageLinkToDisplay: null,
      attribSelected: [{ _id: null, _value: null }],
    };

    this.addToBagHandler = this.addToBagHandler.bind(this);
    this.imageSelectedHandler = this.imageSelectedHandler.bind(this);
  }

  imageSelectedHandler = (img) => {
    const _img = img;
    this.setState({ imageLinkToDisplay: _img });
  };

  async componentDidMount() {
    // Obtain id from the browser
    const id = window.location.pathname.substring(1);
    await this.props.getProductById(id);

    // Obtain product info from store
    const product = this.props.product;
    this.setState({ _product: product });

    // Set default image
    const defaultImage = this.props.product.gallery[0];
    this.setState({ imageLinkToDisplay: defaultImage });

    // Set default price
    console.log(this.props._currencyIndex);
  }

  componentDidUpdate(prevProps) {
    // On Currency Change
    if (this.props._currencyIndex !== prevProps._currencyIndex) {
      this.setState({ currencyIndex: this.props._currencyIndex });
    }
  }

  saveAttributeHandler = ({ id, value }) => {
    //  Iterate through attribute record, and new changes or return null
    // Initiate the first object
    if (this.state.attribSelected[0]._id === null && id !== null) {
      this.setState({
        attribSelected: [
          {
            _id: id,
            _value: value,
          },
        ],
      });
      return;
    }

    let selectedAttributes = [...this.state.attribSelected];
    let newAttributes = [];

    // Search for the match attribute
    let result = selectedAttributes.find(
      ({ _id, _value }) => _id === id && _value !== value
    );

    if (result) {
      // Rename the properties of the attributes
      result = { _id: id, _value: value };
      // Search for the unmatched attributes
      let rest = selectedAttributes.filter((elem) => elem._id !== result._id);
      // Set final result
      if (rest) newAttributes = [result, ...rest];
      else newAttributes = [result];
    } else {
      newAttributes = [...selectedAttributes, { _id: id, _value: value }];
    }

    // Set attributes to state
    this.setState({ attribSelected: [...newAttributes] });
  };

  addToBagHandler = () => {
    // Obtain the selectedAttributes
    const { attribSelected, _product } = this.state;
    // Obtain product in view
    const { name, gallery, attributes, brand, description, prices } = _product;

    // Save product
    const newCart = {
      name,
      gallery,
      brand,
      description,
      prices,
      attributes,
      attribSelected,
    };
    // add to cart
    this.props.addToMyBag(newCart);

    // Return to homepage(Category Page)
    this.props.navigate("/");
  };

  render() {
    const { _product } = this.state;

    if (_product !== null) {
      const { name, gallery, attributes, brand, inStock, description, prices } =
        _product;

      return (
        <>
          <main className="product-description">
            <div className="product-image-lists">
              {gallery.map((imgLink) => {
                return (
                  <>
                    <div
                      className="img-wrapper-two"
                      key={imgLink}
                      onClick={() => this.imageSelectedHandler(imgLink)}
                    >
                      <img src={imgLink} alt="" />
                    </div>
                  </>
                );
              })}
            </div>

            <div className="product-image-large-display">
              <div className={
                              !inStock
                                ? "img-wrapper-product"
                                : ""
                            }>
                {!inStock ? (
                  <div className="out-of-stock-text">Out of stock</div>
                ) : (
                  ""
                )}
                <img src={this.state.imageLinkToDisplay} alt="" />
              </div>
            </div>

            <div className="product-description-detail">
              <h1 className="brand">{brand}</h1>
              <h2 className="product-name">{name}</h2>
              <section className="product-attributes">
                {attributes &&
                  attributes.map(({ id: attributeID, type, items }, index) => {
                    return (
                      <>
                        <div key={`${attributeID}-${index}`}>
                          <p>{attributeID}:</p>
                          <div className="product-info-attributes">
                            {type !== "swatch" &&
                              items.map(({ id, value, index }) => {
                                let selected = this.state.attribSelected.find(
                                  (item) =>
                                    item._value === value &&
                                    item._id === attributeID
                                );
                                return (
                                  <span
                                    key={`${id}-${index}`}
                                    onClick={() => {
                                      this.saveAttributeHandler({
                                        id: attributeID,
                                        value,
                                      });
                                    }}
                                    className={
                                      selected
                                        ? "selected-attribute product-attributes-label"
                                        : "product-attributes-label"
                                    }
                                  >
                                    {value}
                                  </span>
                                );
                              })}
                            {type === "swatch" &&
                              items.map(({ id, value }, index) => {
                                let selected = this.state.attribSelected.find(
                                  (item) => item._value === value
                                );

                                return (
                                  <span
                                    key={`${id}-${index}`}
                                    onClick={() =>
                                      this.saveAttributeHandler({
                                        id: attributeID,
                                        value,
                                      })
                                    }
                                    className={
                                      selected
                                        ? "selected-attribute-color product-color"
                                        : "product-color"
                                    }
                                    style={{ backgroundColor: value }}
                                  ></span>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </section>
              <section className="product-price">
                <p>Price:</p>
                <span className="product-price-label">
                  {prices[this.state.currencyIndex].currency.symbol}
                  {prices[this.state.currencyIndex].amount.toFixed(2)}
                </span>
              </section>

              {inStock && attributes.length > 0 && (
                <div className="add-cart-btn-wrapper">
                  <div
                    className="add-cart-btn"
                    href="/"
                    onClick={() => this.addToBagHandler()}
                  >
                    Add to cart
                  </div>
                </div>
              )}

              <section className="product-description-text">
                {Parser(description)}
              </section>
            </div>
          </main>
        </>
      );
    } else {
      return <div>Loading!...</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  product: state.category.product,
  _currencyIndex: state.category.currencyIndex,
  bagCollection: state.category.myBag,
});

export default connect(mapStateToProps, { getProductById, addToMyBag })(
  withRouterWrapper(ProductComponent)
);
