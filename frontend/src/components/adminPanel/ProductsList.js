import React, { useEffect } from "react";
import Loading from "../Loading.js";
import Error from "../Error.js";
import Filter from "../Filter.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct, productVisibility } from "../../actions/productActions.js";

const ProductsList = (props) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.getAllProductsReducer);
  // console.log(productsState)
  const { products, error, loading } = productsState;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <h2>Products</h2>
      {error && <Error error="Something went wrong" />}
      {loading && <Loading />}

      {(!loading && !error) && <div className="col-md-10 mx-auto">
        <table className="table table-bordered thead-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Prices</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>
                    {Object.keys(product.prices[0]).map((key) => (
                      <div key={key}>
                        {key}: {product.prices[0][key]}
                      </div>
                    ))}
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <i className="fa fa-trash m-1" onClick = {() => {dispatch(deleteProduct(product._id))}} style={{cursor:'pointer'}}></i>
                    <i className="fa fa-edit m-1" onClick={() => {props.fnctn(product._id)}} style={{cursor:'pointer'}}></i>
                    {product.show && <i class="fa fa-eye ml-10" aria-hidden="true" onClick={ () => {dispatch(productVisibility(product._id, false))}} style={{cursor:'pointer'}}></i>}
                    {!product.show && <i class="fa fa-eye-slash" aria-hidden="true" onClick={() => {dispatch(productVisibility(product._id, true))}} style={{cursor:'pointer'}}></i>}
                  
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default ProductsList;
