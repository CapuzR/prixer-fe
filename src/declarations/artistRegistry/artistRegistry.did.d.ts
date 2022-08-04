import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CreateCanistersResult {
  'assetCanisters' : Array<string>,
  'canisterId' : string,
}
export interface CreateInvoiceResult {
  'subAccount' : string,
  'invoice' : Invoice,
}
export type DetailValue = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<DetailValue> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type Error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'Unknown' : string } |
  { 'NonExistentItem' : null };
export type Error__1 = { 'Immutable' : null } |
  { 'NotFound' : null } |
  { 'Unauthorized' : null } |
  { 'InvalidRequest' : null } |
  { 'AuthorizedPrincipalLimitReached' : bigint } |
  { 'FailedToWrite' : string };
export interface InitOptions {
  'artistWhitelist' : Array<Principal>,
  'admins' : Array<Principal>,
}
export interface Invoice {
  'id' : bigint,
  'creator' : Principal,
  'destination' : string,
  'token' : string,
  'quantity' : bigint,
  'amount' : bigint,
}
export interface InvoiceError {
  'kind' : { 'InvalidAccount' : null } |
    { 'InvalidDestination' : null } |
    { 'NotYet' : null } |
    { 'NotFound' : null } |
    { 'NotAuthorized' : null } |
    { 'BadFee' : null } |
    { 'InvalidToken' : null } |
    { 'InvalidInvoiceId' : null } |
    { 'Other' : null } |
    { 'InsufficientFunds' : null },
  'message' : [] | [string],
}
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
export type Result_1 = { 'ok' : null } |
  { 'err' : Error__1 };
export type Result_2 = { 'ok' : CreateCanistersResult } |
  { 'err' : InvoiceError };
export type Result_3 = { 'ok' : boolean } |
  { 'err' : Error };
export type Result_4 = { 'ok' : Array<Principal> } |
  { 'err' : Error };
export type Result_5 = { 'ok' : Invoice } |
  { 'err' : InvoiceError };
export type Result_6 = { 'ok' : Array<[Principal, Metadata]> } |
  { 'err' : Error };
export type Result_7 = { 'ok' : CreateInvoiceResult } |
  { 'err' : InvoiceError };
export type Result_8 = { 'ok' : [Principal, Principal] } |
  { 'err' : Error };
export interface anon_class_26_1 {
  'add' : ActorMethod<[Metadata], Result>,
  'assignUsername' : ActorMethod<[string], Result>,
  'balance' : ActorMethod<[], bigint>,
  'createAssetCan' : ActorMethod<[], Result_8>,
  'createInvoice' : ActorMethod<[string, bigint, bigint], Result_7>,
  'get' : ActorMethod<[Principal], [] | [Metadata]>,
  'getAll' : ActorMethod<[], Result_6>,
  'getByUsername' : ActorMethod<[string], [] | [Metadata]>,
  'getCanMemInfo' : ActorMethod<[], undefined>,
  'getInvoice' : ActorMethod<[bigint], Result_5>,
  'getPrincipalByUsername' : ActorMethod<[string], Array<Principal>>,
  'getUsernamesByPrincipal' : ActorMethod<[Principal], Array<string>>,
  'getWhitelistedArtists' : ActorMethod<[], Result_4>,
  'isArtistWhitelisted' : ActorMethod<[Principal], Result_3>,
  'isVerifyPayment' : ActorMethod<[bigint], Result_2>,
  'name' : ActorMethod<[], string>,
  'remove' : ActorMethod<[Principal], Result>,
  'transferAuthNFT' : ActorMethod<[Principal, Principal, string], Result_1>,
  'update' : ActorMethod<[Metadata], Result>,
  'usernameExist' : ActorMethod<[string], boolean>,
  'wallet_receive' : ActorMethod<[], undefined>,
  'whitelistArtists' : ActorMethod<[Array<Principal>], Result>,
}
export interface _SERVICE extends anon_class_26_1 {}
