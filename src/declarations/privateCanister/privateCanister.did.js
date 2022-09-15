export const idlFactory = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  DetailValue.fill(
    IDL.Variant({
      'I64' : IDL.Int64,
      'U64' : IDL.Nat64,
      'Vec' : IDL.Vec(DetailValue),
      'Slice' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'True' : IDL.Null,
      'False' : IDL.Null,
      'VecText' : IDL.Vec(IDL.Text),
      'Float' : IDL.Float64,
      'Principal' : IDL.Principal,
    })
  );
  const Metadata = IDL.Record({
    'thumbnail' : IDL.Text,
    'name' : IDL.Text,
    'frontend' : IDL.Opt(IDL.Vec(IDL.Text)),
    'description' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
    'principal_id' : IDL.Principal,
  });
  const Metadata__1 = IDL.Record({
    'thumbnail' : IDL.Text,
    'name' : IDL.Text,
    'frontend' : IDL.Opt(IDL.Vec(IDL.Text)),
    'description' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
    'principal_id' : IDL.Principal,
  });
  const Error = IDL.Variant({
    'NotAuthorized' : IDL.Null,
    'BadParameters' : IDL.Null,
    'Unknown' : IDL.Text,
    'NonExistentItem' : IDL.Null,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : Error,
  });
  const ArtBasics = IDL.Record({
    'title' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'artType' : IDL.Text,
    'description' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
  });
  const ArtUpdate = IDL.Record({
    'updateThumbnail' : IDL.Bool,
    'thumbAsset' : IDL.Vec(IDL.Nat8),
    'artBasics' : ArtBasics,
  });
  const Result_8 = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Principal, IDL.Principal),
    'err' : Error,
  });
  const Invoice = IDL.Record({
    'id' : IDL.Nat,
    'creator' : IDL.Principal,
    'destination' : IDL.Text,
    'token' : IDL.Text,
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const CreateInvoiceResult = IDL.Record({
    'subAccount' : IDL.Text,
    'invoice' : Invoice,
  });
  const InvoiceError = IDL.Record({
    'kind' : IDL.Variant({
      'InvalidAccount' : IDL.Null,
      'InvalidDestination' : IDL.Null,
      'NotYet' : IDL.Null,
      'NotFound' : IDL.Null,
      'NotAuthorized' : IDL.Null,
      'BadFee' : IDL.Null,
      'InvalidToken' : IDL.Null,
      'InvalidInvoiceId' : IDL.Null,
      'Other' : IDL.Null,
      'InsufficientFunds' : IDL.Null,
    }),
    'message' : IDL.Opt(IDL.Text),
  });
  const Result_6 = IDL.Variant({
    'ok' : CreateInvoiceResult,
    'err' : InvoiceError,
  });
  const NFTMetadata = IDL.Record({
    'prixelart' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'socials' : IDL.Vec(IDL.Opt(IDL.Tuple(IDL.Text, IDL.Text))),
    'website' : IDL.Opt(IDL.Text),
    'supply' : IDL.Opt(IDL.Nat),
    'symbol' : IDL.Text,
  });
  const NFTMetadataExt = IDL.Record({
    'principal' : IDL.Principal,
    'prixelart' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'socials' : IDL.Vec(IDL.Opt(IDL.Tuple(IDL.Text, IDL.Text))),
    'website' : IDL.Opt(IDL.Text),
    'supply' : IDL.Opt(IDL.Nat),
    'symbol' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : NFTMetadataExt, 'err' : Error });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const ContractInfo = IDL.Record({
    'heapSize' : IDL.Nat,
    'maxLiveSize' : IDL.Nat,
    'cycles' : IDL.Nat,
    'memorySize' : IDL.Nat,
  });
  const Result_3 = IDL.Variant({ 'ok' : Invoice, 'err' : InvoiceError });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : InvoiceError });
  const Art = IDL.Record({
    'thumbnail' : IDL.Text,
    'createdAt' : IDL.Int,
    'artBasics' : ArtBasics,
  });
  const Result_1 = IDL.Variant({ 'ok' : Art, 'err' : Error });
  const ArtistCanister = IDL.Service({
    'artistMetadata' : IDL.Func([], [Metadata__1], ['query']),
    'authorizedArr' : IDL.Func([], [Result_4], ['query']),
    'createArt' : IDL.Func([ArtUpdate], [Result_8], []),
    'createAssetCan' : IDL.Func([], [Result_7], []),
    'createInvoice' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [Result_6], []),
    'createNFTCan' : IDL.Func([NFTMetadata, IDL.Principal], [Result_5], []),
    'deleteArt' : IDL.Func([IDL.Text], [Result], []),
    'getAssetCanIds' : IDL.Func([], [Result_4], ['query']),
    'getCanIds' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getContractInfo' : IDL.Func([], [ContractInfo], ['query']),
    'getInvoice' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'getNFTCan' : IDL.Func([], [IDL.Vec(NFTMetadataExt)], ['query']),
    'initNFTCan' : IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    'isVerifyPayment' : IDL.Func(
        [IDL.Nat, IDL.Principal, IDL.Text, IDL.Principal],
        [Result_2],
        [],
      ),
    'isVerifyTransferWH' : IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'privReadArtById' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'updateArt' : IDL.Func([ArtUpdate, IDL.Text], [Result], []),
    'wallet_receive' : IDL.Func(
        [],
        [IDL.Record({ 'accepted' : IDL.Nat64 })],
        [],
      ),
  });
  return ArtistCanister;
};
export const init = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  DetailValue.fill(
    IDL.Variant({
      'I64' : IDL.Int64,
      'U64' : IDL.Nat64,
      'Vec' : IDL.Vec(DetailValue),
      'Slice' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'True' : IDL.Null,
      'False' : IDL.Null,
      'VecText' : IDL.Vec(IDL.Text),
      'Float' : IDL.Float64,
      'Principal' : IDL.Principal,
    })
  );
  const Metadata = IDL.Record({
    'thumbnail' : IDL.Text,
    'name' : IDL.Text,
    'frontend' : IDL.Opt(IDL.Vec(IDL.Text)),
    'description' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
    'principal_id' : IDL.Principal,
  });
  return [Metadata, IDL.Principal];
};
