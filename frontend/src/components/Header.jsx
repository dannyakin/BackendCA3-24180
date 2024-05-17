// src/components/Header.js
import React from "react";
import { Link, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { signOut } from "../functions/redux/Slice/authSlice";
import { FaCartShopping } from "react-icons/fa6";
const Header = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("currentUser");
    dispatch(signOut());
    // navigation.navigate("/login")
  };
  
  return (
    <header>
      <nav className="p-4">
        <div className="container ">
          <div className="flex items-center justify-between w-full gap-5">
            <ul className="">
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <div className="mr-auto"></div>
            {isAuthenticated ? (
              <div className="flex gap-6">
                <Link to="/myOrders">Order History</Link>
                <div onClick={logout} className=" cursor-pointer">Sign Out</div>
              </div>
            ) : (
              <div className="flex gap-6">
                <Link to="/login">Login</Link>
                <div to="register">Join Us</div>
              </div>
            )}
            <div className="relative ">
              {cartItems.length > 0 && (
                <Link to="/myCart">
                  <div className="absolute top-[-15px] right-[-10px] w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                    {cartItems.length}
                  </div>
                  <FaCartShopping color="white" size={25} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
