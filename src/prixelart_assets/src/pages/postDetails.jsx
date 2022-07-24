import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileView from "../views/postDetails/mobile.jsx";
import DesktopView from "../views/postDetails/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const PostsDetails = ({ isMobile }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { state, handleSidebar } = useContext(PrixerContext);
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const [post, setPost] = useState();
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  console.log(post);
  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const handleIsUpdatePost = (isUpdate) => {
    setIsUpdatePost(isUpdate);
  };

  const init = async () => {
    try {
      const result = await service.getPostByID(params.postId);
      setPost(result.ok);
      setCamera(
        result.ok.post?.postBasics?.details.find(
          (item) => item[0] === "camera"
        )[1].Vec[0].Text
      );
      setLens(
        result.ok.post?.postBasics?.details.find(
          (item) => item[0] === "lens"
        )[1].Vec[0].Text
      );
    } catch (err) {
      console.log(err);
      console.log("[Error  init postDetails.jsx]");
    }
  };

  const updatePost = async (post, postId) => {
    const result = await service.updatePost(post, postId);
    handleIsUpdatePost(false);
    try {
    } catch (err) {
      console.log(err);
      console.log("[Err in update post in postDetails.jsx]");
    }
  };

  const deletePost = async (postId) => {
    try {
      const result = await service.removePost(postId);
      navigate(-1);
    } catch (err) {
      console.log(err);
      console.log("[Err in delete post in postDetails.jsx]");
    }
  };

  const onAddComment = (comment) => {
    const formatComment = [
      JSON.parse(localStorage.getItem("_scApp")).principal,
      state.user.username,
      `ID${state.username}-${
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
  };

  const createComment = async (comment) => {
    try {
      const result = await service.createComment(post.postId, {
        commentBasics: {
          category: [],
          content: comment,
          details: [],
        },
      });
    } catch (err) {
      console.log(err);
      console.log("[Err in create comment in postDetails.jsx]");
    }
  };

  const addLike = async (id) => {
    try {
      const result = await service.addLike(id);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in add like postDetails.jsx");
    }
  };

  const removeLike = async (id) => {
    try {
      const result = await service.removeLike(id);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in add like postDetails.jsx");
    }
  };

  const handleLikePost = () => {
    const currentPost = { ...post };
    if (currentPost.likedByCaller) {
      currentPost.likesQty = parseInt(currentPost.likesQty) - 1;
    } else {
      currentPost.likesQty = parseInt(currentPost.likesQty) + 1;
    }
    currentPost.likedByCaller = !currentPost.likedByCaller;

    setPost(currentPost);
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
    if (isUpdatePost === false) init();
  }, [isUpdatePost]);

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      username={state.user.username}
      handleIsUpdatePost={handleIsUpdatePost}
      isUpdatePost={isUpdatePost}
      post={post}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      camera={camera}
      lens={lens}
      onAddComment={onAddComment}
      createComment={createComment}
      artist={state.user}
      updatePost={updatePost}
      deletePost={deletePost}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      username={state.user.username}
      handleIsUpdatePost={handleIsUpdatePost}
      isUpdatePost={isUpdatePost}
      post={post}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      camera={camera}
      lens={lens}
      onAddComment={onAddComment}
      createComment={createComment}
      artist={state.user}
      updatePost={updatePost}
      deletePost={deletePost}
    />
  );
};

export default PostsDetails;
