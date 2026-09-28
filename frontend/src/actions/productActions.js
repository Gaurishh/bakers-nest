import api from "../api/axios.js";


export const filterProducts = (searchkey, category) => async dispatch => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });

    try {
        const response = await api.get(`/api/products/getallproducts`);
        const lowerSearchKey = searchkey.toLowerCase();
        let filteredProducts = response.data.filter(product =>
            product.name.toLowerCase().includes(lowerSearchKey)
        );

        if (category !== 'All') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        // Dispatch a new action type for filtering
        dispatch({ type: 'FILTER_PRODUCTS_SUCCESS', payload: filteredProducts });
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: error });
    }
};

export const getAllProducts = () => async dispatch => {

    dispatch({type: 'GET_PRODUCTS_REQUEST'});

    try {
        const response = await api.get(`/api/products/getallproducts`);
        dispatch({type: 'GET_PRODUCTS_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_PRODUCTS_FAILED', payload: error});
    }
}

export const getProductsByPage = (skip, limit) => async dispatch => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });
    try {
        // Pass skip and limit as query parameters
        const response = await api.get(`/api/products/getproductsbypage?skip=${skip}&limit=${limit}`);
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: error });
    }
};

export const getProductById = (productid) => async dispatch => {

    dispatch({type: 'GET_PRODUCTBYID_REQUEST'});

    try {
        const response = await api.post(`/api/products/getproductbyid`, {productid});
        dispatch({type: 'GET_PRODUCTBYID_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_PRODUCTBYID_FAILED', payload: error});
    }

}

export const addProduct = (product) => async dispatch => {
    dispatch({type: 'ADD_PRODUCT_REQUEST'})
    try {
        const response = await api.post(`/api/products/addproduct`, {product})
        dispatch({type: 'ADD_PRODUCT_SUCCESS', payload: response.data})
    } catch (error) {
        dispatch({type: 'ADD_PRODUCT_FAILED', payload: error})
    }
}

export const editProduct = (editedProduct) => async dispatch => {
    dispatch({type: 'EDIT_PRODUCT_REQUEST'})
    try {
        const response = await api.post(`/api/products/editproduct`, {editedProduct})
        dispatch({type: 'EDIT_PRODUCT_SUCCESS', payload: response.data})
    } catch (error) {
        dispatch({type: 'EDIT_PRODUCT_FAILED', payload: error})
    }
}

export const productVisibility = (productId, value) => async dispatch => {
    try {
      await api.post(`/api/products/productvisibility`, { productId, value });
      dispatch({ type: 'TOGGLE_PRODUCT_VISIBILITY', payload: { productId, value } });
    } catch (error) {
      alert("Error while toggling visibility");
      console.log(error);
    }
  }  

export const deleteProduct = (productid) => async () => {
    try {
        await api.post(`/api/products/deleteproduct`, {productid});
        alert('Product deleted successfully!')
        window.location.reload()
    } catch (error) {
        alert("Error: Product deletion unsuccessful!")
    }
}