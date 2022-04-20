import { StoicIdentity } from "ic-stoic-identity";
import { createActor as wPCreateActorPrixer } from "../../../declarations/prixelartbe";
import { createActor as wPCreateActorArt } from "../../../declarations/prixelartArt";
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

async function wPActorPrixer(identity) {
  return await wPCreateActorPrixer("r7inp-6aaaa-aaaaa-aaabq-cai", {
    agentOptions: {
      identity: identity,
    },
  });
}

async function wPActorPrixerArt(identity) {
  return await wPCreateActorArt("rrkah-fqaaa-aaaaa-aaaaq-cai", {
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
  const actor = await wPActorPrixer(identity);
  const result = await actor.relPrincipalWithUsername(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal),
    username
  );
  return result;
}

async function addArtist(artist) {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await wPActorPrixerArt(identity);
  const result = await actor.add(artist);
  return result;
}

async function getArtist() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixerArt(identity);
  const result = await actor.get(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal)
  );
  return result;
}

async function deleteArtist() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixerArt(identity);
  const result = await actor.remove(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal)
  );
  return result;
}

async function updateArtist(artist) {
  artist.principal_id = Principal.fromText(artist.principal_id);
  const identity = await onSignInStoic();
  const actor = await wPActorPrixerArt(identity);
  const result = await actor.update(
    Principal.fromText(JSON.parse(localStorage.getItem("_scApp")).principal),
    artist
  );
  return result;
}

async function getArtistByUsername(username) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixerArt(identity);
  const result = await actor.getByUsername(username);
  return result;
}

async function getArtistDetailsByUsername(username) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);

  const result = await actor.readArtistProfile(username);
  console.log(result);
  return result;
}

async function getPostsByCreation() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readPostsByCreation(5, 1);
  return result;
}

async function createPost(post, blob) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createPost({ postBasics: post, postImage: blob });
  return result;
}

async function addFollow(username) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.addFollow(username);
  return result;
}

async function removeFollow(principal) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.removeFollow(principal);

  return result;
}
