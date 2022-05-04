export const idlFactory = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  const InitOptions = IDL.Record({ 'authorized' : IDL.Vec(IDL.Principal) });
  const Error = IDL.Variant({
    'NotAuthorized' : IDL.Null,
    'BadParameters' : IDL.Null,
    'Unknown' : IDL.Text,
    'NonExistentItem' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
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
  const CommentBasics = IDL.Record({
    'content' : IDL.Text,
    'details' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, DetailValue))),
    'category' : IDL.Opt(IDL.Text),
  });
  const CommentCreate = IDL.Record({ 'commentBasics' : CommentBasics });
  const SuggestionCreate = IDL.Record({ 'comment' : CommentCreate });
  const Result_10 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : Error,
  });
  const Result_9 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Principal, IDL.Principal),
    'err' : Error,
  });
  const CommentCreate__1 = IDL.Record({ 'commentBasics' : CommentBasics });
  const GalleryCreate = IDL.Record({
    'name' : IDL.Text,
    'galleryBanner' : IDL.Opt(IDL.Text),
    'description' : IDL.Text,
    'artistPpal' : IDL.Principal,
  });
  const PostBasics = IDL.Record({
    'title' : IDL.Text,
    'tools' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
    'asset' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'artType' : IDL.Text,
    'description' : IDL.Text,
    'artCategory' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
  });
  const PostCreate = IDL.Record({
    'postImage' : IDL.Vec(IDL.Nat8),
    'postBasics' : PostBasics,
  });
  const Follow = IDL.Record({
    'artistUsername' : IDL.Text,
    'artistPrincipal' : IDL.Principal,
    'followedByCaller' : IDL.Bool,
  });
  const Result_8 = IDL.Variant({ 'ok' : IDL.Vec(Follow), 'err' : Error });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : Error });
  const Suggestion = IDL.Record({
    'createdAt' : IDL.Int,
    'comment' : CommentCreate,
  });
  const Post = IDL.Record({ 'createdAt' : IDL.Int, 'postBasics' : PostBasics });
  const Comment = IDL.Record({
    'createdAt' : IDL.Int,
    'commentBasics' : CommentBasics,
  });
  const PostRead__1 = IDL.Record({
    'suggestions' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Suggestion))
    ),
    'post' : Post,
    'artistUsername' : IDL.Text,
    'likesQty' : IDL.Int,
    'comments' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Comment))
    ),
    'likedByCaller' : IDL.Bool,
    'postId' : IDL.Text,
  });
  const ArtistRead = IDL.Record({
    'postsQty' : IDL.Nat,
    'followedByCaller' : IDL.Bool,
    'postsRead' : IDL.Opt(IDL.Vec(PostRead__1)),
    'followersQty' : IDL.Nat,
    'galleriesQty' : IDL.Nat,
    'followsQty' : IDL.Nat,
  });
  const Result_7 = IDL.Variant({ 'ok' : ArtistRead, 'err' : Error });
  const Comment__1 = IDL.Record({
    'createdAt' : IDL.Int,
    'commentBasics' : CommentBasics,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Comment__1)),
    'err' : Error,
  });
  const PostRead = IDL.Record({
    'suggestions' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Suggestion))
    ),
    'post' : Post,
    'artistUsername' : IDL.Text,
    'likesQty' : IDL.Int,
    'comments' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Comment))
    ),
    'likedByCaller' : IDL.Bool,
    'postId' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(PostRead), 'err' : Error });
  const Gallery = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'galleryBanner' : IDL.Opt(IDL.Text),
    'description' : IDL.Text,
    'artistPpal' : IDL.Principal,
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Vec(Gallery), 'err' : Error });
  const Result_4 = IDL.Variant({ 'ok' : PostRead, 'err' : Error });
  const Suggestion__1 = IDL.Record({
    'createdAt' : IDL.Int,
    'comment' : CommentCreate,
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text, IDL.Text, Suggestion__1)),
    'err' : Error,
  });
  const GalleryUpdate = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'galleryBanner' : IDL.Opt(IDL.Text),
    'description' : IDL.Text,
  });
  const PostUpdate = IDL.Record({
    'postBasics' : PostBasics,
    'postId' : IDL.Text,
  });
  const anon_class_20_1 = IDL.Service({
    'addFollow' : IDL.Func([IDL.Text], [Result], []),
    'addLike' : IDL.Func([IDL.Text], [Result], []),
    'addSuggestion' : IDL.Func([IDL.Text, SuggestionCreate], [Result], []),
    'artistsCommentsSize' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'authorize' : IDL.Func([IDL.Principal], [Result], ['query']),
    'authorizedArr' : IDL.Func([], [Result_10], ['query']),
    'commentsSize' : IDL.Func([], [IDL.Nat], ['query']),
    'createAssetCan' : IDL.Func([], [Result_9], []),
    'createComment' : IDL.Func([IDL.Text, CommentCreate__1], [Result], []),
    'createGallery' : IDL.Func([GalleryCreate], [Result], []),
    'createPost' : IDL.Func([PostCreate], [Result], []),
    'readArtistFollowers' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'readArtistFollowersQty' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readArtistFollows' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'readArtistFollowsQty' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readArtistProfile' : IDL.Func([IDL.Text], [Result_7], ['query']),
    'readComments' : IDL.Func([IDL.Text], [Result_6], ['query']),
    'readCommentsQty' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readFirstCommentById' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'readFirstPostId' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'readFollowsPostsByCreation' : IDL.Func(
        [IDL.Text, IDL.Int, IDL.Int],
        [Result_2],
        ['query'],
      ),
    'readGalleriesByArtist' : IDL.Func([IDL.Text], [Result_5], ['query']),
    'readLikesQtyByArtist' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readLikesQtyByTarget' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readPostById' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'readPostSuggestions' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'readPostsByCreation' : IDL.Func([IDL.Int, IDL.Int], [Result_2], ['query']),
    'readPostsByGallery' : IDL.Func(
        [IDL.Text, IDL.Int, IDL.Int],
        [Result_2],
        ['query'],
      ),
    'readSuggestionsQtyByArtist' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'readSuggestionsQtyByPost' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'relPrincipalWithUsername' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [Result],
        [],
      ),
    'removeArtist' : IDL.Func([], [Result], []),
    'removeComment' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'removeFollow' : IDL.Func([IDL.Text], [Result], []),
    'removeGallery' : IDL.Func([IDL.Text], [Result], []),
    'removeLike' : IDL.Func([IDL.Text], [Result], []),
    'removePost' : IDL.Func([IDL.Text], [Result], []),
    'removeSuggestion' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'updateArtGallery' : IDL.Func([GalleryUpdate], [Result], []),
    'updatePost' : IDL.Func([PostUpdate], [Result], []),
  });
  return anon_class_20_1;
};
export const init = ({ IDL }) => {
  const InitOptions = IDL.Record({ 'authorized' : IDL.Vec(IDL.Principal) });
  return [InitOptions];
};
