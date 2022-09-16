import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  TextField,
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
  const [WHMint, setWHMint] = useState(0);
  const [isOpenWH, setIsOpenWH] = useState(false);
  const [serviceId, setServiceId] = useState(undefined);
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
        const collections = parseArtist.canisterId
          ? await service._getNFTCan(parseArtist.canisterId)
          : [];
        console.log(collections);
        if (collections.length > 0) {
          const filterCollections = collections?.filter(
            (el) =>
              el.name.split("-")[0] !== "WH" && el.name.split("-")[0] !== "SE"
          );
          filterCollections?.forEach((el) => {
            el.supply = Number(el.supply[0]);
            el.principal = el.principal.toText();
            el.value = Number(el.value[0]);
          });
          parseArtist.collections = filterCollections;
          parseArtist.WHCanister = {
            id: collections
              ?.find((collection) => collection.name.split("-")[0] === "WH")
              .principal.toText(),
            value: parseInt(
              collections?.find(
                (collection) => collection.name.split("-")[0] === "WH"
              ).value[0]
            ),
          };
          parseArtist.servicesCanister = collections
            ?.map(
              (collection) =>
                collection.name.split("-")[0] === "SE" && {
                  ...collection,
                  supply: Number(collection.supply[0]),
                  principal: collection.principal.toText(),
                  value: Number(collection.value[0]),
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
        const collections = parseArtist.canisterId
          ? await service._getNFTCan(parseArtist.canisterId)
          : [];
       
        if (collections.length > 0) {
          const filterCollections = collections?.filter(
            (el) =>
              el.name.split("-")[0] !== "WH" && el.name.split("-")[0] !== "SE"
          );
          filterCollections?.forEach((el) => {
            el.supply = Number(el.supply[0]);
            el.principal = el.principal.toText();
            el.value = Number(el.value[0]);
          });
          parsetArtist.collections = filterCollections;
          parsetArtist.WHCanister = {
            id: collections
              ?.find((collection) => collection.name.split("-")[0] === "WH")
              .principal.toText(),
            value: parseInt(
              collections?.find(
                (collection) => collection.name.split("-")[0] === "WH"
              ).value[0]
            ),
          };
          parsetArtist.servicesCanister = collections
            ?.map(
              (collection) =>
                collection.name.split("-")[0] === "SE" && {
                  ...collection,
                  supply: Number(collection.supply[0]),
                  principal: collection.principal.toText(),
                  value: Number(collection.value[0]),
                }
            )
            .filter((i) => i);
        }
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const createInvoice = async (amount) => {
    setIsLoading(true);
    setIsPayment(true);

    try {
      // setIsLoading(true);
      const result = await service._createInvoice(
        "ICP",
        amount,
        parseInt(WHMint),
        state.user.canisterId
      );
      setInvoice(result.ok);
      setIsOpen(true);
      setIsOpenWH(false);
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
        state.user.WHCanister.id,
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
      const result = await service.balanceOf(
        id,
        JSON.parse(localStorage.getItem("_scApp")).principal
      );
      setTokens(result);
      console.log(result, "RESULT");
      return result;
    } catch (err) {
      console.log(err);
      console.log("[ERR IN LIST NFT]");
    }
    setIsLoading(false);
  };

  const _verifyPayment = async (ids) => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      const result = await service.burn(
        state.user.WHCanister.id,
        ids,
        invoice.invoice.id
      );
      if (result.ok === null) {
        await service.isVerifyTransferWH(
          state.user.canisterId,
          state.user.WHCanister.id,
          ids,
          invoice.invoice.id,
          serviceId
        );
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment collectionDeetails.jsx]");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const _createInvoice = async (value) => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      const result = await service._createInvoice(
        "ICP",
        value,
        value,
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
    if (state.user.WHCanister)
      listNFT(state.user.WHCanister.id, state.user.canisterId);
  }, [params]);

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
          WHMint={WHMint}
          setIsOpenWH={setIsOpenWH}
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
          WHMint={WHMint}
          setIsOpenWH={setIsOpenWH}
          setServiceId={setServiceId}
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
                <Box>
                  {invoice.invoice.tokenIndexes.length === 0
                    ? `You must transfer the necessary amount of ${
                        parseInt(invoice.invoice.amount) / 100000000
                      } ICP`
                    : `You must transfer the necessary WH`}
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  invoice.invoice.tokenIndexes.length === 0
                    ? isConfirmPayment()
                    : _verifyPayment(invoice.invoice.tokenIndexes)
                }
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {isOpenWH && (
          <Dialog
            open={isOpenWH}
            onClose={() => {
              setIsOpenWH(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Payment confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box>
                  {`Define how many Working Hours do you want to buy and confirm
                  that you will pay ${state.user.WHCanister.value} ICP for
                  each.`}
                </Box>
              </DialogContentText>

              <TextField
                type="number"
                value={WHMint}
                onChange={(e) => setWHMint(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button disabled={isLoading} onClick={() => setIsOpenWH(false)}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                // onClick={() => _verifyPayment(["0"])}
                onClick={() =>
                  createInvoice(
                    parseInt(WHMint) * 100000000 * state.user.WHCanister.value
                  )
                }
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
