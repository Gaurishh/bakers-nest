import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions.js";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteFromCart } from "../actions/cartActions.js";
import Checkout from "../components/Checkout.js";
import Navbar from '../components/Navbar.js';

import Success from '../components/Success.js';
import api from '../api/axios.js';

const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const orderState = useSelector((state) => state.placeOrderReducer)
  const { success } = orderState

  var subTotal = cartItems.reduce((x, item) => x + item.price, 0);

  /* Existing code */
  const { isAuthenticated, isLoading, user } = useAuth0();

  const dispatch = useDispatch();

  const [address, setAddress] = React.useState('');
  const [showAddressInput, setShowAddressInput] = React.useState(false);
  const [isEligible, setIsEligible] = React.useState(false);

  React.useEffect(() => {
    const checkEligibility = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const { data } = await api.post('/api/orders/check-eligibility');
          setIsEligible(data.eligible);
        } catch (e) {
          console.error(e);
        }
      }
    }
    checkEligibility();
  }, [isAuthenticated, user]);

  const isFree = isEligible && subTotal <= 700;


  return (
    <div className="App">
      <Navbar />
      {success && <Success success='Order placed successfully' />}
      {!success && <div className="row justify-content-center">
        {cartItems.length === 0 ? <h1 style={{ fontSize: "2.5rem" }}>The cart is empty!</h1> : <div className="col-md-6">
          <h2 style={{ fontSize: "40px", marginBottom: "50px" }}>My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-left m-1 w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}{" "}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity: </h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.varient)
                      );
                    }}
                    style={{ cursor: 'pointer' }}
                  ></i>
                  <b> {item.quantity} </b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      if (item.quantity === 1) {
                        dispatch(deleteFromCart(item));
                      } else {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.varient)
                        );
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "110px", width: "110px", borderRadius: "10px" }}
                    alt={item.name}
                  />
                </div>
                <div className="m-1 w-100">
                  <button
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>}


        {(cartItems.length !== 0 && isLoading) ? (
          <div className="col-md-4"><h2 style={{ fontSize: "40px" }}>Loading...</h2></div>
        ) : (
          <div className="col-md-4">
            {(subTotal === 0) ? (
              <div></div>
            ) : (
              <div>
                {isAuthenticated ? (
                  <>
                    {!success && (
                      isFree ? (
                        <>
                          <h2 style={{ fontSize: "40px" }}>Total: <span style={{ color: 'green' }}>FREE</span></h2>
                          <p style={{ color: 'green', fontWeight: 'bold' }}>Your first order is on us!</p>
                        </>
                      ) : (
                        <h2 style={{ fontSize: "40px" }}>Total: {subTotal} /-</h2>
                      )
                    )}

                    {!showAddressInput ? (
                      !success && <button className="btn btn-primary" onClick={() => {
                        if (isEligible && subTotal > 700) {
                          alert("Proceed with items worth 700 to place the first order!");
                        } else {
                          setShowAddressInput(true)
                        }
                      }}>Proceed</button>
                    ) : (
                      <div>
                        <textarea
                          required
                          className="form-control mb-3"
                          placeholder="Enter your shipping address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        {!success && <Checkout cartItems={cartItems} address={address} isFree={isFree} amount={subTotal} isEligible={isEligible} />}
                      </div>
                    )}

                    {!success && <>
                      <p style={{ fontStyle: "italic", marginTop: "20px" }}>Note: Put your correct address above.</p>

                    </>}
                  </>
                ) : (
                  <h3>Login to proceed ordering</h3>
                )}
              </div>
            )}
          </div>
        )}
      </div>}
    </div>
  );
};

export default CartScreen;
