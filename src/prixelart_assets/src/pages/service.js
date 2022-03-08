import { StoicIdentity } from "ic-stoic-identity";
import { createActor as wPCreateActor } from "../../../declarations/prixelart";
import { createActor as wPCreateActorPrixer } from "../../../declarations/prixelartbe";
import { Principal } from "@dfinity/principal";

const service = {
  onSignOutStoic,
  onSignInStoic,
  wPActor,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  createArt,
  deleteArt,
  getArtsByPrincipal,
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

async function wPActor(identity) {
  return await wPCreateActor("rkp4c-7iaaa-aaaaa-aaaca-cai", {
    agentOptions: {
      identity: identity,
    },
  });
}

async function wPActorPrixer(identity) {
  return await wPCreateActorPrixer("rrkah-fqaaa-aaaaa-aaaaq-cai", {
    agentOptions: {
      identity: identity,
    },
  });
}

async function getProfile() {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);
  return await actor.readProfile();
}

async function createProfile(profileData) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);
  const result = await actor.createProfile(profileData);
  if (result.ok) {
    return true;
  } else {
    return false;
  }
}

async function updateProfile(profileData) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);

  const result = await actor.updateProfile(profileData);
  return result;
}

async function deleteProfile(key) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);

  return await actor.deleteProfile({
    Remove: {
      key: key,
      callback: [],
    },
  });
}

async function createArt(artUpdate) {
  console.log(artUpdate);
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createArt(artUpdate);
  console.log(result);
  return result;
}

async function getArtsByPrincipal(principal) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readArtsByArtist(Principal.fromText(principal));
  return result;
}

async function deleteArt(id) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);

  return await actor.deleteArt(id);
}
