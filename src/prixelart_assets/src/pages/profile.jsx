import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Principal } from "@dfinity/principal";

import MobileView from "../views/profile/mobile.jsx";
import DesktopView from "../views/profile/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

const Profile = ({ isMobile }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { state, handleSidebar, setPostsDetails, setUser, setGalleries } =
    useContext(PrixerContext);
  const [isUpdateProfile, setIsUpdateprofile] = useState(false);
  const [banner, setBanner] = useState(
    params.username === state.user.username ? state?.user?.banner : ""
  );
  const [screen, setScreen] = useState(consts.PROFILE_SCREEN_ART);
  const [userGuest, setUserGuest] = useState([]);
  const [postsDetailsGuest, setPostsDetailsGuest] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState();
  const [isPayment, setIsPayment] = useState(false);
  const [token, setToken] = useState();
  const [tokens, setTokens] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const init = async () => {
    setIsLoading(true);
    try {
      if (!localStorage.getItem("wallet")) onLogout();
      if (params.username === state.user.username) {
        const result = await Promise.all([
          service.getArtistDetailsByUsername(state.user.username),
          service.getGalleriesByArtist(state.user.username),
          service.getArtistByPrincipal(),
        ]);
        setPostsDetails(result[0].ok);
        setGalleries(result[1].ok);
        const parseArtist = service.parseArtist(result[2]);
        const collections = await service._getNFTCan(parseArtist.canisterId);
        if (collections.length > 0) {
          const filterCollections = collections?.filter(
            (el) =>
              el.name.split("-")[0] !== "WH" && el.name.split("-")[0] !== "SE"
          );
          filterCollections?.forEach((el) => {
            el.supply = Number(el.supply[0]);
            el.principal = el.principal.toText();
          });
          parseArtist.collections = filterCollections;
          parseArtist.WHCanister = collections
            ?.find((collection) => collection.name.split("-")[0] === "WH")
            .principal.toText();
          parseArtist.servicesCanister = collections
            ?.map(
              (collection) =>
                collection.name.split("-")[0] === "SE" && {
                  ...collection,
                  supply: Number(collection.supply[0]),
                  principal: collection.principal.toText(),
                }
            )
            .filter((i) => i);
        }

        setUser(parseArtist);
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
    setIsLoading(false);
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
      setGalleries(state.galleries.filter((gallery) => gallery.id !== id));
      const newData = { ...state.postsDetails };
      newData.galleriesQty = parseInt(newData.galleriesQty) - 1;
      setPostsDetails(newData);
      const result = await service.removeGallery(id);
    } catch (err) {
      console.log(err);
      console.log("[Error in delete gallery profile.jsx]");
    }
  };

  const showPostDetails = (id) => {
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

    const currentPost = posts.postsRead[0].findIndex(
      (post) => post.postId === postId
    );

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
    try {
      const result = await Promise.all([
        service.updateArtist(artist),
        service.relPrincipalWithUsername(state.user.username),
      ]);
      const artistDB = await service.getArtistByPrincipal();
      const parseArtist = service.parseArtist(artistDB);
      setUser(parseArtist);
      window.location.reload();
    } catch (err) {
      console.log(err);
      console.log("[Err in updateProfile profile.jsx]");
    }
  };

  const createInvoice = async (amount, tokenId) => {
    setIsLoading(true);
    setIsPayment(true);

    try {
      setToken(tokenId);
      // setIsLoading(true);
      const result = await service._createInvoice(
        "ICP",
        amount,
        1,
        state.user.canisterId
      );
      setInvoice(result.ok);
      setIsOpen(true);
    } catch (err) {
      // setIsLoading(false);
      console.log(err);
      console.log("[Error in create invoice settings.jsx");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const transfer = async (account, amount) => {
    return await service.transfer(account, amount);
  };

  const isConfirmPayment = async () => {
    setIsLoading(true);
    setIsPayment(true);
    const transferResponse = await transfer(
      invoice.subAccount,
      parseInt(invoice.invoice.amount)
    );
    if (transferResponse) {
      await verifyPayment(invoice.invoice.id, token);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const verifyPayment = async (invoiceId, tokenId) => {
    setIsLoading(true);
    setIsPayment(true);

    try {
      const result = await service._verifyPayment(
        invoiceId,
        state.user.WHCanister,
        tokenId,
        JSON.parse(localStorage.getItem("_scApp")).principal,
        state.user.canisterId
      );
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment collectionDeetails.jsx]");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const listNFT = async (id) => {
    setIsLoading(true);
    try {
      const result = await service._listNFT(id);
      setTokens(result);

      return result;
    } catch (err) {
      console.log("[ERR IN LIST NFT]");
    }
    setIsLoading(false);
  };

  const _verifyPayment = async (id) => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      // const result = await service.burm(state.user.WHCanister, id);
      // if (result.ok) {
      await service.isVerifyTransferWH(
        state.user.canisterId,
        state.user.WHCanister,
        id
      );
      // }
      console.log(result);
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment collectionDeetails.jsx]");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const _createInvoice = async () => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      const result = await service._createInvoice(
        "ICP",
        1,
        1,
        state.user.canisterId
      );
      setInvoice(result.ok);
    } catch (err) {
      console.log(err);
      console.log("[Error in create invoice settings.jsx");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const mintNFT = async (serviceId, payload) => {
    setIsLoading(true);
    try {
      const result = await service._mintNFT(serviceId, payload);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN MINT NFT]");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
    if (state.user.WHCanister) listNFT(state.user.WHCanister);
  }, [params]);

  useEffect(async () => {
    await service.balanceOf(state.user.WHCanister);
  }, []);
  return state.user ? (
    isMobile ? (
      <>
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
          setBanner={setBanner}
          isLoading={isLoading}
          createInvoice={createInvoice}
          tokens={tokens}
          services={state.user.servicesCanister}
          _createInvoice={_createInvoice}
          setIsOpen={setIsOpen}
        />
      </>
    ) : (
      <>
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
          setBanner={setBanner}
          isLoading={isLoading}
          createInvoice={createInvoice}
          tokens={tokens}
          services={state.user.servicesCanister}
          _createInvoice={_createInvoice}
          setIsOpen={setIsOpen}
        />
        {invoice && (
          <Dialog
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
              setToken(undefined);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Payment confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box>{`
        You must transfer the necessary amount of working hours to acquire this service`}</Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => _verifyPayment(["0"])}
                // onClick={() => isConfirmPayment()}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    )
  ) : (
    <></>
  );
};

export default Profile;
