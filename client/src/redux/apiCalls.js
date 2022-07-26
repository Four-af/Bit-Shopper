import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest } from "../requestMethods";
import axios from "axios";

const configContentType = {
  headers: { "Content-type": "application/json" },
};
export const login = async (
  dispatch,
  { userName: userName, password: password }
) => {
  dispatch(loginStart());
  // try {
  //   const res = await axios.post("http://localhost:5000/api/auth/login", user);
  //   console.log("data", res.data);
  //   dispatch(loginSuccess(res.data));
  // } catch (err) {
  //   dispatch(loginFailure());
  //   console.log(err);
  // }
  try {
    console.log(userName, password);
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        userName: userName,
        // email: email,
        password: password,
      },
      configContentType
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
  // setName("");
  // setUserName("");
  // setEmail("");
  // setPassword("");
};
