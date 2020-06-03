import { v4 as uuid } from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  posts: [
    { id: uuid(), title: "Sherlock", description: "Just Amazing" },
    {
      id: uuid(),
      title: "Avengers",
      description: "<3000",
    },
    { id: uuid(), title: "B99", description: "Noiceeeeeee" },
    {
      id: uuid(),
      title: "What's Life",
      description: "I dont know",
    },
  ],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case ADD_ITEM:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_ITEM:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
}
