import React, { Component } from 'react';
import "./Product.css";
import "./ProductOverlay.css";

// Redux
import { connect } from "react-redux";
import { getProductById, addToMyBag } from "../actions/categoriesActions";
import { withRouterWrapper } from "../wrapper/WithRouterComponent";


class ProductOverlayComponent extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      productID: null,
      bagItems: [],
      productQuantity: 1,
      currencyIndex: 0,
      productImage: null,
      attribSelected: [{ _id: null, _value: null }]
    }

    this.addToBagHandler = this.addToBagHandler.bind(this);
    this.saveAttributeHandler = this.saveAttributeHandler.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  async componentDidMount() {
    // Obtain id 
    const id = this.props.productID;
    this.setState({ productID: id })
    await this.props.getProductById(id);

    // Obtain product info from store
    const product = this.props.product;
    this.setState({ product: product });

    // Set default image
    const defaultImage = this.props.product.gallery[0];
    this.setState({ productImage: defaultImage });

    // Obtain the BagItems and set them locally
    this.setState({ bagItems: this.props.bagCollection })

  }

  componentDidUpdate(prevProps) {
    // On Currency Change
    if (this.props._currencyIndex !== prevProps._currencyIndex) {
      this.setState({ currencyIndex: this.props._currencyIndex });
    }
  }

  closeOverlay = () => {
    console.log("closed overlay!");

  }
  saveAttributeHandler = ({ id, value }) => {
    //  Iterate through attribute record, and add new changes or return null
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

    // Search for the match attribute by id to change to the new attribute
    let result = selectedAttributes.find(
      ({ _id, _value }) => (_id === id && _value !== value)
    );


    if (result) {
      // Rename the properties of the attributes
      result = { _id: id, _value: value };
      // Search for the unmatched attributes
      let rest = selectedAttributes.filter((elem) => elem._id !== result._id);
      // Set final result
      if (rest) newAttributes = [result, ...rest];
      else newAttributes = [result];
    }
    // Append to the end of list
    else {
      newAttributes = [...selectedAttributes, { _id: id, _value: value }];
    }

    // Set attributes to state
    this.setState({ attribSelected: [...newAttributes] });
  };

  addToBagHandler = () => {
    // Obtain the selectedAttributes
    const { attribSelected, product, productQuantity } = this.state;
    let isAlreadyAddedItem = false;

    //  Check if there is an exact  existing product name from myBag
    isAlreadyAddedItem = this.props.bagCollection.filter((bagItem) => bagItem.name === product.name);

    if (isAlreadyAddedItem.length > 0) {
      let isFound = false;
      let foundIndex = -1;

      // Check if the attributesSelected are present 
      isAlreadyAddedItem.forEach((item, index) => {
        // Obtain attrib array
        let { attribSelected: attributesFromStore } = item;

        attributesFromStore.forEach((attrib) => {
          if (attrib._value !== attribSelected._value) {
            // Obtain the position/location
            foundIndex = index;
            isFound = true;
          }
        })
      });

      if (!isFound) {
        // add to cart
        this.props.addToMyBag(isAlreadyAddedItem[foundIndex]);
      }
      // Incase not found
      else {
        const { name, gallery, attributes, brand, description, prices } = product;

        // Save product
        const newProductDifferentAttrib = {
          name,
          gallery,
          brand,
          description,
          prices,
          attributes,
          attribSelected,
          quantity: 1
        };
        // add to cart
        this.props.addToMyBag(newProductDifferentAttrib);
      }

    } else {
      const { name, gallery, attributes, brand, description, prices } = product;
      // Save product
      const newProductItem = {
        name,
        gallery,
        brand,
        description,
        prices,
        attributes,
        attribSelected,
        quantity: 1
      };
      // add to cart
      this.props.addToMyBag(newProductItem);
    }
  };

  changeQuantity = ({ operation }) => {
    let { productQuantity } = this.state;

    if (operation === "addition") {
      // Update the quantity value by index
      this.setState({ productQuantity: productQuantity + 1 })
    }

    if (operation === "subtraction") {
      // Reduce value by 1, if its greater.
      if (productQuantity > 1) {
        this.setState({ productQuantity: productQuantity - 1 })
      }
    };
  }


  render() {
    const { product, attribSelected, currencyIndex, productQuantity, productImage } = this.state;
    const { name, brand, prices, attributes } = product;

    return (
      <>
        <div className="product-overlay-wrapper">
          <section className="product-overlay">
            <div className='product-description product-image-overlay'>
              <img src={productImage} alt="" />
            </div>
            <div className="product-description product-overlay-description">
              <h1 className="brand">{brand}</h1>
              <h2 className="product-name product-name-overlay">{name}</h2>
              <section className="product-attributes">
                {attributes &&
                  attributes.map(({ id: attributeID, type, items }, index) => {
                    return (
                      <>
                        <div key={`${attributeID}-${index}`}>
                          <p>{attributeID}:</p>
                          <div className="product-info-attributes product-info-attributes-overlay">
                            {type !== "swatch" &&
                              items.map(({ id, value, index }) => {
                                let selected = attribSelected.find(
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
                                        ? "selected-attribute product-attributes-label  product-attributes-label-overlay"
                                        : "product-attributes-label  product-attributes-label-overlay"
                                    }
                                  >
                                    {value}
                                  </span>
                                );
                              })}
                            {type === "swatch" &&
                              items.map(({ id, value }, index) => {
                                let selected = attribSelected.find(
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
                  {prices && prices[currencyIndex].currency.symbol}
                  {prices && prices[currencyIndex].amount.toFixed(2)}
                </span>
              </section>
              <div className="cart-overlay-quantifiers quantifiers product-overlay-quantifiers">
                <span
                  className="add-button"
                  onClick={() =>
                    this.changeQuantity({
                      operation: "addition"
                    })
                  }
                >
                  {" "}
                  +{" "}
                </span>
                <span className="quantity-value">
                  {productQuantity}
                </span>
                <span
                  className="subtract-button"
                  onClick={() =>
                    this.changeQuantity({
                      operation: "subtraction"
                    })
                  }
                >
                  {" "}
                  -{" "}
                </span>
              </div>
              <div className="add-cart-btn-wrapper add-cart-btn-wrapper-overlay">
                <div
                  className="add-cart-btn"
                  onClick={() => this.addToBagHandler()}
                >
                  Add to cart
                </div>
              </div>
            </div>
            <div className="product-overlay-close-btn" onClick={this.closeOverlay}>X</div>
          </section>
        </div>
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  product: state.category.product,
  _currencyIndex: state.category.currencyIndex,
  bagCollection: state.category.myBag,
});

export default connect(mapStateToProps, { getProductById, addToMyBag })(
  withRouterWrapper(ProductOverlayComponent));