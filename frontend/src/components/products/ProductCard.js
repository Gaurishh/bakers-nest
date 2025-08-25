import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";

const ProductCard = ({ product, ...props }) => {
  // Determine default variant based on product category
  const getDefaultVariant = (category) => {
    switch (category) {
      case "Brownies":
        return "1 Brownie";
      case "Tub Cake":
        return "1 Tub Cake";
      case "Dry Cake":
        return "1 Dry Cake";
      case "Cheese Cake":
        return "1 Jar/Cup";
      case "Jumbo Cookie":
        return "1 Jumbo Cookie";
      case "Fudge":
        return "10 pieces";
      default:
        return "Pack of 4";
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [varient, setVariant] = useState(getDefaultVariant(product.category));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const dispatch = useDispatch();

  const addtocart = () => {
    dispatch(addToCart(product, quantity, varient))
  }

  return (
     <div
      className="shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div onClick={handleShow}>
        <h1>{product.name}</h1>
        <img
          src={product.image}
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
          loading="lazy"
          alt={product.name}
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Variants</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setVariant(e.target.value)
            }}
          >
            {product.varients.map((variantItem) => {
              return <option key={variantItem} value={variantItem}>{variantItem}</option>
            })}
          </select>
        </div>

        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option key={i + 1} value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-10 w-100">
          <h1 className="mt-1">
            Price: {product.prices[0][varient] * quantity} Rs/-
          </h1>
        </div>
        <div className="m-10 w-100">
          <button className="btn" onClick={addtocart}>ADD TO CART</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={product.image} className="img-fluid" style={{height: '300px !important', width: '300px !important'}} alt={product.name} />
          <p>{product.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCard;
