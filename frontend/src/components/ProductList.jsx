import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="container">
      <div className="text-[25px] font-bold pt-5">Product List</div>
      <div className="">These are the list of the uploded products.</div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Discount Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Description</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product?._id}>
              <td className="flex gap-4 items-center justify-center">
                <img
                  src={product?.thumbnail}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  alt=""
                />{" "}
                {product?.title}
              </td>
              <td>${product?.price}</td>
              <td>{product?.category}</td>
              <td>{product?.brand}</td>
              <td>{product?.discountPercentage}</td>
              <td>{product?.rating}</td>
              <td>{product?.stock}</td>
              <td>{product?.description}</td>
              <td className="flex items-center gap-3">
                <Link to={`/product/${product?._id}`}>View</Link> |
                <Link to={`/edit-product/${product?._id}`}>Edit</Link> |
                <button
                  className="p-1 rounded"
                  onClick={() => deleteProduct(product?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
