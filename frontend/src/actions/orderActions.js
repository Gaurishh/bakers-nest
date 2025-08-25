import axios from "axios";

// Get the backend API URL from environment variable
const API_BASE_URL = process.env.REACT_BACKEND_APP_API_URL || 'http://localhost:8000';

export const getUserOrders = (user) => async (dispatch, getState) => {

    dispatch({type: 'GET_USER_ORDERS_REQUEST'});

    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/getuserorders`, {userId: user.email});
        // console.log(response);
        dispatch({type: 'GET_USER_ORDERS_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_USER_ORDERS_FAILED', payload: error});
    }

};

export const getAllOrders=()=>async (dispatch,getState)=>{

    dispatch({type:'GET_ALLORDERS_REQUEST'})

    try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/getallorders`)
        
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload : response.data})
    } catch (error) {
        dispatch({type:'GET_ALLORDERS_FAILED' , payload : error})
    }

}

export const deliverOrder=(orderid)=>async dispatch=>{

    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/deliverorder` , {orderid})
        console.log(response);
        // alert('Order Delivered')
        const orders = await axios.get(`${API_BASE_URL}/api/orders/getallorders`)
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload: orders.data})
    } catch (error) {
        console.log(error);
    }
}