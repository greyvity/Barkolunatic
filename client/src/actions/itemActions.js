import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";

export const getItems = () => {
  return {
    type: GET_ITEMS,
  };
};

export const deleteItems = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};

export const addItems = (post) => {
  return {
    type: ADD_ITEM,
    payload: post,
  };
};
