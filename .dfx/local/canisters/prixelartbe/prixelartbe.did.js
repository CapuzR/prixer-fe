export const idlFactory = ({ IDL }) => {
  const ArtTypeUpdate = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const ToolCategoryUpdate__1 = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'artType' : ArtTypeUpdate,
    'description' : IDL.Text,
  });
  const ToolUpdate__1 = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'category' : ToolCategoryUpdate__1,
  });
  const ArtCategoryUpdate__1 = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const ArtBasics = IDL.Record({
    'title' : IDL.Text,
    'tools' : IDL.Opt(IDL.Vec(ToolUpdate__1)),
    'about' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'artType' : ArtTypeUpdate,
    'artCategory' : ArtCategoryUpdate__1,
    'artGalleries' : IDL.Opt(IDL.Text),
  });
  const Callback = IDL.Func([], [], []);
  const WriteAsset = IDL.Variant({
    'Init' : IDL.Record({
      'id' : IDL.Text,
      'size' : IDL.Nat,
      'callback' : IDL.Opt(Callback),
    }),
    'Chunk' : IDL.Record({
      'id' : IDL.Text,
      'chunk' : IDL.Vec(IDL.Nat8),
      'callback' : IDL.Opt(Callback),
    }),
  });
  const AssetRequest = IDL.Variant({
    'Put' : IDL.Record({
      'key' : IDL.Text,
      'contentType' : IDL.Text,
      'callback' : IDL.Opt(Callback),
      'payload' : IDL.Variant({
        'StagedData' : IDL.Null,
        'Payload' : IDL.Vec(IDL.Nat8),
      }),
    }),
    'Remove' : IDL.Record({ 'key' : IDL.Text, 'callback' : IDL.Opt(Callback) }),
    'StagedWrite' : WriteAsset,
  });
  const ArtUpdate = IDL.Record({
    'artBasics' : ArtBasics,
    'artRequest' : AssetRequest,
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
  const ArtCategory = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const ArtGalleryUpdate = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'artGalleryBanner' : IDL.Opt(IDL.Text),
  });
  const ArtType = IDL.Record({ 'name' : IDL.Text, 'description' : IDL.Text });
  const ToolUpdate = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'category' : ToolCategoryUpdate__1,
  });
  const Tool = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'category' : ToolCategoryUpdate__1,
  });
  const ToolCategory = IDL.Record({
    'name' : IDL.Text,
    'artType' : ArtTypeUpdate,
    'description' : IDL.Text,
  });
  const Asset = IDL.Record({
    'contentType' : IDL.Text,
    'payload' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  const Art = IDL.Record({
    'createdAt' : IDL.Int,
    'artistPpal' : IDL.Principal,
    'artBasics' : ArtBasics,
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Tuple(Art, IDL.Opt(Asset)),
    'err' : Error,
  });
  const Result_13 = IDL.Variant({
    'ok' : IDL.Tuple(
      IDL.Vec(IDL.Tuple(IDL.Text, Art)),
      IDL.Vec(IDL.Tuple(IDL.Text, Asset)),
    ),
    'err' : Error,
  });
  const ArtCategoryUpdate = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const Result_12 = IDL.Variant({
    'ok' : IDL.Vec(ArtCategoryUpdate),
    'err' : Error,
  });
  const ArtTypeUpdate__1 = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const Result_11 = IDL.Variant({
    'ok' : IDL.Vec(ArtTypeUpdate__1),
    'err' : Error,
  });
  const ToolCategoryUpdate = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'artType' : ArtTypeUpdate,
    'description' : IDL.Text,
  });
  const Result_10 = IDL.Variant({
    'ok' : IDL.Vec(ToolCategoryUpdate),
    'err' : Error,
  });
  const Result_9 = IDL.Variant({ 'ok' : IDL.Vec(ToolUpdate), 'err' : Error });
  const Result_7 = IDL.Variant({ 'ok' : ArtCategoryUpdate, 'err' : Error });
  const ArtGallery = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'artGalleryBanner' : IDL.Opt(IDL.Text),
    'artistPpal' : IDL.Principal,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Text, ArtGallery)),
    'err' : Error,
  });
  const Result_5 = IDL.Variant({ 'ok' : ArtTypeUpdate__1, 'err' : Error });
  const Artist = IDL.Record({
    'tools' : IDL.Vec(ToolUpdate__1),
    'createdAt' : IDL.Int,
  });
  const Result_4 = IDL.Variant({ 'ok' : Artist, 'err' : Error });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Text, Art, Asset)),
    'err' : Error,
  });
  const Result_2 = IDL.Variant({ 'ok' : ToolUpdate, 'err' : Error });
  const Result_1 = IDL.Variant({ 'ok' : ToolCategoryUpdate, 'err' : Error });
  return IDL.Service({
    'createArt' : IDL.Func([ArtUpdate], [Result], []),
    'createArtCategory' : IDL.Func([ArtCategory], [Result], []),
    'createArtGallery' : IDL.Func([ArtGalleryUpdate], [Result], []),
    'createArtType' : IDL.Func([ArtType], [Result], []),
    'createArtist' : IDL.Func([IDL.Vec(ToolUpdate)], [Result], []),
    'createTool' : IDL.Func([Tool], [Result], []),
    'createToolCategory' : IDL.Func([ToolCategory], [Result], []),
    'deleteArt' : IDL.Func([IDL.Text], [Result], []),
    'deleteArtCategory' : IDL.Func([IDL.Text], [Result], []),
    'deleteArtGallery' : IDL.Func([IDL.Text], [Result], []),
    'deleteArtType' : IDL.Func([IDL.Text], [Result], []),
    'deleteArtist' : IDL.Func([], [Result], []),
    'deleteTool' : IDL.Func([IDL.Text], [Result], []),
    'deleteToolCategory' : IDL.Func([IDL.Text], [Result], []),
    'getAssets' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Asset))],
        ['query'],
      ),
    'privReadArt' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'readAllArt' : IDL.Func([], [Result_13], ['query']),
    'readAllArtCategories' : IDL.Func([], [Result_12], ['query']),
    'readAllArtTypes' : IDL.Func([], [Result_11], ['query']),
    'readAllToolCategories' : IDL.Func([], [Result_10], ['query']),
    'readAllTools' : IDL.Func([], [Result_9], ['query']),
    'readArtById' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'readArtCategory' : IDL.Func([IDL.Text], [Result_7], ['query']),
    'readArtGalleriesByArtist' : IDL.Func(
        [IDL.Principal],
        [Result_6],
        ['query'],
      ),
    'readArtType' : IDL.Func([IDL.Text], [Result_5], ['query']),
    'readArtist' : IDL.Func([], [Result_4], ['query']),
    'readArtsByArtGallery' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'readArtsByArtist' : IDL.Func([IDL.Principal], [Result_3], ['query']),
    'readTool' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'readToolCategory' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'updateArt' : IDL.Func([ArtUpdate, IDL.Text], [Result], []),
    'updateArtCategory' : IDL.Func([ArtCategoryUpdate], [Result], []),
    'updateArtGallery' : IDL.Func([ArtGalleryUpdate, IDL.Text], [Result], []),
    'updateArtType' : IDL.Func([ArtTypeUpdate__1], [Result], []),
    'updateArtist' : IDL.Func([IDL.Vec(ToolUpdate)], [Result], []),
    'updateTool' : IDL.Func([ToolUpdate], [Result], []),
    'updateToolCategory' : IDL.Func([ToolCategoryUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
