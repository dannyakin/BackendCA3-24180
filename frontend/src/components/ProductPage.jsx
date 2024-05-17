// src/pages/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container pt-5">
      <div className="text-[25px] font-bold">Product Details</div>
      <div className="">This is the details for {product?.title}</div>
      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header capitalize text-[20px] font-bold">
              {product.title}
            </div>
            <img src={product.thumbnail} alt={product.title} />
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, i) => (
                <div className="">
                  <img
                    className="w-[140px] h-140px]"
                    src={image}
                    key={i}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="card-body">
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
              <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p>
              <p>Discount Percentage: {product.discountPercentage} %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
