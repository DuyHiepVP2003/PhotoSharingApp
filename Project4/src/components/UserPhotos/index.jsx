import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import FormDialog from "../FormDialog/FormDialog";
function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [listUser, setListUser] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState({
    comment: "",
    photoId: "",
  });
  const getFirstName = (userId) => {
    const user = listUser.find((user) => user._id === userId);
    return user ? user.first_name : "";
  };
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/photo/photosOfUser/${userId}`)
      .then((res) => {
        setPhotos(res);
      })
      .catch((err) => {});
    fetchModel(`http://localhost:8081/api/user/${userId}`)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {});
    fetchModel(`http://localhost:8081/api/user/list`)
      .then((res) => {
        setListUser(res);
      })
      .catch((err) => {});
  }, [userId, photos]);
  return (
    <>
      <div className="container">
        {photos.map((photo) => (
          <div>
            <div>
              <img src={`../images/${photo.file_name}`} alt="anh" />
            </div>
            <p>Creation time: {photo.date_time}</p>
            <div>{`Comments (${photo.comments?.length}):`}</div>
            <ul>
              {photo.comments?.map((comment) => (
                <div>
                  <p>
                    <Link className="userName" to={`/users/${comment.user_id}`}>
                      {getFirstName(comment.user_id)}
                    </Link>
                  </p>
                  <p>{comment.comment}</p>
                </div>
              ))}
              <FormDialog
                newComment={newComment}
                setNewComment={setNewComment}
                photoId={photo._id}
              />
            </ul>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPhotos;
