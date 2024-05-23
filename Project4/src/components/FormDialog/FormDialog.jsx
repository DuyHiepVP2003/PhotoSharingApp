import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function FormDialog({ newComment, setNewComment, photoId }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (photoId !== newComment.photoId) {
      setNewComment({
        comment: "",
        photoId: photoId,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setNewComment({
      ...newComment,
      comment: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not logged in");
    }
    const commentContent = { comment: newComment.comment };
    try {
      const res = await fetch(
        `http://localhost:8081/api/photo/commentsOfPhoto/${newComment.photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentContent),
        }
      );
      if (!res.ok) {
        throw new Error("Error to add comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To comment to this photo, please enter your comment here.
          </DialogContentText>
          <TextField
            onChange={handleInputChange}
            autoFocus
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={newComment.comment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Comment</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
