
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/products/${id}`, product);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-[25px] pt-5 font-bold">Edit Product</div>
      <div className="">Fill the new details to update the product details(info).</div>
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
        className="border rounded "
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="border rounded "
        placeholder="Description"
        required
      ></textarea>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="border rounded "
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="discountPercentage"
        value={product.discountPercentage}
        onChange={handleChange}
        className="border rounded "
        placeholder="Discount Percentage"
      />
      <input
        type="number"
        name="rating"
        value={product.rating}
        onChange={handleChange}
        className="border rounded "
        placeholder="Rating"
      />
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        className="border rounded "
        placeholder="Stock"
        required
      />
      <input
        type="text"
        name="brand"
        value={product.brand}
        onChange={handleChange}
        className="border rounded "
        placeholder="Brand"
        required
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        className="border rounded "
        placeholder="Category"
        required
      />
      <input
        type="text"
        name="thumbnail"
        value={product.thumbnail}
        onChange={handleChange}
        className="border rounded "
        placeholder="Thumbnail URL"
        required
      />
      <input
        type="text"
        name="images"
        value={product.images}
        onChange={handleChange}
        className="border rounded "
        placeholder="Images URL (comma separated)"
        required
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
