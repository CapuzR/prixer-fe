import { StoicIdentity } from "ic-stoic-identity";
import { createActor as createSocialsActor } from "../../../declarations/socials";
import { createActor as createArtistRegistryActor } from "../../../declarations/artistRegistry";
import { canisterId as socialsCId } from "../../../declarations/socials/index.js";
import { canisterId as artistRegistryCId } from "../../../declarations/artistRegistry/index.js";
import { Principal } from "@dfinity/principal";
import consts from "../consts/index";

const service = {
  onSignInStoic,
  onSignOutStoic,
  addArtist,
  getArtist,
  deleteArtist,
  parseArtist,
  updateArtist,
  getArtistByUsername,
  getPostsByCreation,
  createPost,
  addFollow,
  relPrincipalWithUsername,
  getArtistDetailsByUsername,
  removeFollow,
  getFollowersByArtist,
  getArtistFollows,
  createGallery,
  getGalleriesByArtist,
  parseGalleries,
  removeGallery,
  addLike,
  removeLike,
  getPostByID,
  removePost,
  readPostByFollowers,
  updatePost,
  readPostsByGallery,
  createComment,
  removeComment,
  scrollToBottom,
};

export default service;

async function onSignInStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    return identity;
  } else {
    const identity = await StoicIdentity.connect();
    return identity;
  }
}

async function onSignOutStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    StoicIdentity.disconnect();
    return true;
  } else {
    return false;
  }
}

async function socialsActor(identity) {
  return await createSocialsActor(socialsCId, {
    agentOptions: {
      identity: identity,
    },
  });
}

async function artistRegistryActor(identity) {
  console.log("artistReg ", artistRegistryCId);
  return await createArtistRegistryActor(artistRegistryCId, {
    agentOptions: {
      identity: identity,
    },
  });
}

function parseArtist(artist) {
  const parseArtist = {
    fullName: artist[0].name,
    principal: artist[0].principal_id,
    avatar: artist[0].thumbnail,
    firstName: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_FIRSTNAME
    )[1].Text,
    lastName: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_LASTNAME
    )[1].Text,
    username: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_USERNAME
    )[1].Text,
    displayName: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_DISPLAYNAME
    )[1].Text,
    location: artist[0].details.find(
      (detail) => detail[0] === consts.ARTIST_LOCATION
    )[1].Text,
    email: artist[0].details.find(
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
  };

  return parseArtist;
}

async function relPrincipalWithUsername(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.relPrincipalWithUsername(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal),
    username
  );
  console.log("[REL USERNAME BY PRINCIPAL] => ", result);
  return result;
}

async function addArtist(artist, username) {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.add(artist);
  localStorage.setItem("username", username);
  console.log("[ADD ARTIST] => ", result);

  return result;
}

async function getArtist() {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.get(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal)
  );
  console.log("[GET ARTIST] => ", result);
  return result;
}

async function deleteArtist() {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.remove(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal)
  );
  localStorage.clear();
  console.log("[DELETE ARTIST] => ", result);
  return result;
}

async function updateArtist(artist) {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.update(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal),
    artist
  );
  console.log("[GET POST BY ID] => ", result);
  return result;
}

async function getArtistByUsername(username) {
  const identity = await onSignInStoic();
  const actor = await artistRegistryActor(identity);
  const result = await actor.getByUsername(username);
  console.log("[GET ARTIST BY USERNAME] => ", result);
  return result;
}

async function getArtistDetailsByUsername(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readArtistProfile(username);
  console.log("[GET ARTIST DETAILS BY USERNAME] => ", result);
  return result;
}

async function getPostsByCreation() {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostsByCreation(20, 1);
  console.log("[GET POST BY CREATION] => ", result);
  return result;
}

async function createPost(post, blob) {
  console.log("[PAYLOAD] => ", { postBasics: post, postImage: blob });
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createPost({ postBasics: post, postImage: blob });
  console.log("[CREATE POST] => ", result);
  return result;
}

async function addFollow(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.addFollow(username);
  console.log("[ADD FOLLOW] => ", result);
  return result;
}

async function removeFollow(principal) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeFollow(principal);
  console.log("[REMOVE FOLLOW] => ", result);
  return result;
}

async function getFollowersByArtist(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readArtistFollowers(username);
  return result;
}

async function getArtistFollows(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readArtistFollows(username);
  console.log("[GET ARTIST FOLLOWS] => ", result);
  return result;
}

async function createGallery(gallery) {
  gallery.artistPpal = Principal.fromText(
    JSON.parse(localStorage.getItem("_scApp")).principal
  );
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createGallery(gallery);
  console.log("[CREATE GALLERY] => ", result);
  return result;
}

async function getGalleriesByArtist(username) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readGalleriesByArtist(username);
  console.log("[GET GALLERIES BY ARTIST] => ", result);
  return result;
}

function parseGalleries(galleries) {
  const arrayGalleries = [];
  galleries.ok.map((gallery) => arrayGalleries.push(gallery[1]));
  return arrayGalleries;
}

async function removeGallery(id) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeGallery(id);
  console.log("[REMOVE GALLERY] => ", result);
  return result;
}

async function addLike(id) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.addLike(id);
  console.log("[ADD LIKE] => ", result);
  return result;
}

async function removeLike(id) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeLike(id);
  console.log("[REMOVE LIKE] => ", result);
  return result;
}
async function getPostByID(id) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostById(id);
  console.log("[GET POST BY ID] => ", result);
  return result;
}

async function removePost(id) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removePost(id);
  console.log("[REMOVE POST] => ", result);
  return result;
}

async function readPostByFollowers() {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readFollowsPostsByCreation(
    localStorage.getItem("username"),
    10,
    1
  );
  console.log("[READ POST BY FOLLOWERS] => ", result);
  return result;
}

async function updatePost(post, postId) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.updatePost({ postBasics: post, postId });
  console.log("[UPDATE POST] => ", result);
  return result;
}

async function readPostsByGallery(galleryId) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.readPostsByGallery(galleryId, 20, 1);
  console.log("[READ POST BY GALLERY] => ", result);
  return result;
}

async function createComment(id, comment) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.createComment(id, comment);
  console.log("[CREATE COMMENT] => ", result);
  return result;
}

async function removeComment(postId, commentId) {
  const identity = await onSignInStoic();
  const actor = await socialsActor(identity);
  const result = await actor.removeComment(postId, commentId);
  console.log("[REMOVE COMMENT] => ", result);
  return result;
}

function scrollToBottom() {
  const chatContainer = document.getElementById("scroll-btn");
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return true;
}
