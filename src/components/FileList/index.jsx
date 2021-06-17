import React from "react";
import File from "../File";
import { MenuBar } from "../MenuBar";
import { Loader } from "../Loader";
import Tree from "../../components/Tree";
export const FileList = ({
  fileList,
  subfileList,
  updateFilesByKey,
  setSelectedFilesAction,
  selectedFiles,
  setCurrentPathAction,
  currentPath,
  popCurrentPathAction,
  renameAction,
  deleteAction,
  uploadFileAction,
  createNewFolderAction,
  path,
  apiStatus
}) => {
  const [list, setList] = React.useState([...fileList]);

  React.useEffect(() => {
    filteredListBasedOnPath();
  }, []);

  React.useEffect(() => {
    filteredListBasedOnPath();
  }, [currentPath]);

  React.useEffect(() => {
    if (currentPath.length > 0) {
      setList(subfileList);
    } else {
      setList(fileList);
    }
  }, [subfileList, fileList]);

  //filteredList
  const filteredListBasedOnPath = () => {
    let tempFileList = [...fileList];
    if (currentPath.length === 0 && list) {
      updateFilesByKey({ subfileList: tempFileList });
      setList([...tempFileList]);
    } else {
      for (let i = 0; i < currentPath.length; i++) {
        tempFileList = tempFileList[currentPath[i]].children;
      }
      updateFilesByKey({ subfileList: tempFileList });
      setList(tempFileList);
    }
  };
  const filteredListBasedOnSearch = (searchTerm) => {
    if (subfileList && searchTerm && searchTerm.length > 0) {
      let tempList = [...subfileList];
      let result = tempList.filter((each) =>
        each.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setList(result);
    } else {
      setList(subfileList);
    }
  };
  //handlers
  const handleClick = (name, index) => {
    setSelectedFilesAction(name, index);
  };
  const handleDoubleClick = (index) => {
    setCurrentPathAction(index);
  };
  const handleSearch = (searchTerm) => {
    filteredListBasedOnSearch(searchTerm);
  };

  if (apiStatus === "pending") {
    return <Loader />;
  } else {
    return (
      <div className="file-container">
        <h1 className="m-1 p-1">{path}</h1>
        <MenuBar
          currentPath={currentPath}
          popCurrentPathAction={popCurrentPathAction}
          handleSearch={handleSearch}
          uploadFileAction={uploadFileAction}
          createNewFolderAction={createNewFolderAction}
        />
        <div className="fileList-wrap">
          <div className="tree-wrap">
            <Tree fileList={fileList}></Tree>
          </div>
          <div className="file-wrap">
            {list &&
              list.length > 0 &&
              list.map((eachFile, index) => {
                return (
                  <File
                    type={eachFile.type}
                    name={eachFile.name}
                    size={
                      eachFile.size
                        ? (Number(eachFile.size) / 1000).toFixed(2)
                        : null
                    }
                    ext={eachFile.ext ? eachFile.ext : null}
                    handleClick={handleClick}
                    handleDoubleClick={handleDoubleClick}
                    index={index}
                    isSelected={eachFile.name === selectedFiles}
                    renameAction={renameAction}
                    deleteAction={deleteAction}
                    children={eachFile.children ? eachFile.children : null}
                  ></File>
                );
              })}
            {!list && <div>No Files/Folders found in this path </div>}
          </div>
        </div>
      </div>
    );
  }
};
