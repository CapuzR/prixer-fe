import type { Principal } from '@dfinity/principal';
export type DetailValue = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<DetailValue> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type Error = { 'Immutable' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'Unauthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'InvalidRequest' : null } |
  { 'AuthorizedPrincipalLimitReached' : bigint } |
  { 'FailedToWrite' : string };
export interface Metadata {
  'thumbnail' : string,
  'name' : string,
  'frontend' : [] | [Array<string>],
  'description' : string,
  'details' : Array<[string, DetailValue]>,
  'principal_id' : Principal,
}
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : boolean } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<Principal> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<[Principal, Metadata]> } |
  { 'err' : Error };
export interface _SERVICE {
  'add' : (arg_0: Metadata) => Promise<Result>,
  'assignUsername' : (arg_0: string) => Promise<Result>,
  'createArtistCan' : () => Promise<Result>,
  'get' : (arg_0: Principal) => Promise<[] | [Metadata]>,
  'getAll' : () => Promise<Result_3>,
  'getByUsername' : (arg_0: string) => Promise<[] | [Metadata]>,
  'getCanMemInfo' : () => Promise<undefined>,
  'getPrincipalByUsername' : (arg_0: string) => Promise<Array<Principal>>,
  'getUsernamesByPrincipal' : (arg_0: Principal) => Promise<Array<string>>,
  'getWhitelistedArtists' : () => Promise<Result_2>,
  'isArtistWhitelisted' : (arg_0: Principal) => Promise<Result_1>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: Principal) => Promise<Result>,
  'update' : (arg_0: Metadata) => Promise<Result>,
  'usernameExist' : (arg_0: string) => Promise<boolean>,
  'whitelistArtists' : (arg_0: Array<Principal>) => Promise<Result>,
}
