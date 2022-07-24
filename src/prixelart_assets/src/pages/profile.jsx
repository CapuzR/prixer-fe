import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileView from "../views/profile/mobile.jsx";
import DesktopView from "../views/profile/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const Profile = ({ isMobile }) => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    state,
    handleSidebar,
    setPostsDetails,
    setUser,
    setGalleries,
    setCurrentPost,
  } = useContext(PrixerContext);
  const [isUpdateProfile, setIsUpdateprofile] = useState(false);
  const [banner, setBanner] = useState(
    params.username === state.user.username ? state?.user?.banner : ""
  );
  const [screen, setScreen] = useState(consts.PROFILE_SCREEN_ART);
  const [userGuest, setUserGuest] = useState([]);
  const [postsDetailsGuest, setPostsDetailsGuest] = useState([]);
  // const [galleries, setGalleries] = useState([]);
  const [search, setSearch] = useState("");

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const init = async () => {
    try {
      if (!localStorage.getItem("wallet")) onLogout();
      if (params.username === state.user.username) {
        const result = await Promise.all([
          service.getArtistDetailsByUsername(state.user.username),
          service.getGalleriesByArtist(state.user.username),
        ]);
        setPostsDetails(result[0].ok);
        setGalleries(result[1].ok);
      } else {
        const result = await Promise.all([
          service.getArtistByUsername(params.username),
          service.getArtistDetailsByUsername(params.username),
          service.getGalleriesByArtist(params.username),
        ]);
        const parsetArtist = service.parseArtist(result[0]);

        setUserGuest(parsetArtist);
        setBanner(parsetArtist.banner);
        setPostsDetailsGuest(result[1].ok);
        setGalleries(result[2].ok);
      }
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in init profile.jsx");
    }
  };
  const handleScreen = (view) => {
    setScreen(view);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  const getGalleryImage = (id) => {
    const posts = state.postsDetails?.postsRead[0];
    let postBD;
    posts?.map((post) =>
      post?.post?.postBasics?.details?.map((detail) => {
        if (detail[1]?.Text === id) {
          postBD = post;
        }
      })
    );
    return postBD
      ? service.getUrl(consts.ASSET_CANISTER_ID_SOCIALS, `${postBD?.postId}`)
      : "https://images.unsplash.com/photo-1650797392850-8f787504247f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1MzI4Mjk4Nw&ixlib=rb-1.2.1&q=80&w=1080";
  };

  const handleFollowers = async (details) => {
    try {
      const newData = { ...details };
      newData.followedByCaller = !newData.followedByCaller;
      setPostsDetailsGuest(newData);
      if (details.followedByCaller) {
        newData.followersQty = parseInt(newData.followersQty) - 1;
        setPostsDetailsGuest(newData);
        await service.removeFollow(userGuest.username);
      } else {
        newData.followersQty = parseInt(newData.followersQty) + 1;
        setPostsDetailsGuest(newData);
        await service.addFollow(userGuest.username);
      }
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in handle followers profile.jsx");
    }
  };

  const deleteGallery = async (id) => {
    try {
      setGalleries(galleries.filter((gallery) => gallery.id !== id));
      const newData = { ...state.postsDetails };
      newData.galleriesQty = parseInt(newData.galleriesQty) - 1;
      setPostsDetails(newData);
      const result = await service.removeGallery(id);
    } catch (err) {
      console.log(err);
      console.log("[Error in delete gallery profile.jsx]");
    }
  };

  const showPostDetails = (id, post) => {
    navigate(`/post/${id}/details`);
  };
  const showGalleryDetails = (id) => {
    navigate(`/gallery/${id}/details`);
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

  const handleLikePost = (postId) => {
    const posts =
      params.username === state.user.username
        ? state.postsDetails
        : postsDetailsGuest;
    console.log(posts);
    const currentPost = posts.postsRead[0].findIndex(
      (post) => post.postId === postId
    );
    console.log(posts.postsRead[0][currentPost]);
    if (posts.postsRead[0][currentPost].likedByCaller) {
      posts.postsRead[0][currentPost].likesQty =
        parseInt(posts.postsRead[0][currentPost].likesQty) - 1;
    } else {
      posts.postsRead[0][currentPost].likesQty =
        parseInt(posts.postsRead[0][currentPost].likesQty) + 1;
    }

    posts.postsRead[0][currentPost].likedByCaller =
      !posts.postsRead[0][currentPost].likedByCaller;
    if (params.username === state.user.username) {
      setPostsDetails(posts);
    } else {
      setPostsDetailsGuest(posts);
    }
  };

  const handleUpdateProfile = (event) => {
    setIsUpdateprofile(event);
  };

  const updateArtist = async (artist) => {
    console.log(artist);
    try {
      const result = await Promise.all([
        service.updateArtist(artist),
        service.relPrincipalWithUsername(state.user.username),
      ]);
      const artistDB = await service.getArtistByPrincipal();
      const parseArtist = service.parseArtist(artistDB);
      setUser(parseArtist);
      navigate("/explore");
    } catch (err) {
      console.log(err);
      console.log("[Err in updateProfile profile.jsx]");
    }
  };

  useEffect(() => {
    init();
  }, [params]);

  return state.user ? (
    isMobile ? (
      <MobileView
        isMobile={isMobile}
        onLogout={onLogout}
        artist={
          params.username === state.user.username ? state?.user : userGuest
        }
        banner={banner}
        handleScreen={handleScreen}
        screen={screen}
        username={state?.user?.username}
        postsDetails={
          params.username === state.user.username
            ? state.postsDetails
            : postsDetailsGuest
        }
        handleSearch={handleSearch}
        search={search}
        getGalleryImage={getGalleryImage}
        galleries={state.galleries ? state.galleries : []}
        params={params.username}
        handleFollowers={handleFollowers}
        deleteGallery={deleteGallery}
        showPostDetails={showPostDetails}
        addLike={addLike}
        removeLike={removeLike}
        handleLikePost={handleLikePost}
        handleUpdateProfile={handleUpdateProfile}
        isUpdateProfile={isUpdateProfile}
        updateArtist={updateArtist}
        showGalleryDetails={showGalleryDetails}
      />
    ) : (
      <DesktopView
        isMobile={isMobile}
        onLogout={onLogout}
        artist={
          params.username === state.user.username ? state?.user : userGuest
        }
        handleSidebar={handleSidebar}
        isOpenSidebar={state?.isOpenSidebar}
        banner={banner}
        handleScreen={handleScreen}
        screen={screen}
        username={state?.user?.username}
        postsDetails={
          params.username === state.user.username
            ? state.postsDetails
            : postsDetailsGuest
        }
        handleSearch={handleSearch}
        search={search}
        getGalleryImage={getGalleryImage}
        galleries={state.galleries ? state.galleries : []}
        fullName={state?.user?.fullName}
        params={params.username}
        handleFollowers={handleFollowers}
        deleteGallery={deleteGallery}
        showPostDetails={showPostDetails}
        addLike={addLike}
        removeLike={removeLike}
        handleLikePost={handleLikePost}
        handleUpdateProfile={handleUpdateProfile}
        isUpdateProfile={isUpdateProfile}
        updateArtist={updateArtist}
        showGalleryDetails={showGalleryDetails}
      />
    )
  ) : (
    <></>
  );
};

export default Profile;
