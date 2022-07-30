import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

const configContentType = {
  headers: { "Content-type": "application/json" },
};
export const login = async (dispatch, { username, password }) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "/auth/login",
      { username, password },
      configContentType
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};
