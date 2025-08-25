import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import Loading from '../components/Loading.js'
import Error from "./Error.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const Checkout = (props) => {

  const {user} = useAuth0();

  const orderState = useSelector((state) => state.placeOrderReducer)
  const {loading, error, success} = orderState
  const cartState = useSelector((state) => state.cartReducer)

  console.log(cartState);

  const dispatch = useDispatch()

  const initPayment = async (data) => {
    const options = {
      key: "rzp_live_PPGiyZHJeSUhQb",
      amount: data.amount,
      currency: data.currency,
      name: "Cart Items",
      description: "Test Transaction",
      order_id: data.id,
      handler: async(response) => {
        dispatch({type: 'PLACE_ORDER_REQUEST'})
        try {
          const verifyUrl = "https://bakers-nest.onrender.com/api/orders/verify";
          const {data} = await axios.post(verifyUrl, {response: response, user: user, cartItems: cartState.cartItems, amount: props.subtotal});
          dispatch({type: 'PLACE_ORDER_SUCCESS'})
          dispatch({type: "EMPTY_CART"})
        } catch (error) {
          dispatch({type: 'PLACE_ORDER_FAILED'})
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

    try {
      const orderUrl = "https://bakers-nest.onrender.com/api/orders/placeOrder";
      const {data} = await axios.post(orderUrl, {amount: props.subtotal})
      initPayment(data.data)
    } catch (error) {
      dispatch({type: 'PLACE_ORDER_FAILED'})
      console.log(error);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error errror='Something went wrong, try again' />}
      {(!success && !error) && <Button onClick={handlePayment}>Pay Now</Button>}
    </div>
  );
};

export default Checkout;
