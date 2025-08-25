import axios from "axios";

export const getUserOrders = (user) => async (dispatch, getState) => {

    dispatch({type: 'GET_USER_ORDERS_REQUEST'});

    try {
        const response = await axios.post('https://bakers-nest.onrender.com/api/orders/getuserorders', {userId: user.email});
        // console.log(response);
        dispatch({type: 'GET_USER_ORDERS_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_USER_ORDERS_FAILED', payload: error});
    }

};

export const getAllOrders=()=>async (dispatch,getState)=>{

    dispatch({type:'GET_ALLORDERS_REQUEST'})

    try {
        const response = await axios.get('https://bakers-nest.onrender.com/api/orders/getallorders')
        
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload : response.data})
    } catch (error) {
        dispatch({type:'GET_ALLORDERS_FAILED' , payload : error})
    }

}

export const deliverOrder=(orderid)=>async dispatch=>{

    try {
        const response = await axios.post('https://bakers-nest.onrender.com/api/orders/deliverorder' , {orderid})
        console.log(response);
        // alert('Order Delivered')
        const orders = await axios.get('https://bakers-nest.onrender.com/api/orders/getallorders')
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload: orders.data})
    } catch (error) {
        console.log(error);
    }
}