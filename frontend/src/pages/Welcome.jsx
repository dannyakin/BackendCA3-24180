import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../functions/product";

const Welcome = () => {
  const [product, setProducet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProducts();
        setProducet(res);
        console.log(res);
      } catch (error) {
        setError("Error while fetching the products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <div className="text-[25px] text-orange-600">
        Welcome to Daniel Gbenle store.
      </div>
      <div className="text-gray-500 mb-5">
        In here you can get all yout goods we are very reliable and we sell good
        products.
      </div>

      {loading ? (
        <div className="text-center">Loading..</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="row">
          {product.length > 0 &&
            product.map((item, i) => (
              <div className="col-3 cursor-pointer" key={i}>
                <Link to={`/product/${item?._id}`}>
                  <div className="card relative h-[400px]">
                    <div className="absolute top-3 right-3 bg-black text-white py-2  rounded px-3">
                      $ {item?.price}
                    </div>
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="card-body ">
                      <div className=" capitalize font-bold">{item?.title}</div>
                      <div className="">Brand: {item?.brand}</div>
                      <div className="">Category: {item?.category}</div>
                      {/* <div className=" overflow-hidden text-ellipsis w-full h-0">{item?.description}</div> */}
                      <div className="flex gap-4">
                        <div className="">{item?.discountPercentage}% Off</div>
                        <div className="">Rating: {item?.rating}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Welcome;
