import React from "react";
import { NavBar } from "../../components/NavBar";
import FileList from "../../containers/FileList";

class Home extends React.Component {
  async componentDidMount() {
    await this.props.getFileListAction();
  }
  render() {
    return (
      <div className="home">
        <NavBar
          userName={this.props.userName}
          refreshFiles={this.props.refreshFiles}
          refreshUser={this.props.refreshUser}
          history={this.props.history}
        />

        <FileList setSelectedFilesAction={this.props.setSelectedFilesAction} />
      </div>
    );
  }
}
export default Home;
