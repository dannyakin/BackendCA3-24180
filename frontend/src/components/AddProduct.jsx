import React, { useState } from "react";
import axios from "axios";
import { createProduct } from "../functions/product";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createProduct(product);
      setMessage("Product uploaded succefully");
    } catch (error) {
      setError("There was an error adding the product!");
    } finally {
      setLoading(false);
    }
    // Redirect or update UI accordingly
  };

  return (
    <div className="container">
      <div className="text-[25px] pt-5 font-bold">Add Product</div>
      <div className="">
        Fill the new details to Upload a new product to the server.
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-500">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="border"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="border"
          placeholder="Description"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border"
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="discountPercentage"
          value={product.discountPercentage}
          onChange={handleChange}
          className="border"
          placeholder="Discount Percentage"
        />
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          className="border"
          placeholder="Rating"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="border"
          placeholder="Stock"
          required
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="border"
          placeholder="Brand"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border"
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleChange}
          className="border"
          placeholder="Thumbnail URL"
          required
        />
        <input
          type="text"
          name="images"
          value={product.images}
          onChange={handleChange}
          className="border"
          placeholder="Images URL (comma separated)"
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
