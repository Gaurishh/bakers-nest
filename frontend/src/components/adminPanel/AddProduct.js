import React, {useState, useEffect} from "react";
import AdminScreen from "../../screens/AdminScreen.js";
import { addProduct} from "../../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading.js";
import Error from '../Error.js';

function AddProduct() {

  const [name, setName] = useState('');
  const [varient1Price, setVarient1Price] = useState();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Brownies');

  const dispatch = useDispatch()

  const addProductState = useSelector(state => state.addProductReducer)
  const {success, error, loading} = addProductState

  function formHandler(e){
    e.preventDefault();

    const product = {name, image, description, category, prices: [], varients: []};
    if(category === "Brownies"){
      const obj = {"1 Brownie": Number(varient1Price)};
      product.varients.push("1 Brownie");
      product.prices.push(obj);
    }
    else if(category === "Tub Cake"){
      const obj = {"1 Tub Cake": Number(varient1Price)};
      product.varients.push("1 Tub Cake");
      product.prices.push(obj);
    }
    else if(category === "Dry Cake"){
      const obj = {"1 Dry Cake": Number(varient1Price)};
      product.varients.push("1 Dry Cake");
      product.prices.push(obj);
    }
    else if(category === "Cheese Cake"){
      const obj = {"1 Jar/Cup": Number(varient1Price)};
      product.varients.push("1 Jar/Cup");
      product.prices.push(obj);
    }
    else if(category === "Jumbo Cookie"){
      const obj = {"1 Jumbo Cookie": Number(varient1Price)};
      product.varients.push("1 Jumbo Cookie");
      product.prices.push(obj);
    }
    else if(category === "Fudge"){
      const obj = {"10 pieces": Number(varient1Price)};
      product.varients.push("10 pieces");
      product.prices.push(obj);
    }
    
    dispatch(addProduct(product));
  }

  return (
    <div>
        <h2>Add Product</h2>

        {loading && (<Loading />)}
        {error && (<Error error="Something went wrong" />)}
        {success && (<div className="alert alert-success" role="alert"> New Product Added successfully! </div>)}

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
          <button className="btn mt-4" type="submit">Add Product</button>
        </form>

    </div>
  );
}

export default AddProduct;
