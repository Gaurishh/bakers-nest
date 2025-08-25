import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar.js'
import OrdersList from '../components/adminPanel/OrdersList.js';
import ProductsList from '../components/adminPanel/ProductsList.js';
import AddProduct from '../components/adminPanel/AddProduct.js';
import EditPizza from '../components/adminPanel/EditProduct.js';

const email1 = process.env.REACT_APP_EMAIL1;
const email2 = process.env.REACT_APP_EMAIL2;

function AdminScreen() {

    const {user, isAuthenticated, isLoading} = useAuth0();
    var isAdmin = false;

    const [productToBeEdited, setProductToBeEdited] = useState('');
    const [panel, setPanel] = useState('1');

    const productEditor = (product_id) => {
        setProductToBeEdited(product_id);
        setPanel('4');
    }

    if(!isLoading){

        if(!isAuthenticated){
            window.location.href = '/shop'
        }
        else{
            var email = user["email"];

            isAdmin = (email===email1 || email===email2);

            if(!isAdmin){
                window.location.href = '/shop'
            }
        }
    }

    return (
    <div className="App">
        <Navbar />
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <button 
                        className="admin-btn"
                        onClick={() => setPanel('1')}
                        style={{ 
                            flex: '0 0 auto', 
                            margin: '0 auto',
                            backgroundColor: panel === '1' ? '#343a40' : 'transparent',
                            color: panel === '1' ? 'white' : '#343a40',
                            border: '2px solid #343a40',
                            minWidth: '120px',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            fontWeight: '500'
                        }}
                    >
                        Products
                    </button>
                    <button 
                        className="admin-btn"
                        onClick={() => setPanel('2')}
                        style={{ 
                            flex: '0 0 auto', 
                            margin: '0 auto',
                            backgroundColor: panel === '2' ? '#343a40' : 'transparent',
                            color: panel === '2' ? 'white' : '#343a40',
                            border: '2px solid #343a40',
                            minWidth: '120px',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            fontWeight: '500'
                        }}
                    >
                        Add New Product
                    </button>
                    <button 
                        className="admin-btn"
                        onClick={() => setPanel('3')}
                        style={{ 
                            flex: '0 0 auto', 
                            margin: '0 auto',
                            backgroundColor: panel === '3' ? '#343a40' : 'transparent',
                            color: panel === '3' ? 'white' : '#343a40',
                            border: '2px solid #343a40',
                            minWidth: '120px',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            fontWeight: '500'
                        }}
                    >
                        Orders
                    </button>
                </div>
            </div>
        </div>

        {panel==='1' && <ProductsList fnctn={productEditor} />}
        {panel==='2' && <AddProduct />}
        {panel==='3' && <OrdersList />}
        {panel==='4' && <EditPizza id={productToBeEdited} />}

    </div>
    )

}

export default AdminScreen