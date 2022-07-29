import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface ArtistRead {
  'postsQty' : bigint,
  'followedByCaller' : boolean,
  'postsRead' : [] | [Array<PostRead>],
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
export interface InitOptions { 'authorized' : Array<Principal> }
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
  'artistPrincipal' : Principal,
  'comments' : [] | [
    Array<[Principal, string, string, Comment, bigint, Principal]>
  ],
  'likedByCaller' : boolean,
  'postId' : string,
}
export interface PostRead__1 {
  'suggestions' : [] | [Array<[Principal, string, string, Suggestion]>],
  'post' : Post,
  'artistUsername' : string,
  'likesQty' : bigint,
  'artistPrincipal' : Principal,
  'comments' : [] | [
    Array<[Principal, string, string, Comment, bigint, Principal]>
  ],
  'likedByCaller' : boolean,
  'postId' : string,
}
export interface PostUpdate { 'postBasics' : PostBasics, 'postId' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Array<ArtistRead> } |
  { 'err' : Error };
export type Result_10 = { 'ok' : string } |
  { 'err' : Error };
export type Result_11 = { 'ok' : [Principal, Principal] } |
  { 'err' : Error };
export type Result_12 = { 'ok' : Array<Principal> } |
  { 'err' : Error };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<PostRead__1> } |
  { 'err' : Error };
export type Result_4 = {
    'ok' : Array<[Principal, string, string, Suggestion__1]>
  } |
  { 'err' : Error };
export type Result_5 = { 'ok' : PostRead__1 } |
  { 'err' : Error };
export type Result_6 = { 'ok' : Array<Gallery> } |
  { 'err' : Error };
export type Result_7 = {
    'ok' : Array<[Principal, string, string, Comment__1, bigint, Principal]>
  } |
  { 'err' : Error };
export type Result_8 = { 'ok' : ArtistRead } |
  { 'err' : Error };
export type Result_9 = { 'ok' : Array<Follow> } |
  { 'err' : Error };
export interface Suggestion { 'createdAt' : bigint, 'comment' : CommentCreate }
export interface SuggestionCreate { 'comment' : CommentCreate }
export interface Suggestion__1 {
  'createdAt' : bigint,
  'comment' : CommentCreate,
}
export interface anon_class_22_1 {
  'addFollow' : ActorMethod<[string], Result>,
  'addLike' : ActorMethod<[string], Result>,
  'addSuggestion' : ActorMethod<[string, SuggestionCreate], Result>,
  'authorize' : ActorMethod<[Principal], Result>,
  'authorizedArr' : ActorMethod<[], Result_12>,
  'createAssetCan' : ActorMethod<[], Result_11>,
  'createComment' : ActorMethod<[string, CommentCreate__1], Result_10>,
  'createGallery' : ActorMethod<[GalleryCreate], Result>,
  'createPost' : ActorMethod<[PostCreate], Result>,
  'readArtistFollowers' : ActorMethod<[string], Result_9>,
  'readArtistFollowersQty' : ActorMethod<[string], Result_2>,
  'readArtistFollows' : ActorMethod<[string], Result_9>,
  'readArtistFollowsQty' : ActorMethod<[string], Result_2>,
  'readArtistProfile' : ActorMethod<[string], Result_8>,
  'readComments' : ActorMethod<[string], Result_7>,
  'readCommentsQty' : ActorMethod<[string], Result_2>,
  'readFollowsPostsByCreation' : ActorMethod<
    [string, bigint, bigint],
    Result_3,
  >,
  'readGalleriesByArtist' : ActorMethod<[string], Result_6>,
  'readLikesQtyByArtist' : ActorMethod<[string], Result_2>,
  'readLikesQtyByTarget' : ActorMethod<[string], Result_2>,
  'readPostById' : ActorMethod<[string], Result_5>,
  'readPostSuggestions' : ActorMethod<[string], Result_4>,
  'readPostsByCreation' : ActorMethod<[bigint, bigint], Result_3>,
  'readPostsByGallery' : ActorMethod<[string, bigint, bigint], Result_3>,
  'readSuggestionsQtyByArtist' : ActorMethod<[string], Result_2>,
  'readSuggestionsQtyByPost' : ActorMethod<[string], Result_2>,
  'relPrincipalWithUsername' : ActorMethod<[Principal, string], Result>,
  'removeArtist' : ActorMethod<[], Result>,
  'removeComment' : ActorMethod<[string, string], Result>,
  'removeFollow' : ActorMethod<[string], Result>,
  'removeGallery' : ActorMethod<[string], Result>,
  'removeLike' : ActorMethod<[string], Result>,
  'removePost' : ActorMethod<[string], Result>,
  'removeSuggestion' : ActorMethod<[string, string], Result>,
  'searchArtistByUsername' : ActorMethod<[string], Result_1>,
  'updateArtGallery' : ActorMethod<[GalleryUpdate], Result>,
  'updatePost' : ActorMethod<[PostUpdate], Result>,
}
export interface _SERVICE extends anon_class_22_1 {}
