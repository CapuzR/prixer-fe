import type { Principal } from '@dfinity/principal';
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
export type Error = { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null };
export interface Profile { 'id' : Principal, 'bio' : Bio }
export interface ProfileUpdate { 'bio' : Bio }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Profile } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<string> } |
  { 'err' : CommonError };
export interface Socials { 'ceSo' : [] | [CeSo], 'deSo' : [] | [DeSo] }
export type TokenIdentifier = string;
export interface _SERVICE {
  'createProfile' : (arg_0: ProfileUpdate) => Promise<Result>,
  'deleteProfile' : () => Promise<Result>,
  'getDiscordHolders' : (arg_0: string) => Promise<Result_2>,
  'readProfile' : () => Promise<Result_1>,
  'updateProfile' : (arg_0: ProfileUpdate) => Promise<Result>,
}
