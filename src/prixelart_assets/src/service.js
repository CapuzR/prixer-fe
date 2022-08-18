import { StoicIdentity } from "ic-stoic-identity";
import { createActor as createSocialsActor } from "../../declarations/socials";
import { canisterId as socialsCId } from "../../declarations/socials/index.js";
import { createActor as createActorPrivate } from "../../declarations/privateCanister";
import { createActor as createAssetActorPrivate } from "../../declarations/privateAssetCanister";
import { createActor as createArtistRegistryActor } from "../../declarations/artistRegistry";
import { createActor as createActorNFT } from "../../declarations/nft";

import { canisterId as artistRegistryCId } from "../../declarations/artistRegistry/index.js";
import { createActor as createLedgerActor } from "../../declarations/ledger";
import { canisterId as ledgerCId } from "../../declarations/ledger/index.js";
// import { createActor as _artistCanister } from "../idl/index.js";0
// import { createActor as _storeCanister } from "../idl/indexStore.js";
import { Principal } from "@dfinity/principal";

import { fromHex } from "./utlis";
import consts from "./consts";

const getUrl = (canisterId, id) => {
  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");
  const host =
    network != "ic"
      ? `http://localhost:8000/${id}?canisterId=${canisterId}`
      : `http://${canisterId}.raw.ic0.app/${id}`;

  return host;
};

const onSignInStoic = async () => {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    return identity;
  } else {
    const identity = await StoicIdentity.connect();
    return identity;
  }
};

const onSignInPlug = async () => {
  try {
    const publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
  } catch (e) {
    console.log(e);
  }
};

const onSignOutStoic = async () => {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    StoicIdentity.disconnect();
    return true;
  } else {
    return false;
  }
};

const artistRegistryActor = async (identity) => {
  return await createArtistRegistryActor(artistRegistryCId, {
    agentOptions: {
      identity: identity,
    },
  });
};

const socialsActor = async (identity) => {
  return await createSocialsActor(socialsCId, {
    agentOptions: {
      identity: identity,
    },
  });
};

const ledgerActor = async (identity) => {
  return await createLedgerActor(ledgerCId, {
    agentOptions: {
      identity: identity,
    },
  });
};

const _canisterActor = async (identity, id) => {
  return await createActorPrivate(id, {
    agentOptions: {
      identity: identity,
    },
  });
};

const _AssetCanisterActor = async (identity, id) => {
  return await createAssetActorPrivate(id, {
    agentOptions: {
      identity: identity,
    },
  });
};

const _CanisterNFT = async (identity, id) => {
  return await createActorNFT(id, {
    agentOptions: {
      identity: identity,
    },
  });
};

const _mintNFT = async (id, payload) => {
  const identity = await onSignInStoic();
  const actor = await _CanisterNFT(identity, id);
  const result = await actor.mint(payload);
  console.log("[MINT NFT] => ", result);
  return result;
};

const _listNFT = async (id) => {
  const identity = await onSignInStoic();
  const actor = await _CanisterNFT(identity, id);
  const result = await actor.listAssets();
  console.log("[LIST NFT] => ", result);
  return result;
};

const _getNFTByIndex = async (id, index) => {
  const identity = await onSignInStoic();
  const actor = await _CanisterNFT(identity, id);
  const result = await actor.tokenByIndex(index);
  console.log("[ GET NFT BY INDEX ] => ", result);
  return result;
};

const _publishNFTCollection = async (id) => {
  const identity = await onSignInStoic();
  const actor = await _CanisterNFT(identity, id);
  const result = await actor.init();
  console.log("[ PUBLUSH NFT COLLECTIONS ] => ", result);
  return result;
};

const getArtistByPrincipal = async () => {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.get(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal)
  );
  return result;
};

const addArtist = async (artist) => {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.add(artist);
  // const resultCreateCanister = await actor.createArtistCan();
  // console.log("[ADD ARTIST CANISTER] => ", resultCreateCanister);
  return result;
};

const relPrincipalWithUsername = async (username) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.relPrincipalWithUsername(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal),
    username
  );
  console.log("[REL USERNAME BY PRINCIPAL] => ", result);
  return result;
};

