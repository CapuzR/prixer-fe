import type { Principal } from '@dfinity/principal';
export interface Art {
  'createdAt' : bigint,
  'artistPpal' : Principal,
  'artBasics' : ArtBasics,
}
export interface ArtBasics {
  'title' : string,
  'tools' : [] | [Array<ToolUpdate__1>],
  'about' : string,
  'tags' : Array<string>,
  'artType' : ArtTypeUpdate,
  'artCategory' : ArtCategoryUpdate__1,
  'artGalleries' : [] | [string],
}
export interface ArtCategory { 'name' : string, 'description' : string }
export interface ArtCategoryUpdate {
  'id' : string,
  'name' : string,
  'description' : string,
}
export interface ArtCategoryUpdate__1 {
  'id' : string,
  'name' : string,
  'description' : string,
}
export interface ArtGallery {
  'name' : string,
  'description' : string,
  'artGalleryBanner' : [] | [string],
  'artistPpal' : Principal,
}
export interface ArtGalleryUpdate {
  'name' : string,
  'description' : string,
  'artGalleryBanner' : [] | [string],
}
export interface ArtType { 'name' : string, 'description' : string }
export interface ArtTypeUpdate {
  'id' : string,
  'name' : string,
  'description' : string,
}
export interface ArtTypeUpdate__1 {
  'id' : string,
  'name' : string,
  'description' : string,
}
export interface ArtUpdate {
  'artBasics' : ArtBasics,
  'artRequest' : AssetRequest,
}
export interface Artist { 'tools' : Array<ToolUpdate__1>, 'createdAt' : bigint }
export interface Asset {
  'contentType' : string,
  'payload' : Array<Array<number>>,
}
export type AssetRequest = {
    'Put' : {
      'key' : string,
      'contentType' : string,
      'callback' : [] | [Callback],
      'payload' : { 'StagedData' : null } |
        { 'Payload' : Array<number> },
    }
  } |
  { 'Remove' : { 'key' : string, 'callback' : [] | [Callback] } } |
  { 'StagedWrite' : WriteAsset };
export type Callback = () => Promise<undefined>;
export type Error = { 'Immutable' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'Unauthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'InvalidRequest' : null } |
  { 'AuthorizedPrincipalLimitReached' : bigint } |
  { 'FailedToWrite' : string };
export type List = [] | [[ToolUpdate, List]];
export type List_1 = [] | [[ToolCategoryUpdate, List_1]];
export type List_2 = [] | [[ArtTypeUpdate__1, List_2]];
export type List_3 = [] | [[ArtCategoryUpdate, List_3]];
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : ToolCategoryUpdate } |
  { 'err' : Error };
export type Result_10 = { 'ok' : List_1 } |
  { 'err' : Error };
export type Result_11 = { 'ok' : List_2 } |
  { 'err' : Error };
export type Result_12 = { 'ok' : List_3 } |
  { 'err' : Error };
export type Result_13 = {
    'ok' : [Array<[string, Art]>, Array<[string, Asset]>]
  } |
  { 'err' : Error };
export type Result_2 = { 'ok' : ToolUpdate } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<[string, Art, Asset]> } |
  { 'err' : Error };
export type Result_4 = { 'ok' : Artist } |
  { 'err' : Error };
export type Result_5 = { 'ok' : ArtTypeUpdate__1 } |
  { 'err' : Error };
export type Result_6 = { 'ok' : Array<[string, ArtGallery]> } |
  { 'err' : Error };
export type Result_7 = { 'ok' : ArtCategoryUpdate } |
  { 'err' : Error };
export type Result_8 = { 'ok' : [Art, [] | [Asset]] } |
  { 'err' : Error };
export type Result_9 = { 'ok' : List } |
  { 'err' : Error };
export interface Tool {
  'name' : string,
  'description' : string,
  'category' : ToolCategoryUpdate__1,
}
export interface ToolCategory {
  'name' : string,
  'artType' : ArtTypeUpdate,
  'description' : string,
}
export interface ToolCategoryUpdate {
  'id' : string,
  'name' : string,
  'artType' : ArtTypeUpdate,
  'description' : string,
}
export interface ToolCategoryUpdate__1 {
  'id' : string,
  'name' : string,
  'artType' : ArtTypeUpdate,
  'description' : string,
}
export interface ToolUpdate {
  'id' : string,
  'name' : string,
  'description' : string,
  'category' : ToolCategoryUpdate__1,
}
export interface ToolUpdate__1 {
  'id' : string,
  'name' : string,
  'description' : string,
  'category' : ToolCategoryUpdate__1,
}
export type WriteAsset = {
    'Init' : { 'id' : string, 'size' : bigint, 'callback' : [] | [Callback] }
  } |
  {
    'Chunk' : {
      'id' : string,
      'chunk' : Array<number>,
      'callback' : [] | [Callback],
    }
  };
export interface _SERVICE {
  'createArt' : (arg_0: ArtUpdate) => Promise<Result>,
  'createArtCategory' : (arg_0: ArtCategory) => Promise<Result>,
  'createArtGallery' : (arg_0: ArtGalleryUpdate) => Promise<Result>,
  'createArtType' : (arg_0: ArtType) => Promise<Result>,
  'createArtist' : (arg_0: Array<ToolUpdate>) => Promise<Result>,
  'createTool' : (arg_0: Tool) => Promise<Result>,
  'createToolCategory' : (arg_0: ToolCategory) => Promise<Result>,
  'deleteArt' : (arg_0: string) => Promise<Result>,
  'deleteArtCategory' : (arg_0: string) => Promise<Result>,
  'deleteArtType' : (arg_0: string) => Promise<Result>,
  'deleteArtist' : () => Promise<Result>,
  'deleteTool' : (arg_0: string) => Promise<Result>,
  'deleteToolCategory' : (arg_0: string) => Promise<Result>,
  'getAssets' : () => Promise<Array<[string, Asset]>>,
  'privReadArt' : (arg_0: string) => Promise<Result_8>,
  'readAllArt' : () => Promise<Result_13>,
  'readAllArtCategorys' : () => Promise<Result_12>,
  'readAllArtTypes' : () => Promise<Result_11>,
  'readAllToolCategories' : () => Promise<Result_10>,
  'readAllTools' : () => Promise<Result_9>,
  'readArtById' : (arg_0: string) => Promise<Result_8>,
  'readArtCategory' : (arg_0: string) => Promise<Result_7>,
  'readArtGalleriesByArtist' : (arg_0: Principal) => Promise<Result_6>,
  'readArtType' : (arg_0: string) => Promise<Result_5>,
  'readArtist' : () => Promise<Result_4>,
  'readArtsByArtGallery' : (arg_0: string) => Promise<Result_3>,
  'readArtsByArtist' : (arg_0: Principal) => Promise<Result_3>,
  'readTool' : (arg_0: string) => Promise<Result_2>,
  'readToolCategory' : (arg_0: string) => Promise<Result_1>,
  'updateArt' : (arg_0: ArtUpdate, arg_1: string) => Promise<Result>,
  'updateArtCategory' : (arg_0: ArtCategoryUpdate) => Promise<Result>,
  'updateArtGallery' : (arg_0: ArtGalleryUpdate, arg_1: string) => Promise<
      Result
    >,
  'updateArtType' : (arg_0: ArtTypeUpdate__1) => Promise<Result>,
  'updateArtist' : (arg_0: Array<ToolUpdate>) => Promise<Result>,
  'updateTool' : (arg_0: ToolUpdate) => Promise<Result>,
  'updateToolCategory' : (arg_0: ToolCategoryUpdate) => Promise<Result>,
}
