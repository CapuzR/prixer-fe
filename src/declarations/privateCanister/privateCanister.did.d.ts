import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Art {
  'thumbnail' : string,
  'createdAt' : bigint,
  'artBasics' : ArtBasics,
}
export interface ArtBasics {
  'title' : string,
  'tags' : Array<string>,
  'artType' : string,
  'description' : string,
  'details' : Array<[string, DetailValue]>,
}
export interface ArtUpdate {
  'updateThumbnail' : boolean,
  'thumbAsset' : Array<number>,
  'artBasics' : ArtBasics,
}
export interface ArtistCanister {
  'artistMetadata' : ActorMethod<[], Metadata__1>,
  'authorizedArr' : ActorMethod<[], Result_2>,
  'createArt' : ActorMethod<[ArtUpdate], Result_5>,
  'createAssetCan' : ActorMethod<[], Result_4>,
  'createNFTCan' : ActorMethod<[NFTMetadata, Principal], Result_3>,
  'deleteArt' : ActorMethod<[string], Result>,
  'getAssetCanIds' : ActorMethod<[], Result_2>,
  'getCanIds' : ActorMethod<[], Array<Principal>>,
  'getCanisterId' : ActorMethod<[], Principal>,
  'getContractInfo' : ActorMethod<[], ContractInfo>,
  'getNFTCan' : ActorMethod<[], Array<NFTMetadataExt>>,
  'initNFTCan' : ActorMethod<[Principal, Principal], Result>,
  'name' : ActorMethod<[], string>,
  'privReadArtById' : ActorMethod<[string], Result_1>,
  'updateArt' : ActorMethod<[ArtUpdate, string], Result>,
  'wallet_receive' : ActorMethod<[], { 'accepted' : bigint }>,
}
export interface ContractInfo {
  'heapSize' : bigint,
  'maxLiveSize' : bigint,
  'cycles' : bigint,
  'memorySize' : bigint,
}
export type DetailValue = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<DetailValue> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'VecText' : Array<string> } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type Error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'Unknown' : string } |
  { 'NonExistentItem' : null };
export interface Metadata {
  'thumbnail' : string,
  'name' : string,
  'frontend' : [] | [Array<string>],
  'description' : string,
  'details' : Array<[string, DetailValue]>,
  'principal_id' : Principal,
}
export interface Metadata__1 {
  'thumbnail' : string,
  'name' : string,
  'frontend' : [] | [Array<string>],
  'description' : string,
  'details' : Array<[string, DetailValue]>,
  'principal_id' : Principal,
}
export interface NFTMetadata {
  'prixelart' : [] | [string],
  'name' : string,
  'socials' : Array<[] | [[string, string]]>,
  'website' : [] | [string],
  'supply' : [] | [bigint],
  'symbol' : string,
}
export interface NFTMetadataExt {
  'principal' : Principal,
  'prixelart' : [] | [string],
  'name' : string,
  'socials' : Array<[] | [[string, string]]>,
  'website' : [] | [string],
  'supply' : [] | [bigint],
  'symbol' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Art } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<Principal> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : NFTMetadataExt } |
  { 'err' : Error };
export type Result_4 = { 'ok' : [Principal, Principal] } |
  { 'err' : Error };
export type Result_5 = { 'ok' : string } |
  { 'err' : Error };
export interface _SERVICE extends ArtistCanister {}
