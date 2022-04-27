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
    'Immutable' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
    'InvalidRequest' : IDL.Null,
    'AuthorizedPrincipalLimitReached' : IDL.Nat,
    'FailedToWrite' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, Metadata)),
    'err' : Error,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : Error,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : Error });
  return IDL.Service({
    'add' : IDL.Func([Metadata], [Result], []),
    'assignUsername' : IDL.Func([IDL.Text], [Result], []),
    'createArtistCan' : IDL.Func([], [Result], []),
    'get' : IDL.Func([IDL.Principal], [IDL.Opt(Metadata)], ['query']),
    'getAll' : IDL.Func([], [Result_3], ['query']),
    'getByUsername' : IDL.Func([IDL.Text], [IDL.Opt(Metadata)], ['query']),
    'getCanMemInfo' : IDL.Func([], [], ['query']),
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
    'getWhitelistedArtists' : IDL.Func([], [Result_2], []),
    'isArtistWhitelisted' : IDL.Func([IDL.Principal], [Result_1], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'remove' : IDL.Func([IDL.Principal], [Result], []),
    'update' : IDL.Func([Metadata], [Result], []),
    'usernameExist' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'whitelistArtists' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
