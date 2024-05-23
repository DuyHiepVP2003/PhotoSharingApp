import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import TopBar from "../TopBar";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/${userId}`)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {});
  }, [userId]);
  return (
    <>
      <TopBar username={user.first_name} />
      <Paper className="container">
        <Typography className="detail" variant="h5" gutterBottom>
          User Details
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <strong>First Name:</strong> {user.first_name}
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <strong>Last Name:</strong> {user.last_name}
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <strong>Description:</strong> {user.description}
        </Typography>
        <Typography className="detail" variant="body1" gutterBottom>
          <Link className="linkButton" to={`/photos/${user._id}`}>
            View Photo
          </Link>
        </Typography>
      </Paper>
    </>
  );
}

export default UserDetail;
