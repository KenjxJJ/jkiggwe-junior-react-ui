import React, { Component } from "react";
import "./Product.css";
import { connect } from "react-redux";
import { getProductById } from "../actions/categoriesActions";

class ProductComponent extends Component {
  constructor() {
    super();
    this.state = {
      _product: null,
      imageLinkToDisplay: null,
    };

    this.imageSelectedHandler = this.imageSelectedHandler.bind(this);
  }

  imageSelectedHandler = ( img) => {
    const _img = img;
    this.setState({ imageLinkToDisplay: _img });
  };
  
  // TODO - Initialize state for product
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
  }

  render() {
    const { _product } = this.state;

    if (_product !== null) {
      const {
        id,
        name,
        gallery,
        attributes,
        brand,
        description,
        prices,
        category,
      } = _product;

      return (
        <>
          <main className="product-description">
            <div className="product-image-lists">
              {gallery.map((imgLink) => {
                return (
                  <>
                    <div
                      className="img-wrapper-two"
                      onClick={() =>
                        this.imageSelectedHandler(imgLink)
                      }
                    >
                      <img src={imgLink} alt="" />
                    </div>
                  </>
                );
              })}
            </div>

            <div className="product-image-large-display">
              <img src={this.state.imageLinkToDisplay} alt="" />
            </div>
            
            <div className="product-description-detail">
              <h1 className="brand">{brand}</h1>
              <h2 className="product-name">{name}</h2>
              <section className="product-attributes">
                {attributes &&
                  attributes.map(({ id, items }) => {
                    return (
                      <>
                        <p>{id}:</p>
                        <div className="product-info-attributes">
                          {id !== "Color" &&
                            items.map(({ id, value }) => {
                              return (
                                <span key={id} className="product-attributes-label">
                                  {value}
                                </span>
                              );
                            })}
                          {id === "Color" &&
                            items.map(({ id, value }) => {
                              return (
                                <span
                                  key={id}
                                  className="product-color"
                                  style={{ backgroundColor: value }}
                                ></span>
                              );
                            })}
                        </div>
                      </>
                    );
                  })}
              </section>
              {/* <section className="product-color-attributes">
                <p>Color:</p>
                <div className="product-color-selection">
                  <span
                    className="product-color"
                    style={{ backgroundColor: style1 }}
                  ></span>
                </div>
              </section> */}

              <section className="product-price">
                <p>Price:</p>
                <span className="product-price-label">
                  {prices[0].currency.symbol}
                  {prices[0].amount}
                </span>
              </section>

              <div className="add-cart-btn">Add to cart</div>

              <section
                className="product-description-text"
                dangerouslySetInnerHTML={{ __html: description }}
              ></section>
            </div>
          </main>
        </>
      );
    } else {
      return <div>Loading!...</div>;
    }
  }
}

const mapStateToProps = (state)=>({
  product : state.category.product
})
export default connect(mapStateToProps, { getProductById })(ProductComponent);
