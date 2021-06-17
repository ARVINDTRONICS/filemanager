import { connect } from "react-redux";
import { updateUserByKey, refreshUser } from "../actions/user";
import { LogIn } from "../layouts/Login";
import { bindActionCreators } from "redux";
import { refreshFiles } from "../actions/files";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateUserByKey, refreshFiles, refreshUser },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(LogIn);
