import React, { useState } from "react";
import { useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/list`)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <>
            <Link to={`/users/${item._id}`}>
              <ListItem>
                <ListItemText primary={item.first_name} />
              </ListItem>
            </Link>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
