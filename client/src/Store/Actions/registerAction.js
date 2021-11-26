import { REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_LOADING_TRUE } from "../ActionTypes";
import axios from "../../Utility/AxiosConfig";

export const registerUser = (newUser, history) => (dispatch) => {
  axios
    .post("/users/signup", newUser)
    .then((success) => {
      history.push("/signin");
      return dispatch(successRegister());
    })
    .catch((fail) => {
      return dispatch(failRegister(fail.response.data));
    });
};

export const registerLoadingTrue = (err) => ({
  type: REGISTER_LOADING_TRUE,
  payload: true,
});

export const successRegister = () => ({
  type: REGISTER_SUCCESS,
});

export const failRegister = (err) => ({
  type: REGISTER_FAIL,
  payload: errorResolve(err),
});

const errorResolve = (errors) => {
  let errorEntities;
  if (Array.isArray(errors))
    errorEntities = errors.reduce(
      (errors, error) => ({ ...errors, [error.param]: error }),
      {}
    );
  else errorEntities = errors;

  // console.log(errors);
  return errorEntities;
};
