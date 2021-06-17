import { connect } from "react-redux";
import Home from "../layouts/Home";
import { bindActionCreators } from "redux";
import {
  getFileListAction,
  setSelectedFilesAction,
  refreshFiles
} from "../actions/files";
import { refreshUser } from "../actions/user";
const mapStateToProps = (state) => ({
  userName: state.user.username
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getFileListAction, setSelectedFilesAction, refreshFiles, refreshUser },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
