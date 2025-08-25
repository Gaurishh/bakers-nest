import React , {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { getUserOrders } from '../actions/orderActions.js';
import Error from "../components/Error.js";
import Loading from "../components/Loading.js";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar.js';

const Ordersscreen = () => {

    const {user, isLoading} = useAuth0();
    AOS.init()
    const dispatch = useDispatch()
    const orderstate = useSelector(state=>state.getUserOrdersReducer)
    const {orders , error , loading} = orderstate

    var flag = 0;

    useEffect(() => {
        if(flag==1){
            dispatch(getUserOrders(user))
        }
    }, [dispatch, user, flag])

    flag = 1;
    return (
        <div className="App">
            <Navbar />
            <h2 style={{fontSize:'35px'}}>My Orders</h2>
            <hr/>
            {(isLoading || loading) && <Loading />}
            {!isLoading && !loading && <div className="row justify-content-center">
                {orders && orders.map(order=>{
                    return <div className="col-md-8 m-2 p-1" data-aos='fade-down'  style={{backgroundColor:'red' , color:'white'}}>
                            <div className="flex-container">
                                <div className='text-left w-100 m-1'>
                                    <h2 style={{fontSize:'25px'}}>Items</h2>
                                    <hr/>
                                    {order.orderItems.map(item=>{
                                        return <div>
                                            <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                                        </div>
                                    })}
                                </div>
                                <div className='text-left w-100 m-1'>
                                <h2 style={{fontSize:'25px'}}>Order Info</h2>
                                <hr/>
                                <p>Order Amount : {order.orderAmount}</p>
                                <p>Date : {order.createdAt.substring(0,10)}</p>
                                <p>Transaction Id : {order.transactionId}</p>
                                <p>Order Id : {order._id}</p>
                                </div>
                            </div>
                    </div>
                })}
            </div>}
        </div>
    )
}

export default Ordersscreen;