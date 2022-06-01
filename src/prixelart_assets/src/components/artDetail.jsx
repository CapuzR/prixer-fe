import React, { useState, forwardRef } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CircularProgress from "@mui/material/CircularProgress";
import DateObject from "react-date-object";

import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import consts from "../consts/index";
import service from "../pages/service";
import DialogConfirmDelete from "./dialogConfirmDelete";

function ArtDetail({
  post,
  navigate,
  mobileBreakpoint,
  setPost,
  setIsEditPost,
}) {
  const camera = post?.post?.postBasics?.details.find(
    (item) => item[0] === "camera"
  )[1].Vec[0].Text;
  const lens = post?.post?.postBasics?.details.find(
    (item) => item[0] === "lens"
  )[1].Vec[0].Text;
  const [isLoading, setIsLoading] = useState(false);
  const [isShowInputComment, setIsShowInputComment] = useState(false);
  const [comment, setComment] = useState("");

  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);
  const [commentSelected, setCommentSelected] = useState();
  const [commentId, setCommentId] = useState();
  const [commentUsername, setCommentUsername] = useState();
  const [isReply, setIsReply] = useState();
  const [commentToReply, setCommentToReply] = useState("");
  const [selectedForReply, setSelectedForReply] = useState();
  const [comments, setComments] = useState([]);
  const [isLoadingForComments, setIsLoadingForComments] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box>
      <Box style={{ padding: 16, maxWidth: 1000, margin: "auto" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            style={{ position: "absolute" }}
            color="primary"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Typography
            variant="h6"
            style={{ width: "100%", textAlign: "center" }}
          >
            Post Detail
          </Typography>
        </Box>
      </Box>
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
          width: !mobileBreakpoint && "100%",
          margin: mobileBreakpoint && "auto",
          maxHeight: mobileBreakpoint && 650,
        }}
      />
      <Box style={{ padding: 16, maxWidth: 1000, margin: "auto" }}>
        <Box style={{ display: "flex" }}>
          <Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">
                {post?.post?.postBasics?.title}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => {
                  if (post?.likedByCaller) {
                    service.removeLike(post?.postId);
                  } else {
                    service.addLike(post?.postId);
                  }
                  handleLikePost();
                }}
              >
                {post?.likedByCaller ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Box>{parseInt(post?.likesQty)}</Box>
            </Box>
            <Box>
              <Typography variant="body1">
                {post?.post?.postBasics?.description}
              </Typography>
            </Box>
          </Box>
          {post?.artistUsername === localStorage.getItem("username") && (
            <Box style={{ marginLeft: "auto" }}>
              <IconButton
                color="primary"
                onClick={async () => {
                  setOpenDelete(true);
                  setTypeDelete("post");
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={32} /> : <DeleteIcon />}
              </IconButton>
              <IconButton
                color="primary"
                disabled={isLoading}
                onClick={() => setIsEditPost(true)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
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
          <Box style={{ display: "flex" }}>
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
        <Box style={{ marginTop: 16, marginBottom: 12 }}>
          <Typography variant="h6">Comments</Typography>
        </Box>

        {/* DD/MM/YYYY -  */}
        {isShowInputComment ? (
          <Box
            style={{
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            <FormControl fullWidth disabled={isLoading}>
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
                setIsSnackbarOpen(true);
                setSeverity("info");
                setMessage("Comment sent");

                onAddComment(comment);

                await service.createComment(post.postId, {
                  commentBasics: {
                    category: [],
                    content: comment,
                    details: [],
                  },
                });
                setIsSnackbarOpen(true);
                setSeverity("success");
                setMessage("comment posted successfully");
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
              // service.scrollToBottom();
            }}
          >
            Add a new comment
          </Box>
        )}
        {post?.comments[0]?.map((comment, index) => (
          <Box>
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
                  setSelectedForReply(index + 1);
                  setIsLoadingForComments(true);
                  const result = await service.readComments(comment[2]);
                  setIsLoadingForComments(false);
                  setComments(result.ok);
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
              <Box style={{ marginLeft: "auto", fontSize: 10, width: 60 }}>
                <IconButton
                  disabled={comment[4]}
                  color="primary"
                  onClick={(event) => {
                    setCommentSelected(index + 1);
                    setCommentId(comment[2]);
                    setCommentUsername(comment[1]);
                    hanleOpenActionMenu(event);
                  }}
                  id={`basic-button-post-${index + 1}`}
                  aria-controls={
                    openActionMenu ? `basic-menu-post${index + 1}` : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openActionMenu ? "true" : undefined}
                  size="small"
                >
                  <MoreHorizIcon />
                </IconButton>

                {/* {new DateObject(
                new Date(Math.floor(comment[3].createdAt / 1000))
              ).format("hh:mm a")} */}
              </Box>
            </Box>
            {selectedForReply === index + 1 ? (
              isLoadingForComments ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 4,
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              ) : comments.length === 0 ? (
                <>Not reply</>
              ) : (
                comments.map((comment, index) => (
                  <Box
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      paddingLeft: 24,
                    }}
                  >
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
                        setSelectedForReply(index + 1);
                        setIsLoadingForComments(true);
                        const result = await service.readComments(comment[2]);
                        setIsLoadingForComments(false);
                        setComments(result.ok);
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
                  </Box>
                ))
              )
            ) : (
              <></>
            )}
            {isReply === index + 1 && (
              <Box
                style={{
                  marginTop: 12,
                  marginBottom: 8,
                }}
              >
                <FormControl fullWidth disabled={isLoading}>
                  <OutlinedInput
                    multiline
                    size="small"
                    rows={2}
                    maxRows={2}
                    value={commentToReply}
                    onChange={(event) => setCommentToReply(event.target.value)}
                    style={{
                      borderRadius: "30px",
                      backgroundColor: "#FFFFFF",
                    }}
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
                  disabled={commentToReply === ""}
                  onClick={async () => {
                    setIsSnackbarOpen(true);
                    setSeverity("info");
                    setMessage("Reply sent");

                    const formatComment = [
                      JSON.parse(localStorage.getItem("_scApp")).principal,
                      localStorage.getItem("username"),
                      `ID${localStorage.getItem("username")}-${
                        comments.length === 0 ? "0" : comments.length + 1
                      }`,
                      {
                        createdAt: new Date(),
                        commentBasics: {
                          content: commentToReply,
                        },
                      },
                      "optimized",
                    ];
                    setComments([...comments, formatComment]);
                    setCommentToReply("");
                    await service.createComment(comment[2], {
                      commentBasics: {
                        category: [],
                        content: commentToReply,
                        details: [],
                      },
                    });
                    setIsSnackbarOpen(true);
                    setSeverity("success");
                    setMessage("Reply posted successfully");
                  }}
                >
                  Send
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {commentSelected && anchorElActionMenu !== null && (
        <Menu
          id={`basic-button-post-${commentSelected}`}
          anchorEl={anchorElActionMenu}
          open={openActionMenu}
          onClose={() => {
            setAnchorElActionMenu(null);
            setOpenActionMenu(false);
            setCommentSelected(undefined);
          }}
          className="menuHistorial"
          MenuListProps={{
            "aria-labelledby": `basic-button-post-${commentSelected}`,
          }}
        >
          <MenuItem
            onClick={async () => {
              service.addLike(commentId);
              setCommentSelected(undefined);
              setAnchorElActionMenu(null);
              setOpenActionMenu(false);
              setCommentId(undefined);
              // setIsReply(commentSelected);
              // setCommentSelected(undefined);
              // setAnchorElActionMenu(null);
              // setOpenActionMenu(false);
            }}
          >
            Like
          </MenuItem>

          <MenuItem
            onClick={async () => {
              setIsReply(commentSelected);
              setCommentSelected(undefined);
              setAnchorElActionMenu(null);
              setOpenActionMenu(false);
            }}
          >
            Reply
          </MenuItem>
          {localStorage.getItem("username") === commentUsername && (
            <MenuItem
              onClick={async () => {
                setOpenDelete(true);
                setTypeDelete("comment");
              }}
            >
              Delete
            </MenuItem>
          )}
        </Menu>
      )}

      <DialogConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        type={typeDelete}
        onDelete={async () => {
          if (typeDelete === "post") {
            setIsLoading(true);
            setOpenDelete(false);
            await service.removePost(post?.postId);
            setIsLoading(false);
            navigate(-1);
          } else {
            setCommentSelected(undefined);
            setAnchorElActionMenu(null);
            setOpenActionMenu(false);
            onRemoveComment(commentId);
            setOpenDelete(false);
            await service.removeComment(post?.postId, commentId);
          }
        }}
      />
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }

  function handleLikePost() {
    const currentPost = { ...post };
    if (currentPost.likedByCaller) {
      currentPost.likesQty = parseInt(currentPost.likesQty) - 1;
    } else {
      currentPost.likesQty = parseInt(currentPost.likesQty) + 1;
    }
    currentPost.likedByCaller = !currentPost.likedByCaller;

    setPost(currentPost);
  }

  function onAddComment(comment) {
    const formatComment = [
      JSON.parse(localStorage.getItem("_scApp")).principal,
      localStorage.getItem("username"),
      `ID${localStorage.getItem("username")}-${
        post.comments.length === 0 ? "0" : post.comments[0].length + 1
      }`,
      {
        createdAt: new Date(),
        commentBasics: {
          content: comment,
        },
      },
      "optimized",
    ];
    if (post.comments.length === 0) {
      post.comments[0] = [];
    }
    const newComments = post.comments[0];
    newComments.push(formatComment);
    post.comments[0] = newComments;
    setPost({ ...post });
    setComment("");
  }

  function onRemoveComment(currentComment) {
    const newComments = post?.comments[0]?.filter((comment) => {
      return comment[2] !== currentComment;
    });
    post.comments[0] = newComments;
    setPost({ ...post });
  }

  function hanleOpenActionMenu(event) {
    setOpenActionMenu(true);
    setAnchorElActionMenu(event.currentTarget);
  }
}

export default ArtDetail;
