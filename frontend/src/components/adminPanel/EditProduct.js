import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, getProductById } from '../../actions/productActions.js';
import Loading from "../Loading.js";
import Error from '../Error.js';

const EditProduct = (props) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [varient1Price, setVarient1Price] = useState();
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Brownies');

    const getProductByIdState = useSelector(state => state.getProductByIdReducer);

    const {product, error, loading} = getProductByIdState;

    const editProductState = useSelector((state) => state.editProductReducer);
    const {editLoading, editError, editSuccess} = editProductState;

    useEffect(() => {

        if(product && (product._id == props.id)){
          setName(product.name);
          setDescription(product.description);
          setImage(product.image);
          setCategory(product.category);
          setVarient1Price(product.prices[0][product.varients[0]]);
        }
        else{
          dispatch(getProductById(props.id))
        }

    }, [product, dispatch])
    
    function formHandler(e){
      e.preventDefault();
  
      const editedProduct = {_id: props.id, name, image, description, category, prices: [], varients: []};
      if(category === "Brownies"){
        const obj = {"1 Brownie": Number(varient1Price)};
        editedProduct.varients.push("1 Brownie");
        editedProduct.prices.push(obj);
      }
      else if(category === "Tub Cake"){
        const obj = {"1 Tub Cake": Number(varient1Price)};
        editedProduct.varients.push("1 Tub Cake");
        editedProduct.prices.push(obj);
      }
      else if(category === "Dry Cake"){
        const obj = {"1 Dry Cake": Number(varient1Price)};
        editedProduct.varients.push("1 Dry Cake");
        editedProduct.prices.push(obj);
      }
      else if(category === "Cheese Cake"){
        const obj = {"1 Jar/Cup": Number(varient1Price)};
        editedProduct.varients.push("1 Jar/Cup");
        editedProduct.prices.push(obj);
      }
      else if(category === "Jumbo Cookie"){
        const obj = {"1 Jumbo Cookie": Number(varient1Price)};
        editedProduct.varients.push("1 Jumbo Cookie");
        editedProduct.prices.push(obj);
      }
      else if(category === "Fudge"){
        const obj = {"10 pieces": Number(varient1Price)};
        editedProduct.varients.push("10 pieces");
        editedProduct.prices.push(obj);
      }

      dispatch(editProduct(editedProduct))
      
    }

  return (
    
    <div>
        <h1>Edit Product</h1>
        <h1>Product id = {props.id}</h1>

        {loading && (<Loading />)}
        {error && (<Error error="Something went wrong" />)}
        {editLoading && (<Loading />)}
        {editError && (<Error error="Something went wrong while editing" />)}
        {editSuccess && (<div className="alert alert-success" role="alert"> Product edited successfully! </div>)}

        <form onSubmit={formHandler} className="col-md-6 mx-auto">
          <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}}/>
          <input className="form-control" type="text" placeholder="Image URL" value={image} onChange={(e) => {setImage(e.target.value)}}/>
          <input className="form-control" type="text" placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
          <select className="form-control w-100 mt-2" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="Brownies">Brownies</option>
            <option value="Tub Cake">Tub Cake</option>
            <option value="Dry Cake">Dry Cake</option>
            <option value="Cheese Cake">Cheese Cake</option>
            <option value="Jumbo Cookie">Jumbo Cookie</option>
            <option value="Fudge">Fudge</option>
          </select>
          {category==="Brownies" && <>
          <input className="form-control" type="text" placeholder="1 Brownie" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          {category==="Tub Cake" && <>
          <input className="form-control" type="text" placeholder="1 Tub Cake Price" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          {category==="Dry Cake" && <>
          <input className="form-control" type="text" placeholder="1 Dry Cake Price" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          {category==="Cheese Cake" && <>
          <input className="form-control" type="text" placeholder="1 Cheese Cake Price" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          {category==="Jumbo Cookie" && <>
          <input className="form-control" type="text" placeholder="1 Jumbo Cookie Price" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          {category==="Fudge" && <>
          <input className="form-control" type="text" placeholder="10 pieces" value={varient1Price} onChange={(e) => {setVarient1Price(e.target.value)}}/>
          </>}
          <button className="btn mt-4" type="submit">Edit Product</button>
        </form>

    </div>
  )
}

export default EditProduct