import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions.js';
import Loading from "../components/Loading.js";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar.js';
import { FaShoppingBag, FaCalendarAlt, FaCreditCard, FaReceipt, FaBox } from 'react-icons/fa/index.esm.js';

const Ordersscreen = () => {

    const { user, isLoading } = useAuth0();
    AOS.init()
    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.getUserOrdersReducer)
    const { orders, loading } = orderstate

    useEffect(() => {
        dispatch(getUserOrders(user))
    }, [dispatch, user])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (order) => {
        // You can add logic here to determine order status
        return '#28a745'; // Default to green for now
    };

    return (
        <div className="App" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navbar />
            
            {/* Header Section */}
            <div style={{ padding: '2rem 0', marginBottom: '2rem' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '600', margin: '0', color: '#495057' }}>My Orders</h1>
                </div>
            </div>

            {(isLoading || loading) && <Loading />}
            
            {!isLoading && !loading && (
                <div className="container">
                    {orders && orders.length > 0 ? (
                        <div className="row justify-content-center">
                            {orders.map((order, index) => (
                                <div 
                                    key={order._id} 
                                    className="col-lg-10 col-md-12 mb-4" 
                                    data-aos='fade-up' 
                                    data-aos-delay={index * 100}
                                >
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        overflow: 'hidden',
                                        border: '1px solid #e9ecef'
                                    }}>
                                        {/* Order Header */}
                                        <div style={{
                                            background: `linear-gradient(135deg, ${getStatusColor(order)} 0%, ${getStatusColor(order)}dd 100%)`,
                                            color: 'white',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <h3 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '600' }}>
                                                    Order #{order._id.slice(-8).toUpperCase()}
                                                </h3>
                                                <p style={{ margin: '0.5rem 0 0 0', opacity: '0.9', fontSize: '0.9rem' }}>
                                                    Placed on {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                            <div style={{
                                                background: 'rgba(255,255,255,0.2)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '25px',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            }}>
                                                Confirmed
                                            </div>
                                        </div>

                                        {/* Order Content */}
                                        <div className="row" style={{ margin: '0' }}>
                                            {/* Order Items */}
                                            <div className="col-md-6 p-4">
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                                    <FaBox style={{ color: '#667eea', marginRight: '0.5rem' }} />
                                                    <h4 style={{ margin: '0', color: '#495057', fontSize: '1.1rem' }}>Order Items</h4>
                                                </div>
                                                <div style={{ borderLeft: '3px solid #e9ecef', paddingLeft: '1rem' }}>
                                                    {order.orderItems.map((item, itemIndex) => (
                                                        <div key={itemIndex} style={{
                                                            padding: '0.75rem 0',
                                                            borderBottom: itemIndex < order.orderItems.length - 1 ? '1px solid #f1f3f4' : 'none'
                                                        }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div>
                                                                    <p style={{ 
                                                                        margin: '0', 
                                                                        fontWeight: '600', 
                                                                        color: '#495057',
                                                                        fontSize: '0.95rem'
                                                                    }}>
                                                                        {item.name}
                                                                    </p>
                                                                    <p style={{ 
                                                                        margin: '0.25rem 0 0 0', 
                                                                        color: '#6c757d', 
                                                                        fontSize: '0.85rem' 
                                                                    }}>
                                                                        {item.varient} • Qty: {item.quantity}
                                                                    </p>
                                                                </div>
                                                                <span style={{
                                                                    fontWeight: '600',
                                                                    color: '#667eea',
                                                                    fontSize: '0.9rem'
                                                                }}>
                                                                    ₹{item.price}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Order Details */}
                                            <div className="col-md-6 p-4" style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                                    <FaReceipt style={{ color: '#667eea', marginRight: '0.5rem' }} />
                                                    <h4 style={{ margin: '0', color: '#495057', fontSize: '1.1rem' }}>Order Details</h4>
                                                </div>
                                                
                                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <FaCreditCard style={{ color: '#28a745', marginRight: '0.75rem', width: '16px', marginTop: '2px' }} />
                                                    <div style={{ textAlign: 'left' }}>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#6c757d' }}>Total Amount</p>
                                                        <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '700', color: '#495057' }}>
                                                            ₹{order.orderAmount}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <FaCalendarAlt style={{ color: '#ffc107', marginRight: '0.75rem', width: '16px', marginTop: '2px' }} />
                                                    <div style={{ textAlign: 'left' }}>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#6c757d' }}>Order Date</p>
                                                        <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500', color: '#495057' }}>
                                                            {formatDate(order.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <FaCreditCard style={{ color: '#17a2b8', marginRight: '0.75rem', width: '16px', marginTop: '2px' }} />
                                                    <div style={{ textAlign: 'left' }}>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#6c757d' }}>Transaction ID</p>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', fontWeight: '500', color: '#495057', wordBreak: 'break-all' }}>
                                                            {order.transactionId}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                    <FaReceipt style={{ color: '#6f42c1', marginRight: '0.75rem', width: '16px', marginTop: '2px' }} />
                                                    <div style={{ textAlign: 'left' }}>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#6c757d' }}>Order ID</p>
                                                        <p style={{ margin: '0', fontSize: '0.85rem', fontWeight: '500', color: '#495057', wordBreak: 'break-all' }}>
                                                            {order._id}
                                                        </p>
                                                    </div>
                                        </div>
                                </div>
                                </div>
                            </div>
                    </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            margin: '2rem 0'
                        }}>
                            <FaShoppingBag style={{ fontSize: '4rem', color: '#dee2e6', marginBottom: '1rem' }} />
                            <h3 style={{ color: '#6c757d', marginBottom: '1rem' }}>No Orders Yet</h3>
                            <p style={{ color: '#adb5bd', margin: '0' }}>
                                Start your sweet journey by placing your first order!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Ordersscreen;