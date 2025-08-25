import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions.js";

const TubCake = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVariant] = useState("1 Tub Cake");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const addtocart = () => {
    dispatch(addToCart(props.tubCake, quantity, varient))
  }

  return (
    <div
      className="shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div onClick={handleShow}>
        <h1>{props.tubCake.name}</h1>
        <img
          src={props.tubCake.image}
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
          loading="lazy"
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

            {props.tubCake.varients.map((variantItem) => {
              return <option value={variantItem}>{variantItem}</option>
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
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-10 w-100">
          <h1 className="mt-1">
            Price: {props.tubCake.prices[0][varient] * quantity} Rs/-
          </h1>
        </div>
        <div className="m-10 w-100">
          <button className="btn" onClick={addtocart}>ADD TO CART</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.tubCake.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={props.tubCake.image} className="img-fluid" style={{height: '300px !important', width: '300px !important'}} />
          <p>{props.tubCake.description}</p>
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

export default TubCake;
