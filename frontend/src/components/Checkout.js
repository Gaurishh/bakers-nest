import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading.js'
import Error from "./Error.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

// Get the backend API URL from environment variable
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
// Get Razorpay credentials from environment variables
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const Checkout = ({ cartItems, address, isFree, amount }) => {

  const { user } = useAuth0();

  const orderState = useSelector((state) => state.placeOrderReducer)
  const { loading, error, success } = orderState
  const cartState = useSelector((state) => state.cartReducer)

  const dispatch = useDispatch()

  const initPayment = async (data) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Cart Items",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        dispatch({ type: 'PLACE_ORDER_REQUEST' })
        try {
          const verifyUrl = `${API_BASE_URL}/api/orders/verify`;
          await axios.post(verifyUrl, {
            response: response,
            user: user,
            cartItems: cartState.cartItems,
            calculatedAmount: data.calculatedAmount,
            shippingAddress: address
          });
          dispatch({ type: 'PLACE_ORDER_SUCCESS' })
          dispatch({ type: "EMPTY_CART" })
        } catch (error) {
          dispatch({ type: 'PLACE_ORDER_FAILED' })
          console.log(error);
        }
      },
      theme: {
        color: "#FF0000"
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async () => {

    if (!address) {
      alert("Please enter your shipping address.");
      return;
    }

    try {
      const orderUrl = `${API_BASE_URL}/api/orders/placeOrder`;
      const { data } = await axios.post(orderUrl, {
        cartItems: cartState.cartItems,
        shippingAddress: address,
        userEmail: user.email,
        userName: user.name
      });

      if (data.isFree) {
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        dispatch({ type: "EMPTY_CART" })
      } else {
        initPayment(data.data)
      }

    } catch (error) {
      dispatch({ type: 'PLACE_ORDER_FAILED' })
      console.log(error);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error errror='Something went wrong, try again' />}
      {(!success && !error) && <Button onClick={handlePayment}>{isFree ? 'Place Order (Free)' : 'Pay Now'}</Button>}
    </div>
  );
};

export default Checkout;
