import type { Principal } from '@dfinity/principal';
export interface Asset {
  'contentType' : string,
  'payload' : Array<Array<number>>,
}
export type AssetRequest = {
    'Put' : {
      'key' : string,
      'contentType' : string,
      'callback' : [] | [Callback],
      'payload' : { 'StagedData' : null } |
        { 'Payload' : Array<number> },
    }
  } |
  { 'Remove' : { 'key' : string, 'callback' : [] | [Callback] } } |
  { 'StagedWrite' : WriteAsset };
export interface Bio {
  'familyName' : [] | [string],
  'about' : [] | [string],
  'username' : [] | [string],
  'displayName' : [] | [string],
  'socials' : [] | [Socials],
  'givenName' : [] | [string],
  'email' : [] | [string],
  'phone' : [] | [string],
  'location' : [] | [string],
}
export type Callback = () => Promise<undefined>;
export interface CeSo {
  'tiktok' : [] | [string],
  'twitter' : [] | [string],
  'instagram' : [] | [string],
  'facebook' : [] | [string],
  'discord' : [] | [string],
}
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export interface DeSo {
  'distrikt' : [] | [string],
  'dscvr' : [] | [string],
  'openChat' : [] | [string],
}
export type Error = { 'Immutable' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'Unauthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'InvalidRequest' : null } |
  { 'AuthorizedPrincipalLimitReached' : bigint } |
  { 'FailedToWrite' : string };
export interface Profile { 'id' : Principal, 'bio' : Bio }
export interface ProfileUpdate { 'bio' : Bio, 'avatarRequest' : AssetRequest }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : [[] | [Profile], [] | [Asset]] } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<string> } |
  { 'err' : CommonError };
export interface Socials { 'ceSo' : [] | [CeSo], 'deSo' : [] | [DeSo] }
export type TokenIdentifier = string;
export type WriteAsset = {
    'Init' : { 'id' : string, 'size' : bigint, 'callback' : [] | [Callback] }
  } |
  {
    'Chunk' : {
      'id' : string,
      'chunk' : Array<number>,
      'callback' : [] | [Callback],
    }
  };
export interface _SERVICE {
  'createProfile' : (arg_0: ProfileUpdate) => Promise<Result>,
  'deleteProfile' : (arg_0: AssetRequest) => Promise<Result>,
  'getDiscordHolders' : (arg_0: string) => Promise<Result_2>,
  'readProfile' : () => Promise<Result_1>,
  'updateProfile' : (arg_0: ProfileUpdate) => Promise<Result>,
}
