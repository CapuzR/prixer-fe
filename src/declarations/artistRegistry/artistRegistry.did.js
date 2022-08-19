export const idlFactory = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  const InitOptions = IDL.Record({
    'artistWhitelist' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
  });
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
  const Error = IDL.Variant({
    'NotAuthorized' : IDL.Null,
    'BadParameters' : IDL.Null,
    'Unknown' : IDL.Text,
    'NonExistentItem' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_8 = IDL.Variant({
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
  const Result_7 = IDL.Variant({
    'ok' : CreateInvoiceResult,
    'err' : InvoiceError,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, Metadata)),
    'err' : Error,
  });
  const Result_5 = IDL.Variant({ 'ok' : Invoice, 'err' : InvoiceError });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : Error,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : Error });
  const CreateCanistersResult = IDL.Record({
    'ok' : IDL.Bool,
    'assetCanisters' : IDL.Vec(IDL.Text),
    'canisterId' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : CreateCanistersResult,
    'err' : InvoiceError,
  });
  const Error__1 = IDL.Variant({
    'Immutable' : IDL.Null,
    'NotFound' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'InvalidRequest' : IDL.Null,
    'AuthorizedPrincipalLimitReached' : IDL.Nat,
    'FailedToWrite' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error__1 });
  const anon_class_26_1 = IDL.Service({
    'add' : IDL.Func([Metadata], [Result], []),
    'assignUsername' : IDL.Func([IDL.Text], [Result], []),
    'balance' : IDL.Func([], [IDL.Nat], ['query']),
    'createAssetCan' : IDL.Func([], [Result_8], []),
    'createInvoice' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [Result_7], []),
    'get' : IDL.Func([IDL.Principal], [IDL.Opt(Metadata)], ['query']),
    'getAll' : IDL.Func([], [Result_6], ['query']),
    'getByUsername' : IDL.Func([IDL.Text], [IDL.Opt(Metadata)], ['query']),
    'getCanMemInfo' : IDL.Func([], [], ['query']),
    'getInvoice' : IDL.Func([IDL.Nat], [Result_5], ['query']),
    'getPrincipalByUsername' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getUsernamesByPrincipal' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Text)],
        ['query'],
      ),
    'getWhitelistedArtists' : IDL.Func([], [Result_4], []),
    'isArtistWhitelisted' : IDL.Func([IDL.Principal], [Result_3], []),
    'isVerifyPayment' : IDL.Func([IDL.Nat, IDL.Text], [Result_2], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'remove' : IDL.Func([IDL.Principal], [Result], []),
    'transferAuthNFT' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Text],
        [Result_1],
        [],
      ),
    'update' : IDL.Func([Metadata], [Result], []),
    'usernameExist' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'wallet_receive' : IDL.Func([], [], []),
    'whitelistArtists' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
  });
  return anon_class_26_1;
};
export const init = ({ IDL }) => {
  const InitOptions = IDL.Record({
    'artistWhitelist' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
  });
  return [InitOptions];
};
