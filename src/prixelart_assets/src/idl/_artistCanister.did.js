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
  const Result_2 = IDL.Variant({
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
  const Result_4 = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Principal, IDL.Principal),
    'err' : Error,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Art = IDL.Record({
    'thumbnail' : IDL.Text,
    'createdAt' : IDL.Int,
    'artBasics' : ArtBasics,
  });
  const Result_1 = IDL.Variant({ 'ok' : Art, 'err' : Error });
  const ArtistCanister = IDL.Service({
    'artistMetadata' : IDL.Func([], [Metadata__1], ['query']),
    'authorizedArr' : IDL.Func([], [Result_2], ['query']),
    'createArt' : IDL.Func([ArtUpdate], [Result_4], []),
    'createAssetCan' : IDL.Func([], [Result_3], []),
    'deleteArt' : IDL.Func([IDL.Text], [Result], []),
    'getAssetCanIds' : IDL.Func([], [Result_2], ['query']),
    'getCanIds' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'privReadArtById' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'updateArt' : IDL.Func([ArtUpdate, IDL.Text], [Result], []),
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
  return [Metadata];
};
