export const idlFactory = ({ IDL }) => {
  const ClearArguments = IDL.Record({});
  const BatchId = IDL.Nat;
  const Key = IDL.Text;
  const CreateAssetArguments = IDL.Record({
    'key' : Key,
    'content_type' : IDL.Text,
  });
  const UnsetAssetContentArguments = IDL.Record({
    'key' : Key,
    'content_encoding' : IDL.Text,
  });
  const DeleteAssetArguments = IDL.Record({ 'key' : Key });
  const ChunkId = IDL.Nat;
  const SetAssetContentArguments = IDL.Record({
    'key' : Key,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'chunk_ids' : IDL.Vec(ChunkId),
    'content_encoding' : IDL.Text,
  });
  const BatchOperationKind = IDL.Variant({
    'CreateAsset' : CreateAssetArguments,
    'UnsetAssetContent' : UnsetAssetContentArguments,
    'DeleteAsset' : DeleteAssetArguments,
    'SetAssetContent' : SetAssetContentArguments,
    'Clear' : ClearArguments,
  });
  const CommitBatchArguments = IDL.Record({
    'batch_id' : BatchId,
    'operations' : IDL.Vec(BatchOperationKind),
  });
  const ContractInfo = IDL.Record({
    'heapSize' : IDL.Nat,
    'maxLiveSize' : IDL.Nat,
    'cycles' : IDL.Nat,
    'memorySize' : IDL.Nat,
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : IDL.Func(
          [StreamingCallbackToken],
          [StreamingCallbackHttpResponse],
          ['query'],
        ),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const Time = IDL.Int;
  const AssetEncodingDetails = IDL.Record({
    'modified' : Time,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'length' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const AssetDetails = IDL.Record({
    'key' : Key,
    'encodings' : IDL.Vec(AssetEncodingDetails),
    'content_type' : IDL.Text,
  });
  const Path = IDL.Text;
  const Contents = IDL.Vec(IDL.Nat8);
  const Assets = IDL.Service({
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'clear' : IDL.Func([ClearArguments], [], []),
    'commit_batch' : IDL.Func([CommitBatchArguments], [], []),
    'create_asset' : IDL.Func([CreateAssetArguments], [], []),
    'create_batch' : IDL.Func(
        [IDL.Record({})],
        [IDL.Record({ 'batch_id' : BatchId })],
        [],
      ),
    'create_chunk' : IDL.Func(
        [IDL.Record({ 'content' : IDL.Vec(IDL.Nat8), 'batch_id' : BatchId })],
        [IDL.Record({ 'chunk_id' : ChunkId })],
        [],
      ),
    'delete_asset' : IDL.Func([DeleteAssetArguments], [], []),
    'get' : IDL.Func(
        [IDL.Record({ 'key' : Key, 'accept_encodings' : IDL.Vec(IDL.Text) })],
        [
          IDL.Record({
            'content' : IDL.Vec(IDL.Nat8),
            'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
            'content_type' : IDL.Text,
            'content_encoding' : IDL.Text,
            'total_length' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getContractInfo' : IDL.Func([], [ContractInfo], ['query']),
    'get_chunk' : IDL.Func(
        [
          IDL.Record({
            'key' : Key,
            'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
            'index' : IDL.Nat,
            'content_encoding' : IDL.Text,
          }),
        ],
        [IDL.Record({ 'content' : IDL.Vec(IDL.Nat8) })],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_streaming_callback' : IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'list' : IDL.Func([IDL.Record({})], [IDL.Vec(AssetDetails)], ['query']),
    'retrieve' : IDL.Func([Path], [Contents], ['query']),
    'set_asset_content' : IDL.Func([SetAssetContentArguments], [], []),
    'store' : IDL.Func(
        [
          IDL.Record({
            'key' : Key,
            'content' : IDL.Vec(IDL.Nat8),
            'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
            'content_type' : IDL.Text,
            'content_encoding' : IDL.Text,
          }),
        ],
        [],
        [],
      ),
    'unset_asset_content' : IDL.Func([UnsetAssetContentArguments], [], []),
  });
  return Assets;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
