import { POST_SUCCESS, POST_FAIL, LOGOUT, CREATE_POST, POST_LIKE, POST_DISLIKE } from "../ActionTypes";

const initialState = {
  errors: null,
  loading: false,
  posts: null,
};

export const authTokenReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_POST:
    case POST_SUCCESS:
    case POST_LIKE:
    case POST_DISLIKE:
      return {
        ...state,
        ...payload,
        loading: false,
        errors: null,
      };

    case POST_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        errors: null,
        loading: false,
        posts: null,
      };

    default:
      return state;
  }
};
