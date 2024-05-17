import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { login } from "../../functions/auth";
import { setUser } from "../../functions/redux/Slice/authSlice";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",

  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await login(values);
      dispatch(setUser(res.user));
      const userInfo = JSON.stringify(res.user);
      Cookies.set("currentUser", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });
      Cookies.set("token", res.token);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[50%] py-20 flex items-center justify-center flex-col bg-white ">
        <div className="w-[600px] rounded-xl border p-10 bg-white ">
          <div className="text-[25px]">Login</div>
          {error && <div className="text-red-500 text-[13px]">{error}</div>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <FieldWithError name="email" label="Email" type="email" />

              <FieldWithError
                name="password"
                label="Password"
                type="password"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-black-400 text-white rounded"
              >
                {loading ? "Loading.." : "Sign IN"}
              </button>
            </Form>
          </Formik>

          <Link to="/register" className="mt-4">
            I don't have an account Register
          </Link>
        </div>
      </div>
    </div>
  );
};

const FieldWithError = ({ name, label, type }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div className="mb-3">
      <Field className="w-[100%] border p-2 rounded" name={name} type={type} />
      <ErrorMessage
        className="text-[11px] text-orange-500"
        name={name}
        component="div"
      />
    </div>
  </div>
);

export default Login;
