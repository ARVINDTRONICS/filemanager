import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import InputModal from "../InputModal";
export const MenuBar = ({
  currentPath,
  popCurrentPathAction,
  handleSearch,
  uploadFileAction,
  createNewFolderAction
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isCreateFolder, setisCreateFolder] = React.useState(false);
  const handleUpload = (event) => {
    event.preventDefault();

    const files = event.currentTarget.form.querySelector("#button-file").files;

    if (files) {
      uploadFileAction({
        name: files[0].name,
        size: files[0].size,
        type: "file",
        ext: files[0].type
      });
    }
  };
  return (
    <div className="menu-wrap">
      <div className="search-bar d-flex-row ">
        <SearchIcon></SearchIcon>
        <InputBase
          placeholder="Search…"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      <div>
        {currentPath.length > 0 && (
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={() => {
              popCurrentPathAction();
            }}
          >
            Back
          </Button>
        )}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            console.log(e);
          }}
          enctype="multipart/form-data"
          method="POST"
        >
          <input
            accept="image/*"
            className={""}
            id="button-file"
            multiple
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="button-file">
            <Button
              type="submit"
              className="button"
              variant="contained"
              color="primary"
              component="span"
            >
              Upload File
            </Button>
          </label>
        </form>
      </div>
      <div>
        <Button
          type="button"
          className="button"
          variant="contained"
          color="primary"
          component="span"
          onClick={() => {
            setisCreateFolder(true);
          }}
        >
          Create New Folder
        </Button>
      </div>
      {isCreateFolder && (
        <InputModal
          modalTitle={"Create New Folder"}
          handleClose={() => {
            setisCreateFolder(false);
          }}
          isOpen={isCreateFolder}
          name={"default"}
          actiontoCall={createNewFolderAction}
        />
      )}
    </div>
  );
};
