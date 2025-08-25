import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import Filter from "../components/Filter.js";

const email1 = process.env.REACT_APP_EMAIL1;
const email2 = process.env.REACT_APP_EMAIL2;

const Navbar = () => {
  const { user, isAuthenticated, logout, isLoading, loginWithRedirect } = useAuth0();
  const cartState = useSelector((state) => state.cartReducer);

  var isAdmin = false;

  if(isAuthenticated){
    var email = user["email"];

    isAdmin = (email===email1 || email===email2);

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded navbar-font">
        <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
          <img className="navbar-logo " src="https://i.imgur.com/o3dRG0z.jpg" alt="Baker's Nest Logo" />
          Baker's Nest
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isLoading ? (
          <div className="text-center ms-auto">Loading...</div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                  <div className="dropdown">
                    <Link
                      className="dropdown-toggle nav-link"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user["given_name"]}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {isAdmin && <Link className="dropdown-item btn-navbar" to="/shop/admin" style={{backgroundColor: 'black', color: 'white'}}>
                        Admin Panel
                      </Link>}
                      <Link className="dropdown-item btn-navbar" to="/shop/orders">
                        Orders
                      </Link>
                      <Link className="dropdown-item btn-navbar" to="/shop" onClick={() => { logout() }}>
                        Logout
                      </Link>
                    </div>
                  </div>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link btn-navbar" to="/shop" onClick={() => loginWithRedirect()}>
                    Login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link btn-navbar" to="/shop/cart">
                  Cart {cartState.cartItems.length}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
