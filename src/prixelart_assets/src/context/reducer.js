import { types } from "../types";

export const PrixerReducer = (state = {}, action) => {
  switch (action.type) {
    case types.create_account:
      return {
        ...state,
        user: action.payload,
      };
    case types.handle_sidebar:
      return {
        ...state,
        isOpenSidebar: action.payload,
      };
    case types.get_posts_details:
      return {
        ...state,
        postsDetails: action.payload,
      };
    case types.get_feed:
      return {
        ...state,
        feed: action.payload,
      };
    case types.get_explore:
      return {
        ...state,
        explore: action.payload,
      };
    case types.get_galleries:
      return {
        ...state,
        galleries: action.payload,
      };
    case types.get_current_post:
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
};
