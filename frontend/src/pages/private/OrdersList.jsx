import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../functions/order";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const productsData = await getOrders();
        setOrders(productsData);
      } catch (error) {
        setError("Error fetching Orders");
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto pt-5">
      <div className="text-xl font-bold">Order History</div>
      <div className="text-red-500 mb-4">These are the orders that have been placed by you.</div>
      {orders.length > 0 ? (
        orders.map((order, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4">
            <div className="text-lg font-semibold mb-2">Order #{i + 1}</div>
            {order.products.map((product, j) => (
              <div key={j} className="border rounded p-2 mb-2 bg-gray-100">
                <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover mb-2" />
                <div className="text-md font-medium">Product Name: {product.title}</div>
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
                <div>Description: {product.description}</div>
                <div>Price: ${product.price}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default OrdersList;
