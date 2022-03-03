import { StoicIdentity } from "ic-stoic-identity";
import { createActor as wPCreateActor } from "../../../declarations/prixelart";

const service = {
  onSignOutStoic,
  onSignInStoic,
  wPActor,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
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
  return await wPCreateActor("rrkah-fqaaa-aaaaa-aaaaq-cai", {
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
  console.log(result);
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
  console.log(result);
  return result;
}

async function deleteProfile() {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);

  return await actor.deleteProfile();
}
