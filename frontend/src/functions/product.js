import axios from "axios";

export const createProduct = async (product) => {
  console.log("PRoductes", product)
  try {
    const res = await axios.post(
      `http://localhost:5000/api/products`,
      product,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

