// src/pages/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../functions/redux/Slice/cartSlice";

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
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  return (
    <div className="container pt-5">
      <div className="text-[25px] font-bold">Product Details</div>
      <div className="">This is the details for {product?.title}</div>
      <div className="row">
        <div className="col-12">
          <div className="card p-5 rounded mt-4">
            <div className="row">
              <div className="col-3">
                <img
                  src={product.thumbnail}
                  className="h-[300px] object-cover"
                  alt={product.title}
                />
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
              </div>

              <div className="col-9 ">
                <div className="card-body">
                  <div className="text-orange-600 capitalize text-[20px] font-bold">
                    {product.title}
                  </div>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Rating: {product.rating}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Discount Percentage: {product.discountPercentage} %</p>
                  <p>
                    <b> Description:</b> {product.description} %
                  </p>

                  <button
                    className="p-2 px-6 bg-orange-600 text-white"
                    onClick={handleAddToCart}
                  >
                    Add to My Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
