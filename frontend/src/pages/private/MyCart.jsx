import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearCart, removeItem } from "../../functions/redux/Slice/cartSlice";
import { postOrder } from "../../functions/order";

const MyCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      await postOrder({ products: items });
      dispatch(clearCart());
    } catch {
      setError("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-lg">Your cart is empty</div>
      ) : (
        <>
          <div className="mb-6">Here's a summary of your selected items:</div>
          <ul className="mb-6 space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
              >
                <div>
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p className="text-lg">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded"
          >
            {loading ? "Processing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default MyCart;
