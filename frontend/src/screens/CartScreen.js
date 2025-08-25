import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions.js";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteFromCart } from "../actions/cartActions.js";
import Checkout from "../components/Checkout.js";
import Navbar from '../components/Navbar.js';
import Success from '../components/Success.js';
import Error from '../components/Error.js';

const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  console.log(cartItems)

  const orderState = useSelector((state) => state.placeOrderReducer)
  const {success, error} = orderState

  var subTotal = cartItems.reduce((x, item) => x + item.price, 0);

  const {isAuthenticated, logout, isLoading } = useAuth0();

  const dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar />
      {success && <Success success='Order placed successfully' />}
      {!success && <div className="row justify-content-center">
        {cartItems.length == 0 ? <h1 style={{fontSize: "2.5rem"}}>The cart is empty!</h1> : <div className="col-md-6">
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
                    style={{cursor:'pointer'}}
                  ></i>
                  <b> {item.quantity} </b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      if (item.quantity == 1) {
                        dispatch(deleteFromCart(item));
                      } else {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.varient)
                        );
                      }
                    }}
                    style={{cursor:'pointer'}}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "110px", width: "110px", borderRadius: "10px" }}
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
        

        {(cartItems.length != 0 && isLoading) ? (
          <div className="col-md-4"><h2 style={{fontSize: "40px"}}>Loading...</h2></div>
        ) : (
          <div className="col-md-4">
            {(subTotal === 0) ? (
              <div></div>
            ) : (
              <div>
                {isAuthenticated ? (
                  <>
                  {(!success && !error) && <h2 style={{fontSize: "40px"}}>Total: {subTotal} /-</h2>}
                    <Checkout cartItems={cartItems} subtotal={subTotal} />
                    {(!success && !error) && <>
                      <p style={{fontStyle: "italic", marginTop: "20px"}}>Note: As of now, we are not doing deliveries, and upon placement of order, you will be provided the address at which you can pick up the order.</p>
                      <p style={{fontStyle: "italic"}}>We are situated in Sector 57, Gurgaon</p>
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
