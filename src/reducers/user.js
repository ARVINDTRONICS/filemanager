import ActionTypes from "../action-types";

const initialState = {
  username: "",
  isLoggedIn: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_BY_KEY:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.REFRESH_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
