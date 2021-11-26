import { SIGNIN_SUCCESS, SIGNIN_FAIL, LOGOUT, LOAD_USER, LOGIN_LOADING_TRUE, FAIL_EDIT } from "../ActionTypes";
import jwt_decode from "jwt-decode";

import axios from "../../Utility/AxiosConfig";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  errors: null,
  loading: false,
};

export const signinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    case LOAD_USER:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        user: jwt_decode(payload).user,
        loading: false,
        errors: null,
      };

    case SIGNIN_SUCCESS:
      localStorage.removeItem("token");
      localStorage.setItem("token", payload.token);
      axios.defaults.headers.common["auth-token"] = localStorage.getItem(
        "token"
      );
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        user: jwt_decode(localStorage.getItem("token")).user,
        // ...jwt_decode(payload.token),
        loading: false,
        errors: null,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        errors: payload,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
      };

      case FAIL_EDIT:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        errors: null,
        token: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
