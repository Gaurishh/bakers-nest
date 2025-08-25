import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions.js";
export default function Filter() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    const[category , setcategory] = useState('All')
    return (
        <div className='container'>
            <div className="w-50 row justify-content-center shadow-lg p-3 mx-auto bg-white rounded">

                    <div className="col-md-3 w-100">
                      <input
                      onChange={(e)=>{setsearchkey(e.target.value)}}
                      value={searchkey} type="text" className="form-control w-100" placeholder="Search Products"/>
                    </div>
                    <div className="col-md-3 w-100">
                        <select className="form-control w-100 mt-2" value={category} onChange={(e)=>setcategory(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Brownies">Brownies</option>
                            <option value="Tub Cake">Tub Cakes</option>
                            <option value="Dry Cake">Dry Cakes</option>
                            <option value="Cheese Cake">Cheese Cakes</option>
                            <option value="Jumbo Cookie">Jumbo Cookies</option>
                            <option value="Fudge">Fudges</option>
                        </select>
                    </div>
                    <div className="col-md-3 w-100">
                       <button className='btn w-100 mt-2' onClick={()=>{dispatch(filterProducts(searchkey , category))}}>FILTER</button>
                    </div>

            </div>
        </div>
    )
}
