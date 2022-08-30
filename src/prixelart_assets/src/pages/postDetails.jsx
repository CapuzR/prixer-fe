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
  const { state, handleSidebar, setPostsDetails } = useContext(PrixerContext);
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const [post, setPost] = useState();
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const handleIsUpdatePost = (isUpdate) => {
    setIsUpdatePost(isUpdate);
  };

  const init = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const updatePost = async (post, postId) => {
    setIsLoading(true);
    const result = await service.updatePost(post, postId);
    const postResult = await service.getPostByID(params.postId);
    setPost(postResult.ok);
    setCamera(
      postResult.ok.post?.postBasics?.details.find(
        (item) => item[0] === "camera"
      )[1].Vec[0].Text
    );
    setLens(
      postResult.ok.post?.postBasics?.details.find(
        (item) => item[0] === "lens"
      )[1].Vec[0].Text
    );
    handleIsUpdatePost(false);
    try {
    } catch (err) {
      console.log(err);
      console.log("[Err in update post in postDetails.jsx]");
    }
    setIsLoading(false);
  };

  const deletePost = async (postId) => {
    setIsLoading(true);
    setIsDelete(true);
    try {
      const result = await service.removePost(postId);
      const profile = await service.getArtistDetailsByUsername(
        state.user.username
      );
      setPostsDetails(profile.ok);

      navigate(-1);
    } catch (err) {
      console.log(err);
      console.log("[Err in delete post in postDetails.jsx]");
    }
    setIsLoading(false);
    setIsDelete(false);
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

  const deleteComment = async (commentId) => {
    try {
      const result = await service.removeComment(post.postId, commentId);
    } catch (err) {
      console.log(err);
      console.log("[Err in create comment in postDetails.jsx]");
    }
  };

  const onRemoveComment = (currentComment) => {
    const newComments = post?.comments[0]?.filter((comment) => {
      return comment[2] !== currentComment;
    });
    post.comments[0] = newComments;
    setPost({ ...post });
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
    init();
  }, []);

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
      galleries={state.galleries}
      isLoading={isLoading}
      onRemoveComment={onRemoveComment}
      deleteComment={deleteComment}
      isDelete={isDelete}
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
      galleries={state.galleries}
      isLoading={isLoading}
      onRemoveComment={onRemoveComment}
      deleteComment={deleteComment}
      isDelete={isDelete}
    />
  );
};

export default PostsDetails;
