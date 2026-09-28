import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading.js'
import Error from "./Error.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import api from "../api/axios.js";

const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const errorMessage = (error, fallback) => error?.response?.data?.message || fallback;

const Checkout = ({ cartItems, address, isFree, amount, isEligible }) => {

  const { user } = useAuth0();

  const orderState = useSelector((state) => state.placeOrderReducer)
  const { loading, error, success } = orderState

  const dispatch = useDispatch()

  const placeOrderFailed = (message) => dispatch({ type: 'PLACE_ORDER_FAILED', payload: message })

  const initPayment = (data) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Baker's Nest",
      description: "Baker's Nest order",
      order_id: data.id,
      prefill: { name: user.name, email: user.email },
      handler: async (response) => {
        dispatch({ type: 'PLACE_ORDER_REQUEST' })
        try {
          await api.post('/api/orders/verify', { response });
          dispatch({ type: 'PLACE_ORDER_SUCCESS' })
          dispatch({ type: "EMPTY_CART" })
          localStorage.removeItem('cartItems')
        } catch (error) {
          console.log(error);
          placeOrderFailed("We received your payment but could not confirm it yet. It will appear in My Orders shortly — please don't pay again.");
        }
      },
      modal: {
        ondismiss: () => dispatch({ type: 'PLACE_ORDER_RESET' }),
      },
      theme: {
        color: "#FF0000"
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', (response) => {
      placeOrderFailed(response.error?.description || 'Payment failed, please try again.');
    });
    rzp1.open();
  }

  const handlePayment = async () => {

    if (!address.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    if (isEligible && amount > 700) {
      alert("Proceed with items worth 700 to place the first order!");
      return;
    }

    dispatch({ type: 'PLACE_ORDER_REQUEST' })
    try {
      const { data } = await api.post('/api/orders/placeOrder', {
        cartItems: cartItems.map(({ _id, varient, quantity }) => ({ _id, varient, quantity })),
        shippingAddress: address,
      });

      if (data.isFree) {
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        dispatch({ type: "EMPTY_CART" })
        localStorage.removeItem('cartItems')
      } else {
        initPayment(data.data)
      }

    } catch (error) {
      console.log(error);
      placeOrderFailed(errorMessage(error, 'Something went wrong, try again'));
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {(!success && !loading) && <Button onClick={handlePayment}>{isFree ? 'Place Order (Free)' : 'Pay Now'}</Button>}
    </div>
  );
};

export default Checkout;
