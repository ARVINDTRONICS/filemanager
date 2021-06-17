import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const InputModal = ({
  modalTitle,
  handleClose,
  isOpen,
  name,
  actiontoCall
}) => {
  const [value, setValue] = React.useState(name);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <form>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="File/Folder name"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button
            onClick={() => {
              actiontoCall(value);
              handleClose();
            }}
            type="button"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InputModal;
