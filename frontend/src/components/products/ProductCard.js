import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";
import { useAuth0 } from "@auth0/auth0-react";

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

  const { isAuthenticated, user } = useAuth0();
  const [isEligible, setIsEligible] = useState(false);
  const cartState = useSelector(state => state.cartReducer);
  const { cartItems } = cartState;

  React.useEffect(() => {
    const checkEligibility = async () => {
      if (isAuthenticated && user?.email) {
        try {
          // Reusing the endpoint, assuming same host/port.
          // If this component is used where axios isn't default, using fetch.
          const response = await fetch('http://localhost:8000/api/orders/check-eligibility', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          });
          const data = await response.json();
          setIsEligible(data.eligible);
        } catch (e) {
          console.error(e);
        }
      }
    }
    checkEligibility();
  }, [isAuthenticated, user]);

  const dispatch = useDispatch();

  const addtocart = () => {

    if (isEligible) {
      const restrictedCategories = ['Brownies', 'Jumbo Cookie']; // Add 'Cookies' if category name is that
      // Assuming 'Jumbo Cookie' is the category name for cookies based on switch case in ProductCard.js,
      // user said "only ONE type of cookies", switch case has "Jumbo Cookie", "Brownies".
      // Use "Brownies" and "Jumbo Cookie".

      if (restrictedCategories.includes(product.category)) {
        // Check if cart has item of same category but different ID
        const existingSameCategoryItem = cartItems.find(item =>
          item.category === product.category && item._id !== product._id
        );

        if (existingSameCategoryItem) {
          alert(`You can only order one type of ${product.category}!`);
          return;
        }
      }
    }

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
          <img src={product.image} className="img-fluid" style={{ height: '300px !important', width: '300px !important' }} alt={product.name} />
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
