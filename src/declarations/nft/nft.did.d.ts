import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export interface AuthorizeRequest {
  'p' : Principal,
  'id' : string,
  'isAuthorized' : boolean,
}
export type Callback = ActorMethod<[], undefined>;
export interface CallbackStatus {
  'failedCalls' : bigint,
  'failedCallsLimit' : bigint,
  'callback' : [] | [Callback__1],
  'noTopupCallLimit' : bigint,
  'callsSinceLastTopup' : bigint,
}
export type Callback__1 = ActorMethod<[Message], undefined>;
export interface Chunk {
  'data' : Array<number>,
  'totalPages' : bigint,
  'nextPage' : [] | [bigint],
}
export type Contract = {
    'ContractAuthorize' : { 'isAuthorized' : boolean, 'user' : Principal }
  } |
  { 'Mint' : { 'id' : string, 'owner' : Principal } };
export interface ContractInfo {
  'nft_payload_size' : bigint,
  'memory_size' : bigint,
  'max_live_size' : bigint,
  'cycles' : bigint,
  'total_minted' : bigint,
  'heap_size' : bigint,
  'authorized_users' : Array<Principal>,
}
export interface ContractMetadata {
  'prixelart' : [] | [string],
  'name' : string,
  'socials' : Array<[] | [[string, string]]>,
  'website' : [] | [string],
  'supply' : [] | [bigint],
  'symbol' : string,
}
export interface Egg {
  'contentType' : string,
  'owner' : [] | [Principal],
  'properties' : Properties,
  'isPrivate' : boolean,
  'payload' : { 'StagedData' : string } |
    { 'Payload' : Array<number> },
}
export type Error = { 'Immutable' : null } |
  { 'NotFound' : null } |
  { 'Unauthorized' : null } |
  { 'InvalidRequest' : null } |
  { 'AuthorizedPrincipalLimitReached' : bigint } |
  { 'FailedToWrite' : string };
export type HeaderField = [string, string];
export interface Message {
  'topupCallback' : TopupCallback,
  'createdAt' : bigint,
  'topupAmount' : bigint,
  'event' : { 'ContractEvent' : Contract } |
    { 'TokenEvent' : Token },
}
export interface Metadata {
  'id' : string,
  'contentType' : string,
  'owner' : Principal,
  'createdAt' : bigint,
  'properties' : Properties,
}
export interface NFT {
  'assetRequest' : ActorMethod<[AssetRequest], Result_2>,
  'authorize' : ActorMethod<[AuthorizeRequest], Result_2>,
  'balanceOf' : ActorMethod<[Principal], Array<string>>,
  'getAuthorized' : ActorMethod<[string], Array<Principal>>,
  'getContractInfo' : ActorMethod<[], ContractInfo>,
  'getEventCallbackStatus' : ActorMethod<[], CallbackStatus>,
  'getMetadata' : ActorMethod<[], ContractMetadata>,
  'getTotalMinted' : ActorMethod<[], bigint>,
  'http_request' : ActorMethod<[Request], Response>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackResponse,
  >,
  'init' : ActorMethod<[], undefined>,
  'isAuthorized' : ActorMethod<[string, Principal], boolean>,
  'listAssets' : ActorMethod<
    [],
    Array<[string, [[] | [Principal], Array<Principal>], Properties]>,
  >,
  'mint' : ActorMethod<[Egg], Result>,
  'nftStreamingCallback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackResponse,
  >,
  'ownerOf' : ActorMethod<[string], Result_6>,
  'queryProperties' : ActorMethod<[QueryRequest], Result_1>,
  'staticStreamingCallback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackResponse,
  >,
  'tokenByIndex' : ActorMethod<[string], Result_5>,
  'tokenChunkByIndex' : ActorMethod<[string, bigint], Result_4>,
  'tokenMetadataByIndex' : ActorMethod<[string], Result_3>,
  'transfer' : ActorMethod<[Principal, string], Result_2>,
  'updateContractOwners' : ActorMethod<[Principal, boolean], Result_2>,
  'updateEventCallback' : ActorMethod<[UpdateEventCallback], undefined>,
  'updateProperties' : ActorMethod<[UpdateRequest], Result_1>,
  'wallet_receive' : ActorMethod<[], undefined>,
  'writeStaged' : ActorMethod<[WriteNFT], Result>,
}
export type PayloadResult = { 'Complete' : Array<number> } |
  { 'Chunk' : Chunk };
export type Properties = Array<Property>;
export interface Property {
  'value' : Value,
  'name' : string,
  'immutable' : boolean,
}
export interface PublicToken {
  'id' : string,
  'contentType' : string,
  'owner' : Principal,
  'createdAt' : bigint,
  'properties' : Properties,
  'payload' : PayloadResult,
}
export interface Query { 'name' : string, 'next' : Array<Query> }
export type QueryMode = { 'All' : null } |
  { 'Some' : Array<Query> };
export interface QueryRequest { 'id' : string, 'mode' : QueryMode }
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
}
export interface Response {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Result = { 'ok' : string } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Properties } |
  { 'err' : Error };
export type Result_2 = { 'ok' : null } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Metadata } |
  { 'err' : Error };
export type Result_4 = { 'ok' : Chunk } |
  { 'err' : Error };
export type Result_5 = { 'ok' : PublicToken } |
  { 'err' : Error };
export type Result_6 = { 'ok' : Principal } |
  { 'err' : Error };
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken],
  StreamingCallbackResponse,
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
}
export interface StreamingCallbackToken {
  'key' : string,
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export type Token = {
    'Authorize' : {
      'id' : string,
      'isAuthorized' : boolean,
      'user' : Principal,
    }
  } |
  { 'Transfer' : { 'id' : string, 'to' : Principal, 'from' : Principal } };
export type TopupCallback = ActorMethod<[], undefined>;
export interface Update { 'mode' : UpdateMode, 'name' : string }
export type UpdateEventCallback = { 'Set' : Callback__1 } |
  { 'Remove' : null };
export type UpdateMode = { 'Set' : Value } |
  { 'Next' : Array<Update> };
export interface UpdateRequest { 'id' : string, 'update' : Array<Update> }
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Empty' : null } |
  { 'Bool' : boolean } |
  { 'Text' : string } |
  { 'Float' : number } |
  { 'Principal' : Principal } |
  { 'Class' : Array<Property> };
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
export type WriteNFT = {
    'Init' : { 'size' : bigint, 'callback' : [] | [Callback] }
  } |
  {
    'Chunk' : {
      'id' : string,
      'chunk' : Array<number>,
      'callback' : [] | [Callback],
    }
  };
export interface _SERVICE extends NFT {}