const parseArtist = (artist) => {
  console.log(artist);
  const parseArtist = {
    fullName: artist[0]?.name,
    principal: artist[0]?.principal_id,
    avatar: service.getUrl(
      consts.ASSET_CANISTER_ID_ARTIST,
      `A${JSON.parse(localStorage.getItem("_scApp")).principal}`
    ),
    firstName: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_FIRSTNAME
    )[1].Text,
    lastName: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_LASTNAME
    )[1].Text,
    username: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_USERNAME
    )[1].Text,
    displayName: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_DISPLAYNAME
    )[1].Text,
    location: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_LOCATION
    )[1].Text,
    email: artist[0]?.details.find(
      (detail) => detail[0] === consts.ARTIST_EMAIL
    )[1].Text,
    phone: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_PHONE
    )[1].Text,
    about: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_ABOUT
    )[1].Text,
    artType: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_ARTTYPE
    )[1].Text,

    cameras: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_CAMERAS
    )[1].Vec,
    lens: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_LENS
    )[1].Vec,
    canisterId: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_CANISTERID
    )
      ? artist[0].details.find(
          (detail) => detail[0] === consts.ARTIST_CANISTERID
        )[1].Text
      : " ",
    assetCanisterId: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_ASSETCANISTERID
    )
      ? artist[0].details.find(
          (detail) => detail[0] === consts.ARTIST_ASSETCANISTERID
        )[1].VecText
      : "",
    banner: artist[0].details.find((detail) => detail[0] === "bannerAsset")
      ? getUrl(
          consts.ASSET_CANISTER_ID_ARTIST,
          `B${JSON.parse(localStorage.getItem("_scApp")).principal}`
        )
      : "https://images.unsplash.com/photo-1651135094094-7f2a48224da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1MjcxNTgwMA&ixlib=rb-1.2.1&q=80&w=1080",
  };
  // artist[0].details.find((detail) => detail[0] === "bannerAsset")
  // ? getUrl(
  //     consts.ASSET_CANISTER_ID_ARTIST,
  //     `B${JSON.parse(localStorage.getItem("_scApp")).principal}`
  //   )
  // const identity = await onSignInStoic();
  // console.log(parseArtist);
  // const actorPrivate = await _canisterActor(identity, parseArtist.canisterId);
  // const result = await actorPrivate.getContractInfo();
  // console.log(result);
  return parseArtist;
};

const createPost = async (post, blob) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createPost({ postBasics: post, postImage: blob });
  console.log("[CREATE POST] => ", result);
  return result;
};

const _canisterContactInfo = async (id) => {
  const identity = await onSignInStoic();
  const actor = await _canisterActor(identity, id);
  const result = await actor.getContractInfo();
  console.log("[_CANISTER GET CONTRACT INFO] => ", result);
  return result;
};

const _createNFTCanister = async (id, payload) => {
  const identity = await onSignInStoic();
  const actor = await _canisterActor(identity, id);
  payload.creator = Principal.fromText(payload.creator);
  const result = await actor.createNFTCan(payload.nFTMetadata, payload.creator);
  console.log("[_CANISTER CREATE NFT CAN] => ", result);
  return result;
};

const _getNFTCan = async (id) => {
  const identity = await onSignInStoic();
  const actor = await _canisterActor(identity, id);
  const result = await actor.getNFTCan();
  console.log("[_CANISTER GET NFT CAN] => ", result);
  return result;
};

const _assetCanisterContractInfo = async (id) => {
  const identity = await onSignInStoic();
  const actor = await _AssetCanisterActor(identity, id);
  const result = await actor.getContractInfo();
  result.canisterId = id;
  result.cycles = Number(result.cycles);
  result.heapSize = Number(result.heapSize);
  result.maxLiveSize = Number(result.maxLiveSize);
  result.memorySize = Number(result.memorySize);
  console.log("[_ASSETCANISTER GET CONTRACT INFO] => ", result);
  return result;
};

const getArtistDetailsByUsername = async (username) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readArtistProfile(username);
  console.log("[GET ARTIST DETAILS BY USERNAME] => ", result);
  return result;
};

const getGalleriesByArtist = async (username) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readGalleriesByArtist(username);
  console.log("[GET GALLERIES BY ARTIST] => ", result);
  return result;
};

const getArtistByUsername = async (username) => {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.getByUsername(username);
  console.log("[GET ARTIST BY USERNAME] => ", result);
  return result;
};

