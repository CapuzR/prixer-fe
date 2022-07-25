import React, { useState } from "react";
import * as React from "react";
import DateObject from "react-date-object";

import {
  Box,
  IconButton,
  Typography,
  Chip,
  FormControl,
  OutlinedInput,
  Button,
  Avatar,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import consts from "../consts";
import { service } from "../service";

const InfoPost = ({
  isMobile,
  post,
  username,
  handleIsUpdatePost,
  addLike,
  handleLikePost,
  removeLike,
  camera,
  lens,
  onAddComment,
  createComment,
  deletePost,
}) => {
  const [isShowInputComment, setIsShowInputComment] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <Paper style={{ padding: !isMobile && 24 }} elevation={!isMobile && 2}>
      <Box>
        <Box>
          <img
            src={service.getUrl(
              consts.ASSET_CANISTER_ID_SOCIALS,
              `${post?.postId}`
            )}
            alt={"image"}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: "block",
              width: "100%",
              maxHeight: 700,
            }}
          />
        </Box>
        <Box style={{ padding: 8 }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">
              {post?.post?.postBasics?.title}
            </Typography>
            <IconButton
              color="primary"
              onClick={() => {
                if (post?.likedByCaller) {
                  removeLike(post?.postId);
                } else {
                  addLike(post?.postId);
                }
                handleLikePost();
              }}
            >
              {post?.likedByCaller ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Box>{parseInt(post?.likesQty)}</Box>
            {post?.artistUsername === username && (
              <Box style={{ marginLeft: "auto" }}>
                <IconButton
                  color="primary"
                  onClick={() => deletePost(post.postId)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleIsUpdatePost(true)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box>
            <Typography variant="body1">
              {post?.post?.postBasics?.description}
            </Typography>
          </Box>
          <Box style={{ marginTop: 24 }}>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: 8 }}>
                <CameraAltIcon color="primary" />
              </Box>
              <Box>
                <Typography variant="p">{camera}</Typography>
              </Box>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Box style={{ marginRight: 8 }}>
                <CameraOutlinedIcon color="primary" />
              </Box>
              <Box>
                <Typography variant="p">{lens}</Typography>
              </Box>
            </Box>
          </Box>
          <Box style={{ marginTop: 16 }}>
            <Typography variant="h6">Categories</Typography>
            {post?.post?.postBasics?.tags.map((tag, index) => (
              <Chip
                label={tag}
                variant="outlined"
                style={{ marginBottom: "6px", marginRight: "2px" }}
                key={index}
              />
            ))}
          </Box>
          {isShowInputComment ? (
            <Box
              style={{
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              <FormControl fullWidth>
                <OutlinedInput
                  multiline
                  size="small"
                  rows={3}
                  maxRows={3}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "#FFFFFF",
                  }}
                  // onKeyUp={(e) => {
                  //   if (e.code === consts.ENTER_KEY_CODE) {
                  //     if (isLoading) return false;
                  //     else if (comment.trim().length === 0) return false;
                  //     else {
                  //       alert("SOY UN COMENTARIO");
                  //     }
                  //   }
                  // }}
                  placeholder="Enter your comment"
                />
              </FormControl>
              <Button
                variant="outlined"
                style={{
                  textTransform: "capitalize",
                  marginLeft: "auto",
                  display: "flex",
                  marginTop: 8,
                  borderRadius: 30,
                }}
                id={"scroll-btn"}
                disabled={comment === ""}
                onClick={async () => {
                  onAddComment(comment);
                  setComment("");
                  createComment(post.postId, {
                    commentBasics: {
                      category: [],
                      content: comment,
                      details: [],
                    },
                  });
                }}
              >
                Send
              </Button>
            </Box>
          ) : (
            <Box
              style={{
                fontSize: 14,
                marginTop: 12,
                textDecoration: "underline",
                marginBottom: 8,
              }}
              onClick={async () => {
                setIsShowInputComment(true);
                service.scrollToBottom();
              }}
            >
              Add a new comment
            </Box>
          )}
        </Box>
        {post?.comments[0]?.map((comment, index) => (
          <Box key={index} style={{ padding: 8 }}>
            <Box style={{ marginBottom: 8, display: "flex" }}>
              <Box onClick={() => navigate(`/u/${comment[1]}`)}>
                <Avatar
                  size="small"
                  src={service.getUrl(
                    consts.ASSET_CANISTER_ID_ARTIST,
                    `A${
                      typeof comment[0] === "string"
                        ? comment[0]
                        : comment[0].toText()
                    }`
                  )}
                />
              </Box>
              <Box
                onClick={async () => {
                  // setSelectedForReply(index + 1);
                  // setIsLoadingForComments(true);
                  // const result = await service.readComments(comment[2]);
                  // setIsLoadingForComments(false);
                  // setComments(result.ok);
                }}
                style={{ marginLeft: 8, width: "100%" }}
              >
                <Box style={{ fontSize: 14, fontWeight: "bold" }}>
                  {comment[1]}
                </Box>
                <Box style={{ fontSize: 14, wordBreak: "breakWord" }}>
                  {comment[3].commentBasics.content}
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  width: isMobile ? "60%" : "20%",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: " end",
                }}
              >
                <Box style={{ fontSize: 12 }}>
                  {new DateObject(
                    new Date(Math.floor(parseInt(comment[3].createdAt) / 1000))
                  ).format("hh:mm a")}
                </Box>
                <Box style={{ display: "flex", alignItems: "end" }}>
                  <Box
                    style={{
                      fontSize: 14,
                      textDecoration: "underline",
                      // paddingBottom: 8,
                      paddingRight: 12,
                    }}
                    onClick={() => {
                      setIsShowInputComment(true);
                      service.scrollToBottom();
                    }}
                  >
                    Show replys
                  </Box>
                  <Box
                    style={{
                      fontSize: 14,
                      textDecoration: "underline",
                      // paddingBottom: 8,
                    }}
                    onClick={() => {
                      setIsShowInputComment(true);
                      service.scrollToBottom();
                    }}
                  >
                    Like
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default InfoPost;
