import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../../actions/orderActions.js";
import Error from '../Error.js'
import Loading from "../Loading.js";

export default function Orderslist() {

  const dispatch = useDispatch();
  const getOrdersState = useSelector((state) => state.getAllOrdersReducer);
  console.log(getOrdersState);
  const {orders, error, loading} = getOrdersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <div className="col-md-10 mx-auto">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {(!loading && !error) && <table className="table table-bordered thead-dark">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Items</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.email}</td>
                    <td>{order.orderAmount}</td>
                    <td>{order.orderItems.map(item => (<>{item.name} x {item.quantity}</>))}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {order.isDelivered ? (
                        <>Delivered</>
                      ) : (
                        <button className="btn" onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}
