import React, { useState, useEffect } from "react";
import Loading from "../Loading.js";
import Error from "../Error.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct, productVisibility } from "../../actions/productActions.js";
import { Modal, Button } from "react-bootstrap";

const ProductsList = (props) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.getAllProductsReducer);
  // console.log(productsState)
  const { products, error, loading } = productsState;

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Handle delete button click - show confirmation modal
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Handle actual deletion after confirmation
  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

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
                    <i className="fa fa-trash m-1" onClick={() => handleDeleteClick(product)} style={{cursor:'pointer'}}></i>
                    <i className="fa fa-edit m-1" onClick={() => {props.fnctn(product._id)}} style={{cursor:'pointer'}}></i>
                    {product.show && <i class="fa fa-eye ml-10" aria-hidden="true" onClick={ () => {dispatch(productVisibility(product._id, false))}} style={{cursor:'pointer'}}></i>}
                    {!product.show && <i class="fa fa-eye-slash" aria-hidden="true" onClick={() => {dispatch(productVisibility(product._id, true))}} style={{cursor:'pointer'}}></i>}
                  
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>"{productToDelete?.name}"</strong>?
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductsList;
