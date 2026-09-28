import api from "../api/axios.js";


export const getUserOrders = () => async (dispatch, getState) => {

    dispatch({type: 'GET_USER_ORDERS_REQUEST'});

    try {
        const response = await api.post(`/api/orders/getuserorders`);
        // console.log(response);
        dispatch({type: 'GET_USER_ORDERS_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_USER_ORDERS_FAILED', payload: error});
    }

};

export const getAllOrders=()=>async (dispatch,getState)=>{

    dispatch({type:'GET_ALLORDERS_REQUEST'})

    try {
        const response = await api.get(`/api/orders/getallorders`)
        
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload : response.data})
    } catch (error) {
        dispatch({type:'GET_ALLORDERS_FAILED' , payload : error})
    }

}

export const deliverOrder=(orderid)=>async dispatch=>{

    try {
        const response = await api.post(`/api/orders/deliverorder` , {orderid})
        console.log(response);
        // alert('Order Delivered')
        const orders = await api.get(`/api/orders/getallorders`)
        dispatch({type:'GET_ALLORDERS_SUCCESS' , payload: orders.data})
    } catch (error) {
        console.log(error);
    }
}