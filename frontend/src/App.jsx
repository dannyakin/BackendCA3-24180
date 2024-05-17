import React, { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Layout from "./components/Layout";
import OrdersList from "./pages/private/OrdersList";
import MyCart from "./pages/private/MyCart";

const Public = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      if (isAuthenticated) {
        navigate("/");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  if (loading) return "Loading...";
  return !isAuthenticated ? <Outlet /> : null;
};

const Private = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      if (!isAuthenticated) {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  if (loading) return "Loading....";

  return isAuthenticated ? <Outlet /> : null;
};

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Private />,
        children: [
          {
            path: "/myOrders",
            element: <OrdersList />,
          },
          {
            path: "/product/:id",
            element: <ProductPage />,
          },
          {
            path: "/myCart",
            element: <MyCart />,
          },
          {
            path: "/myOrders",
            element: <OrdersList />,
          },
        ],
      },
      {
        element: <Public />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/",
        element: <Welcome />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
