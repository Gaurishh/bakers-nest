import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions.js";

export default function Filter() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    const[category , setcategory] = useState('All')
    
    return (
        <div className='container'>
            <div className="row justify-content-center shadow-lg p-3 mx-auto bg-white rounded w-75 w-md-75 w-lg-50">
                <div className="col-12 mb-3">
                    <input
                        onChange={(e)=>{setsearchkey(e.target.value)}}
                        value={searchkey} 
                        type="text" 
                        className="form-control" 
                        placeholder="Search Products"
                    />
                </div>
                <div className="col-12 mb-3">
                    <select 
                        className="form-control" 
                        value={category} 
                        onChange={(e)=>setcategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Brownies">Brownies</option>
                        <option value="Tub Cake">Tub Cake</option>
                        <option value="Dry Cake">Dry Cake</option>
                        <option value="Cheese Cake">Cheese Cake</option>
                        <option value="Jumbo Cookie">Jumbo Cookie</option>
                        <option value="Fudge">Fudge</option>
                    </select>
                </div>
                <div className="col-12">
                    <button 
                        className='btn btn-primary w-100' 
                        onClick={()=>{dispatch(filterProducts(searchkey , category))}}
                    >
                        FILTER
                    </button>
                </div>
            </div>
        </div>
    )
}
