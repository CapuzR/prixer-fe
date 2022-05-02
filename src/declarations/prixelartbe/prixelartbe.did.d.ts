import type { Principal } from '@dfinity/principal';
export interface ArtistRead {
  'postsQty' : bigint,
  'followedByCaller' : boolean,
  'postsRead' : [] | [Array<PostRead__1>],
  'followersQty' : bigint,
  'galleriesQty' : bigint,
  'followsQty' : bigint,
}
export interface Comment {
  'createdAt' : bigint,
  'commentBasics' : CommentBasics,
}
export interface CommentBasics {
  'content' : string,
  'details' : [] | [Array<[string, DetailValue]>],
  'category' : [] | [string],
}
export interface CommentCreate { 'commentBasics' : CommentBasics }
export interface CommentCreate__1 { 'commentBasics' : CommentBasics }
export interface Comment__1 {
  'createdAt' : bigint,
  'commentBasics' : CommentBasics,
}
export type DetailValue = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<DetailValue> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type Error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'Unknown' : string } |
  { 'NonExistentItem' : null };
export interface Follow {
  'artistUsername' : string,
  'artistPrincipal' : Principal,
  'followedByCaller' : boolean,
}
export interface Gallery {
  'id' : string,
  'name' : string,
  'createdAt' : bigint,
  'galleryBanner' : [] | [string],
  'description' : string,
  'artistPpal' : Principal,
}
export interface GalleryCreate {
  'name' : string,
  'galleryBanner' : [] | [string],
  'description' : string,
  'artistPpal' : Principal,
}
export interface GalleryUpdate {
  'id' : string,
  'name' : string,
  'galleryBanner' : [] | [string],
  'description' : string,
}
export interface Post { 'createdAt' : bigint, 'postBasics' : PostBasics }
export interface PostBasics {
  'title' : string,
  'tools' : [] | [Array<[string, string]>],
  'asset' : string,
  'tags' : Array<string>,
  'artType' : string,
  'description' : string,
  'artCategory' : string,
  'details' : Array<[string, DetailValue]>,
}
export interface PostCreate {
  'postImage' : Array<number>,
  'postBasics' : PostBasics,
}
export interface PostRead {
  'suggestions' : [] | [Array<[Principal, string, string, Suggestion]>],
  'post' : Post,
  'artistUsername' : string,
  'likesQty' : bigint,
  'comments' : [] | [Array<[Principal, string, string, Comment]>],
  'likedByCaller' : boolean,
  'postId' : string,
}
export interface PostRead__1 {
  'suggestions' : [] | [Array<[Principal, string, string, Suggestion]>],
  'post' : Post,
  'artistUsername' : string,
  'likesQty' : bigint,
  'comments' : [] | [Array<[Principal, string, string, Comment]>],
  'likedByCaller' : boolean,
  'postId' : string,
}
export interface PostUpdate { 'postBasics' : PostBasics, 'postId' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<PostRead> } |
  { 'err' : Error };
export type Result_3 = {
    'ok' : Array<[Principal, string, string, Suggestion__1]>
  } |
  { 'err' : Error };
export type Result_4 = { 'ok' : PostRead } |
  { 'err' : Error };
export type Result_5 = { 'ok' : Array<Gallery> } |
  { 'err' : Error };
export type Result_6 = {
    'ok' : Array<[Principal, string, string, Comment__1]>
  } |
  { 'err' : Error };
export type Result_7 = { 'ok' : ArtistRead } |
  { 'err' : Error };
export type Result_8 = { 'ok' : Array<Follow> } |
  { 'err' : Error };
export type Result_9 = { 'ok' : Array<Principal> } |
  { 'err' : Error };
export interface Suggestion { 'createdAt' : bigint, 'comment' : CommentCreate }
export interface SuggestionCreate { 'comment' : CommentCreate }
export interface Suggestion__1 {
  'createdAt' : bigint,
  'comment' : CommentCreate,
}
export interface _SERVICE {
  'addFollow' : (arg_0: string) => Promise<Result>,
  'addLike' : (arg_0: string) => Promise<Result>,
  'addSuggestion' : (arg_0: string, arg_1: SuggestionCreate) => Promise<Result>,
  'artistsCommentsSize' : (arg_0: Principal) => Promise<bigint>,
  'authorize' : (arg_0: Principal) => Promise<Result>,
  'authorizedArr' : () => Promise<Result_9>,
  'commentsSize' : () => Promise<bigint>,
  'createComment' : (arg_0: string, arg_1: CommentCreate__1) => Promise<Result>,
  'createGallery' : (arg_0: GalleryCreate) => Promise<Result>,
  'createPost' : (arg_0: PostCreate) => Promise<Result>,
  'readArtistFollowers' : (arg_0: string) => Promise<Result_8>,
  'readArtistFollowersQty' : (arg_0: string) => Promise<Result_1>,
  'readArtistFollows' : (arg_0: string) => Promise<Result_8>,
  'readArtistFollowsQty' : (arg_0: string) => Promise<Result_1>,
  'readArtistProfile' : (arg_0: string) => Promise<Result_7>,
  'readComments' : (arg_0: string) => Promise<Result_6>,
  'readCommentsQty' : (arg_0: string) => Promise<Result_1>,
  'readFirstCommentById' : (arg_0: string) => Promise<string>,
  'readFirstPostId' : (arg_0: Principal) => Promise<string>,
  'readFollowsPostsByCreation' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: bigint,
    ) => Promise<Result_2>,
  'readGalleriesByArtist' : (arg_0: string) => Promise<Result_5>,
  'readLikesQtyByArtist' : (arg_0: string) => Promise<Result_1>,
  'readLikesQtyByTarget' : (arg_0: string) => Promise<Result_1>,
  'readPostById' : (arg_0: string) => Promise<Result_4>,
  'readPostSuggestions' : (arg_0: string) => Promise<Result_3>,
  'readPostsByCreation' : (arg_0: bigint, arg_1: bigint) => Promise<Result_2>,
  'readPostsByGallery' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: bigint,
    ) => Promise<Result_2>,
  'readSuggestionsQtyByArtist' : (arg_0: string) => Promise<Result_1>,
  'readSuggestionsQtyByPost' : (arg_0: string) => Promise<Result_1>,
  'relPrincipalWithUsername' : (arg_0: Principal, arg_1: string) => Promise<
      Result
    >,
  'removeArtist' : () => Promise<Result>,
  'removeComment' : (arg_0: string, arg_1: string) => Promise<Result>,
  'removeFollow' : (arg_0: string) => Promise<Result>,
  'removeGallery' : (arg_0: string) => Promise<Result>,
  'removeLike' : (arg_0: string) => Promise<Result>,
  'removePost' : (arg_0: string) => Promise<Result>,
  'removeSuggestion' : (arg_0: string, arg_1: string) => Promise<Result>,
  'updateArtGallery' : (arg_0: GalleryUpdate) => Promise<Result>,
  'updatePost' : (arg_0: PostUpdate) => Promise<Result>,
}
