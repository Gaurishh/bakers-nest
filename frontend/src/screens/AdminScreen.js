import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
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
            <div className='col-md-10'>
                <ul className='adminFunctions'>
                    <li><Link onClick={() => setPanel('1')}>Products</Link></li>
                    <li><Link onClick={() => setPanel('2')}>Add New Product</Link></li>
                    <li><Link onClick={() => setPanel('3')}>Orders</Link></li>
                </ul>
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