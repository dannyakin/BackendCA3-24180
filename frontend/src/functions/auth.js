import axios from "axios";
import Cookies from "js-cookie";
const API = "http://localhost:5000";
const token = Cookies.get("token");


export const register = async (values) => {
  try {
    const res = await axios.post(`${API}/api/users/register`, values, {
      withCredentials: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const login = async (values) => {
  try {
    const res = await axios.post(`${API}/api/users/login`, values, values, {
      withCredentials: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};