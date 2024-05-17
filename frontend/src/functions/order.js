import axios from "axios";
import Cookies from "js-cookie";
const API = "http://localhost:5000";

export const postOrder = async (orderData) => {
  const token = Cookies.get("token");
  console.log(token)
  const config = {
    withCredentials: true,
    headers: {
      Authorization: token
    },
  };

  const response = await axios.post(`${API}/api/orders`, orderData, config);
  return response.data;
};

export const getOrders = async () => {
  try {
    const token = Cookies.get("token");
    console.log(token)
    const config = {
      withCredentials: true,
      headers: {
        Authorization: token
      },
    };
    const res = await axios.get(`${API}/api/orders`, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};
