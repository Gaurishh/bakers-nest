import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions.js";
export default function Filter() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    const[category , setcategory] = useState('All')
    return (
        <div className='container'>
            <div className="row justify-content-center shadow-lg p-3 mx-auto bg-white rounded">
                <div className="col-12 col-md-3 mb-2">
                    <input
                        onChange={(e)=>{setsearchkey(e.target.value)}}
                        value={searchkey} 
                        type="text" 
                        className="form-control w-100" 
                        placeholder="Search Products"
                    />
                </div>
                <div className="col-12 col-md-3 mb-2">
                    <select 
                        className="form-control w-100" 
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
                <div className="col-12 col-md-3 mb-2">
                    <button 
                        className='btn w-100' 
                        onClick={()=>{dispatch(filterProducts(searchkey , category))}}
                    >
                        FILTER
                    </button>
                </div>
            </div>
        </div>
    )
}
