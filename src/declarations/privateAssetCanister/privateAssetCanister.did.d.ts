import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AssetDetails {
  'key' : Key,
  'encodings' : Array<AssetEncodingDetails>,
  'content_type' : string,
}
export interface AssetEncodingDetails {
  'modified' : Time,
  'sha256' : [] | [Array<number>],
  'length' : bigint,
  'content_encoding' : string,
}
export interface Assets {
  'authorize' : ActorMethod<[Principal], undefined>,
  'clear' : ActorMethod<[ClearArguments], undefined>,
  'commit_batch' : ActorMethod<[CommitBatchArguments], undefined>,
  'create_asset' : ActorMethod<[CreateAssetArguments], undefined>,
  'create_batch' : ActorMethod<[{}], { 'batch_id' : BatchId }>,
  'create_chunk' : ActorMethod<
    [{ 'content' : Array<number>, 'batch_id' : BatchId }],
    { 'chunk_id' : ChunkId },
  >,
  'delete_asset' : ActorMethod<[DeleteAssetArguments], undefined>,
  'get' : ActorMethod<
    [{ 'key' : Key, 'accept_encodings' : Array<string> }],
    {
      'content' : Array<number>,
      'sha256' : [] | [Array<number>],
      'content_type' : string,
      'content_encoding' : string,
      'total_length' : bigint,
    },
  >,
  'getCanisterId' : ActorMethod<[], Principal>,
  'getContractInfo' : ActorMethod<[], ContractInfo>,
  'get_chunk' : ActorMethod<
    [
      {
        'key' : Key,
        'sha256' : [] | [Array<number>],
        'index' : bigint,
        'content_encoding' : string,
      },
    ],
    { 'content' : Array<number> },
  >,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse,
  >,
  'list' : ActorMethod<[{}], Array<AssetDetails>>,
  'retrieve' : ActorMethod<[Path], Contents>,
  'set_asset_content' : ActorMethod<[SetAssetContentArguments], undefined>,
  'store' : ActorMethod<
    [
      {
        'key' : Key,
        'content' : Array<number>,
        'sha256' : [] | [Array<number>],
        'content_type' : string,
        'content_encoding' : string,
      },
    ],
    undefined,
  >,
  'unset_asset_content' : ActorMethod<[UnsetAssetContentArguments], undefined>,
}
export type BatchId = bigint;
export type BatchOperationKind = { 'CreateAsset' : CreateAssetArguments } |
  { 'UnsetAssetContent' : UnsetAssetContentArguments } |
  { 'DeleteAsset' : DeleteAssetArguments } |
  { 'SetAssetContent' : SetAssetContentArguments } |
  { 'Clear' : ClearArguments };
export type ChunkId = bigint;
export type ClearArguments = {};
export interface CommitBatchArguments {
  'batch_id' : BatchId,
  'operations' : Array<BatchOperationKind>,
}
export type Contents = Array<number>;
export interface ContractInfo {
  'heapSize' : bigint,
  'maxLiveSize' : bigint,
  'cycles' : bigint,
  'memorySize' : bigint,
}
export interface CreateAssetArguments { 'key' : Key, 'content_type' : string }
export interface DeleteAssetArguments { 'key' : Key }
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Key = string;
export type Path = string;
export interface SetAssetContentArguments {
  'key' : Key,
  'sha256' : [] | [Array<number>],
  'chunk_ids' : Array<ChunkId>,
  'content_encoding' : string,
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
}
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Time = bigint;
export interface UnsetAssetContentArguments {
  'key' : Key,
  'content_encoding' : string,
}
export interface _SERVICE extends Assets {}
