import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import fetchModel from "../../lib/fetchModelData";
import { useEffect, useState } from "react";
import { ImageList, ImageListItem, Typography } from "@mui/material";
export default function AddPhoto() {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const res = await fetch("http://localhost:8081/api/photo/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      throw new Error("No file provided");
    }
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/photo/photosOfUser/${userId}`)
      .then((res) => {
        setPhotos(res);
      })
      .catch((err) => {});
  }, [photos, userId]);
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new photo
      </Button>
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Your photo
      </Typography>

      <ImageList sx={{ width: 1000, height: 450 }} cols={4} rowHeight={164}>
        {photos.map((item) => (
          <ImageListItem key={item._id}>
            <img src={`../images/${item.file_name}`} loading="lazy" alt="" />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your file</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleFileChange}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
