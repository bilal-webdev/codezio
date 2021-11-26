import { SIGNIN_SUCCESS, SIGNIN_FAIL, LOGOUT, LOAD_USER, LOGIN_LOADING_TRUE, FAIL_EDIT } from "../ActionTypes";
import axios from "../../Utility/AxiosConfig";

export const signUser = (authUser, history) => (dispatch) => {
  axios
    .post("/users/signin", authUser)
    .then((success) => {
      // console.log(success);
      history.push("/timeline");
      return dispatch(successSignin(success.data));
    })
    .catch((fail) => {
      return dispatch(failSignin(fail.response.data));
    });
};

export const editUser = (authUser) => (dispatch) => {
  axios
    .post("/users/editprofile", authUser)
    .then((success) => {
      // console.log(success);
      return dispatch(successSignin(success.data));
    })
    .catch((fail) => {
      console.log(fail.response.data);
      return dispatch(failEdit(fail.response.data));
    });
};

export const resetPassword = (passwords, history) => (dispatch) => {
  axios
    .post("/users/resetpassword", passwords)
    .then((success) => {
      // console.log(success);
      history.push("/signin");
      return dispatch(logoutUser());
    })
    .catch((fail) => {
      // console.log(fail.response.data);
      return dispatch(failEdit(fail.response.data));
    });
};

export const deleteUser = (history) => (dispatch) => {
  axios
    .post("/users/deleteprofile")
    .then((success) => {
      // console.log(success);
      history.push("/");
      return dispatch(logoutUser());
    })
    .catch((fail) => {
      // console.log(fail);
      return dispatch(failSignin(fail.response.data));
    });
};

export const forgetPassword = (email, history) => (dispatch) => {
  axios
    .post("/users/forgetpassword", email)
    .then((success) => {
      // console.log(success);
      history.push("/signin");
      return dispatch(logoutUser());
    })
    .catch((fail) => {
      // console.log(fail);
      return dispatch(failSignin(fail.response.data));
    });
};

export const uploadImage = (updatedImage) => (dispatch) => {
  axios
    .post("/users/uploadimage", updatedImage)
    .then((success) => {
      console.log(success);
      return dispatch(successSignin(success.data));
    })
    .catch((fail) => {
      // console.log(fail);
      return dispatch(failSignin(fail.response.data));
    });
};

// export const successSignin = (auth) => (dispatch) => {
//   // axios.defaults.headers.common["auth-token"] = auth.token;
//   return dispatch({
//     type: SIGNIN_SUCCESS,
//     payload: auth,
//   });
// };

export const loginLoadingTrue = (err) => ({
  type: LOGIN_LOADING_TRUE,
  payload: true,
});

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

export const successSignin = (auth) => ({
  type: SIGNIN_SUCCESS,
  payload: auth,
});

export const failSignin = (err) => ({
  type: SIGNIN_FAIL,
  payload: errorResolve(err),
});

export const failEdit = (err) => ({
  type: FAIL_EDIT,
  payload: errorResolve(err),
});

export const logoutUser = () => ({
  type: LOGOUT,
});

const errorResolve = (errors) => {
  let errorEntities;
  if (Array.isArray(errors))
    errorEntities = errors.reduce(
      (errors, error) => ({ ...errors, [error.param]: error }),
      {}
    );
  else errorEntities = errors;

  console.log(errorEntities);
  return errorEntities;
};
