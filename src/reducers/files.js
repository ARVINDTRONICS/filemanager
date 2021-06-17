import ActionTypes from "../action-types";

const initialState = {
  fileList: [],
  selectedFiles: "",
  currentPath: [],
  subfileList: [],
  path: "home/",
  apiStatus: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FILES_BY_KEY:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.SET_SELECTED_FILES:
      return {
        ...state,
        selectedFiles: action.payload.name
      };
    case ActionTypes.SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: [...state.currentPath, action.payload.path]
      };
    case ActionTypes.POP_CURRENT_PATH:
      return {
        ...state,
        currentPath: state.currentPath.slice(0, -1)
      };
    case ActionTypes.REFRESH_FILES:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
