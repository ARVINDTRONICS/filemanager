import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import InputModal from "../InputModal";
import ImageIcon from "@material-ui/icons/Image";
import Popover from "@material-ui/core/Popover";
import isDblTouchTap from "../../helpers/index";
class File extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      isRenameModal: false,
      anchorEl: null
    };
  }
  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget }, () => {
      setTimeout(() => {
        this.handlePopoverClose();
      }, 1000);
    });
  };
  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const {
      type,
      name,
      size,
      ext,
      handleClick,
      handleDoubleClick,
      isSelected,
      index,
      renameAction,
      deleteAction
    } = this.props;
    return (
      <>
        <div
          onClick={() => {
            handleClick(name, index);
          }}
          onDoubleClick={() => {
            if (type === "dir") {
              handleDoubleClick(index);
            }
          }}
          key={`file-${index}`}
          data-selected={isSelected}
          onMouseEnter={(event) => {
            if (type === "file") {
              this.handlePopoverOpen(event);
            }
          }}
        >
          <div>
            <ListItem selected={isSelected}>
              <ListItemAvatar>
                <Avatar className={"avatar"}>
                  {type === "dir" ? (
                    <FolderIcon />
                  ) : type === "file" && ext.includes("image") ? (
                    <ImageIcon />
                  ) : (
                    <FileIcon />
                  )}
                  {}
                </Avatar>
              </ListItemAvatar>
              <ListItemText className="filename" primary={name}></ListItemText>{" "}
              {this.state.isMenuOpen ? (
                <CloseIcon
                  onClick={() => {
                    this.setState({ isMenuOpen: !this.state.isMenuOpen });
                  }}
                  className="m-1 "
                />
              ) : (
                <MoreVertIcon
                  onClick={() => {
                    this.setState({ isMenuOpen: !this.state.isMenuOpen });
                  }}
                  className="m-1 "
                />
              )}
            </ListItem>
            <Popover
              id="mouse-over-popover"
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              disableRestoreFocus
            >
              <p>{`size: ${size}KB`}</p>
              <p>{`ext: ${ext}`}</p>
            </Popover>
          </div>
        </div>

        {this.state.isMenuOpen && (
          <Paper elevation={3}>
            <MenuList>
              <MenuItem
                onClick={() => {
                  if (type === "dir") {
                    handleDoubleClick(index);
                  }
                }}
              >
                Open{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({ isRenameModal: true });
                }}
              >
                Rename
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteAction();
                  this.setState({ isMenuOpen: false });
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Paper>
        )}
        {this.state.isRenameModal && (
          <InputModal
            modalTitle={"Rename"}
            handleClose={() => {
              this.setState({ isRenameModal: false, isMenuOpen: false });
            }}
            isOpen={this.state.isRenameModal}
            name={name}
            actiontoCall={renameAction}
          />
        )}
      </>
    );
  }
}

export default File;
