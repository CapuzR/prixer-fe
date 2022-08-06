import React, { useReducer } from "react";
import * as React from "react";
import { PrixerContext } from "./index";
import { PrixerReducer } from "./reducer";
import { types } from "../types";

const init = () => {
  const user = JSON.parse(localStorage.getItem("account"));
  const isOpenSidebar = Boolean(localStorage.getItem("isOpenSidebar"));
  const postsDetails = JSON.parse(localStorage.getItem("postsDetails"));
  const feed = JSON.parse(localStorage.getItem("feed"));
  const explore = JSON.parse(localStorage.getItem("explore"));
  const galleries = JSON.parse(localStorage.getItem("galleries"));
  const currentPost = JSON.parse(localStorage.getItem("currentPost"));

  return {
    user: user ? user : undefined,
    isOpenSidebar,
    postsDetails: postsDetails ? postsDetails : undefined,
    feed: feed ? feed : undefined,
    explore: explore ? explore : undefined,
    galleries: galleries ? galleries : undefined,
  };
};

export const PrixerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PrixerReducer, {}, init);

  const setUser = (user) => {
    dispatch({
      type: types.create_account,
      payload: user,
    });
    console.log(user, "USEr");
    localStorage.setItem("account", JSON.stringify(user));
  };

  const handleSidebar = (event) => {
    dispatch({
      type: types.handle_sidebar,
      payload: event,
    });
    localStorage.setItem("isSidebarOpen", event);
  };

  const setPostsDetails = (details) => {
    details.followersQty = parseInt(details.followersQty);
    details.followsQty = parseInt(details.followsQty);
    details.postsQty = parseInt(details.postsQty);
    details.galleriesQty = parseInt(details.galleriesQty);
    details.postsRead[0]?.forEach((item) =>
      item.comments[0]?.forEach(
        (comment) => delete comment[3] && delete comment[4]
      )
    );
    console.log(details);
    if (details.postsRead.length === 0) {
      details.postsRead = [[]];
    } else {
      details.postsRead[0].forEach((el) => {
        el.likesQty = parseInt(el.likesQty);
        el.post.createdAt = new Date(
          Math.floor(parseInt(el.post.createdAt) / 1000)
        );
      });
    }

    dispatch({
      type: types.get_posts_details,
      payload: details,
    });
    localStorage.setItem("postsDetails", JSON.stringify(details));
  };

  const setFeed = (feed) => {
    feed.forEach((el) => {
      el.artistPrincipal =
        typeof el.artistPrincipal !== "string"
          ? el.artistPrincipal.toText()
          : el.artistPrincipal;
      el.likesQty = parseInt(el.likesQty);
      el.post.createdAt = new Date(
        Math.floor(parseInt(el.post.createdAt) / 1000)
      );
    });
    dispatch({
      type: types.get_feed,
      payload: feed,
    });
    localStorage.setItem("feed", JSON.stringify(feed));
  };

  const setExplore = (explore) => {
    explore.forEach((el) => {
      el.artistPrincipal =
        typeof el.artistPrincipal !== "string"
          ? el.artistPrincipal.toText()
          : el.artistPrincipal;
      el.likesQty = parseInt(el.likesQty);
      el.post.createdAt = new Date(
        Math.floor(parseInt(el.post.createdAt) / 1000)
      );
    });
    dispatch({
      type: types.get_explore,
      payload: explore,
    });
    localStorage.setItem("explore", JSON.stringify(explore));
  };

  const setGalleries = (galleries) => {
    galleries.forEach((el) => {
      el.createdAt = new Date(Math.floor(parseInt(el.createdAt) / 1000));
    });
    dispatch({
      type: types.get_galleries,
      payload: galleries,
    });
    localStorage.setItem("galleries", JSON.stringify(galleries));
  };

  const setCurrentPost = (post) => {
    dispatch({
      type: types.get_current_post,
      payload: post,
    });
    localStorage.setItem("currentPost", JSON.stringify(post));
  };

  return (
    <PrixerContext.Provider
      value={{
        state: state,
        setUser: setUser,
        handleSidebar: handleSidebar,
        setPostsDetails: setPostsDetails,
        setFeed: setFeed,
        setExplore: setExplore,
        setGalleries: setGalleries,
        setCurrentPost: setCurrentPost,
      }}
    >
      {children}
    </PrixerContext.Provider>
  );
};
