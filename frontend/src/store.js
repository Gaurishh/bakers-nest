import {combineReducers} from 'redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { getAllProductsReducer, addProductReducer, getProductByIdReducer, editProductReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducer.js'
import { placeOrderReducer, getUserOrdersReducer, getAllOrdersReducer } from './reducers/orderReducer.js'

const finalReducer = combineReducers({
    getAllProductsReducer,
    cartReducer,
    placeOrderReducer,
    getUserOrdersReducer,
    addProductReducer,
    getProductByIdReducer,
    editProductReducer,
    getAllOrdersReducer
});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//if there is a cart in the local storage, then store it, otherwise store the empty cart.

const initialState = {
    cartReducer : {
        cartItems : cartItems
    }
}

const composeEnhancers = composeWithDevTools({});

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;