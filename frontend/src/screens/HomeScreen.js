import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByPage } from '../actions/productActions.js';
import Brownie from '../components/Brownie.js';
import TubCake from '../components/TubCake.js';
import DryCake from '../components/DryCake.js';
import CheeseCake from '../components/CheeseCake.js';
import JumboCookie from '../components/JumboCookie.js';
import Fudge from '../components/Fudge.js';
import Loading from '../components/Loading.js';
import Error from '../components/Error.js';
import Filter from "../components/Filter.js";
import Navbar from '../components/Navbar.js';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.getAllProductsReducer);
  const { products, error, loading, hasMore } = productsState;

  const [skip, setSkip] = useState(0);
  const limit = 3; 
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(getProductsByPage(skip, limit));
  }, [dispatch, skip]);

  const loadMoreProducts = () => {
    setSkip(prevSkip => prevSkip + limit);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 100px 0px', // triggers 100px before the sentinel is in view
        threshold: 0.1, // 10% visibility triggers the callback
      }
    );
    const currentRef = loaderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading]);
  
  return (
    <div className="App">
      <Navbar />
      <div className='row justify-content-center'>
        {loading && skip === 0 ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          <>
            <Filter />
            {products.map(product => (
              product.show && 
              <div className='col-md-3 m-3' key={product._id}>
                {product.category === "Brownies" && <Brownie brownie={product} />}
                {product.category === "Tub Cake" && <TubCake tubCake={product} />}
                {product.category === "Dry Cake" && <DryCake dryCake={product} />}
                {product.category === "Cheese Cake" && <CheeseCake cheeseCake={product} />}
                {product.category === "Jumbo Cookie" && <JumboCookie jumboCookie={product} />}
                {product.category === "Fudge" && <Fudge fudge={product} />}
              </div>
            ))}
            {loading && skip !== 0 && <Loading />}
            <div ref={loaderRef} style={{ height: '20px'}}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;