import ActionTypes from "../action-types";
import { updateValueBasedOnPath, formFilePath } from "../helpers";
import { getFileList, updateFilebyUsertoDB } from "../services/index";
export function updateFilesByKey(payload) {
  return {
    type: ActionTypes.UPDATE_FILES_BY_KEY,
    payload
  };
}
export function refreshFiles() {
  return {
    type: ActionTypes.REFRESH_FILES
  };
}

export function setSelectedFiles(payload) {
  return {
    type: ActionTypes.SET_SELECTED_FILES,
    payload
  };
}
export function setCurrentPath(payload) {
  return {
    type: ActionTypes.SET_CURRENT_PATH,
    payload
  };
}
export function popCurrentPath(payload) {
  return {
    type: ActionTypes.POP_CURRENT_PATH,
    payload
  };
}
export const setCurrentPathAction = (index) => {
  return (dispatch, getState) => {
    dispatch(setCurrentPath({ path: index }));
    let { files } = getState();
    let fileList = [...files.fileList];
    dispatch(
      updateFilesByKey({
        path: formFilePath(files.currentPath, fileList)
      })
    );
  };
};

export const popCurrentPathAction = () => {
  return (dispatch, getState) => {
    dispatch(popCurrentPath());
    let { files } = getState();
    let fileList = [...files.fileList];
    dispatch(
      updateFilesByKey({
        path: formFilePath(files.currentPath, fileList)
      })
    );
  };
};
export const renameAction = (rename) => {
  return async (dispatch, getState) => {
    const { files, user } = getState();
    let userId = user.username.split("@")[0];
    let subfileList = [...files.subfileList];
    let fileList = [...files.fileList];
    let currentPath = files.currentPath;
    let selected = files.selectedFiles;
    if (currentPath.length) {
      let matchedIndex = subfileList.findIndex(
        (each) => each.name === selected
      );
      subfileList[matchedIndex].name = rename;
      for (let i = 0; i < currentPath.length; i++) {
        fileList[files.currentPath[i]].children = subfileList;
      }
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
      dispatch(setSelectedFiles({ selectedFiles: "" }));
    } else {
      let matchedIndex = fileList.findIndex((each) => each.name === selected);
      fileList[matchedIndex].name = rename;
      dispatch(updateFilesByKey({ fileList: fileList }));
      dispatch(setSelectedFiles({ selectedFiles: "" }));
    }
    await updateFilebyUsertoDB(userId, fileList);
  };
};
export const deleteAction = () => {
  return async (dispatch, getState) => {
    const { files, user } = getState();
    let userId = user.username.split("@")[0];
    let subfileList = [...files.subfileList];
    let fileList = [...files.fileList];
    let currentPath = files.currentPath;
    let selected = files.selectedFiles;
    if (currentPath.length) {
      let matchedIndex = subfileList.findIndex(
        (each) => each.name === selected
      );
      subfileList.splice(matchedIndex, 1);
      updateValueBasedOnPath(fileList, currentPath, subfileList);
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
      dispatch(setSelectedFiles({ selectedFiles: "" }));
    } else {
      let matchedIndex = fileList.findIndex((each) => each.name === selected);
      fileList.splice(matchedIndex, 1);
      dispatch(updateFilesByKey({ fileList: fileList }));
      dispatch(setSelectedFiles({ selectedFiles: "" }));
    }
    await updateFilebyUsertoDB(userId, fileList);
  };
};
export const uploadFileAction = (payload) => {
  return async (dispatch, getState) => {
    const { files, user } = getState();
    let userId = user.username.split("@")[0];
    let subfileList = [...files.subfileList];
    let fileList = [...files.fileList];
    let currentPath = files.currentPath;
    if (currentPath.length) {
      subfileList.push(payload);
      updateValueBasedOnPath(fileList, currentPath, subfileList);
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
    } else {
      subfileList.push(payload);
      fileList.push(payload);
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
    }
    await updateFilebyUsertoDB(userId, fileList);
  };
};

export const createNewFolderAction = (folderName) => {
  return async (dispatch, getState) => {
    const { files, user } = getState();
    let userId = user.username.split("@")[0];
    let subfileList = [...files.subfileList];
    let fileList = [...files.fileList];
    let currentPath = files.currentPath;
    if (currentPath.length) {
      subfileList.push({
        name: folderName,
        type: "dir",
        size: 0,
        children: []
      });
      updateValueBasedOnPath(fileList, currentPath, subfileList);
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
    } else {
      subfileList.push({
        name: folderName,
        type: "dir",
        size: 0,
        children: []
      });
      fileList.push({ name: folderName, type: "dir", size: 0, children: [] });
      dispatch(
        updateFilesByKey({ subfileList: subfileList, fileList: fileList })
      );
    }
    await updateFilebyUsertoDB(userId, fileList);
  };
};
export const setSelectedFilesAction = (name, index) => {
  return (dispatch) => {
    dispatch(setSelectedFiles({ name: name, index: index }));
  };
};
export const getFileListAction = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    let userId = user.username.split("@")[0];
    dispatch(updateFilesByKey({ apiStatus: "pending" }));
    let response = await getFileList(userId);

    if (response.status === 200 && response.data) {
      dispatch(updateFilesByKey({ apiStatus: "done" }));
      dispatch(
        updateFilesByKey({
          fileList: response.data,
          subfileList: response.data
        })
      );
    } else {
      dispatch(updateFilesByKey({ apiStatus: "error" }));
    }
  };
};
