import React, { useEffect, useState } from "react";
import { Typography, Box, CardContent, Card, CardMedia, Divider, List, ListItem, ListItemText, Modal, Button } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";

import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
import { getUser } from "../../services/users";
import { createComment, getPhotosOfUser } from "../../services/photos";
import { BASE_URL } from "../../services/makeRequest";
import CustomModal from "../CustomModal/CustomModal";
const formatDate = (dateString) => new Date(dateString).toLocaleString();

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const user = useParams();
  const [userPhotos, setUserPhotos] = useState([])
  const [userModel, setUserModel] = useState()

  useEffect(() => {
    getUser(user.userId).then(resp => setUserModel(resp.data))
    getPhotosOfUser(user.userId).then(resp => setUserPhotos(resp.data))
  }, [])


  console.log("photos: ", userPhotos)

  useEffect(() => {
    if (userModel) {
      props.fn("Photos of " + userModel?.first_name + " " + userModel?.last_name)
    }
  }, [user.userId])

  const [comment, setComment] = useState("")
  const handleSendComment = (photoId) => {
    createComment(photoId, comment).then(resp => {
      // userPhotos.filter(photo => photo.id == photoId).at(0).comments.push(resp.data)
      getPhotosOfUser(user.userId).then(resp => setUserPhotos(resp.data))
      setComment("")
    }).catch(err => {
      console.log("create comment error: ", err)
    })
  }

  
  return (
    <>
      {userPhotos.map((photo) => (
        <Card key={photo?._id} sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${BASE_URL}/photo/file/${photo?.file_name}`} // adjust path as needed
            alt="User photo"
          />
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary">
              Posted at: {formatDate(photo?.date_time)}
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Comments:</Typography>
            <div className="d-flex">
              <input value={comment} onChange={(e) => setComment(e.target.value)} className="form-control rounded-0" placeholder="Enter your comment" />
              <button onClick={() => {
                handleSendComment(photo?._id)
              }} className="btn btn-primary rounded-0">Send</button>
            </div>
            {photo?.comments && photo?.comments.length > 0 ? (
              <List>
                {photo?.comments.map((comment) => (
                  <ListItem key={comment?._id} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Link
                            to={`/users/${comment?.user?._id}`}
                          >
                            {comment?.user?.first_name} {comment?.user?.last_name}
                          </Link>{' '}
                          - {formatDate(comment?.date_time)}
                          

                        </React.Fragment>
                      }
                      secondary={comment?.comment}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No comments yet.</Typography>
            )}
          </CardContent>
        </Card>
      ))
      }
    </>
  );
}

export default UserPhotos;