const addFollow = async (username) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.addFollow(username);
  console.log("[ADD FOLLOW] => ", result);
  return result;
};

const removeFollow = async (principal) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeFollow(principal);
  console.log("[REMOVE FOLLOW] => ", result);
  return result;
};

const readPostByFollowers = async (username) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readFollowsPostsByCreation(username, 10, 1);
  console.log("[READ POST BY FOLLOWERS] => ", result);
  return result;
};

async function readPostsByCreation() {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostsByCreation(20, 1);
  console.log("[GET POST BY CREATION] => ", result);
  return result;
}

const createGallery = async (gallery) => {
  gallery.artistPpal = Principal.fromText(
    JSON.parse(localStorage.getItem("_scApp")).principal
  );
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createGallery(gallery);
  console.log("[CREATE GALLERY] => ", result);
  return result;
};

const removeGallery = async (id) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeGallery(id);
  console.log("[REMOVE GALLERY] => ", result);
  return result;
};

const getPostByID = async (id) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostById(id);
  console.log("[GET POST BY ID] => ", result);
  return result;
};

const addLike = async (id) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.addLike(id);
  console.log("[ADD LIKE] => ", result);
  return result;
};

const removeLike = async (id) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeLike(id);
  console.log("[REMOVE LIKE] => ", result);
  return result;
};

const createComment = async (id, comment) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createComment(id, comment);
  console.log("[CREATE COMMENT] => ", result);
  return result;
};

const removeComment = async (postId, commentId) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeComment(postId, commentId);
  console.log("[REMOVE COMMENT] => ", result);
  return result;
};

const updateArtist = async (artist) => {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.update(artist);
  console.log("[UPDATE ARTIST] => ", result);
  return result;
};

const readPostsByGallery = async (galleryId) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostsByGallery(galleryId, 20, 1);
  console.log("[READ POST BY GALLERY] => ", result);
  return result;
};

const updatePost = async (post, postId) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.updatePost({ postBasics: post, postId });
  console.log("[UPDATE POST] => ", result);
  return result;
};

const removePost = async (id) => {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removePost(id);
  console.log("[REMOVE POST] => ", result);
  return result;
};

const createInvoice = async (token, amount, quantity) => {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  console.log(token, amount, quantity);
  const result = await actor.createInvoice(token, amount, quantity);
  console.log("[CREATE INVOICE] => ", result);
  return result;
};

const transfer = async (account, amount) => {
  const identity = await onSignInStoic();
  const actor = await ledgerActor(identity);
  try {
    const result = await actor.transfer({
      to: [...new Uint8Array(fromHex(account))],
      fee: { e8s: 10000 },
      from_subaccount: [],
      created_at_time: [],
      memo: 0,
      amount: { e8s: amount },
    });
    if (result.Ok) {
      return true;
    } else {
      alert("Insuficient founds");
      return false;
    }
  } catch (err) {
    console.log(err, "[Err in transfer method service.js]");
  }
};

const verifyInvoice = async (invoiceId) => {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.isVerifyPayment(invoiceId);
  console.log("[VERIFY INVOICE] => ", result);
  return result;
};

function scrollToBottom() {
  const chatContainer = document.getElementById("scroll-btn");
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return true;
}

export const service = {
  onSignInStoic,
  getArtistByPrincipal,
  onSignOutStoic,
  addArtist,
  relPrincipalWithUsername,
  parseArtist,
  createPost,
  getUrl,
  getArtistDetailsByUsername,
  getGalleriesByArtist,
  getArtistByUsername,
  addFollow,
  removeFollow,
  readPostByFollowers,
  readPostsByCreation,
  createGallery,
  removeGallery,
  getPostByID,
  addLike,
  removeLike,
  createComment,
  removeComment,
  updateArtist,
  readPostsByGallery,
  scrollToBottom,
  onSignInPlug,
  updatePost,
  removePost,
  createInvoice,
  transfer,
  verifyInvoice,
  _canisterActor,
  _AssetCanisterActor,
  _canisterContactInfo,
  _assetCanisterContractInfo,
  _createNFTCanister,
  _getNFTCan,
  _CanisterNFT,
  _mintNFT,
  _listNFT,
  _getNFTByIndex,
  _publishNFTCollection,
};
