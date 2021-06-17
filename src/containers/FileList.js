import { connect } from "react-redux";
import { FileList } from "../components/FileList/index";
import { bindActionCreators } from "redux";
import {
  setCurrentPathAction,
  popCurrentPathAction,
  updateFilesByKey,
  renameAction,
  deleteAction,
  createNewFolderAction,
  uploadFileAction
} from "../actions/files";

const mapStateToProps = (state) => ({
  fileList: state.files.fileList,
  selectedFiles: state.files.selectedFiles,
  currentPath: state.files.currentPath,
  subfileList: state.files.subfileList,
  path: state.files.path
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCurrentPathAction,
      popCurrentPathAction,
      updateFilesByKey,
      renameAction,
      deleteAction,
      createNewFolderAction,
      uploadFileAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
