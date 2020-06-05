import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  FAILED_PROCESS,
} from "./types";
import store from "../store";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const res = await fetch("api/posts");
    if (res.ok) {
      const jsonRes = await res.json();
      dispatch({
        type: GET_ITEMS,
        payload: jsonRes.posts,
      });
    } else {
      const error = { message: "failed" };
      throw error;
    }
  } catch (err) {
    dispatch({
      type: FAILED_PROCESS,
    });
  }
};

export const deleteItems = (id) => async (dispatch) => {
  dispatch(setItemsLoading());
  const config = {
    headers: { "content-type": "application/json" },
    method: "DELETE",
  };
  try {
    const res = await fetch(`api/posts/${id}`, config);
    if (res.ok) {
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    } else {
      const error = { message: "failed" };
      throw error;
    }
  } catch (err) {
    dispatch({
      type: FAILED_PROCESS,
    });
  }
};

export const addItems = (post) => async (dispatch) => {
  dispatch(setItemsLoading());
  const config = {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      posts: post,
    }),
  };
  config.headers["auth-token"] = store.getState().auth.token;
  try {
    const res = await fetch("api/posts", config);
    if (res.ok) {
      const jsonRes = await res.json();
      dispatch({
        type: ADD_ITEM,
        payload: jsonRes.savedPost,
      });
    } else {
      const error = { message: "failed" };
      throw error;
    }
  } catch (err) {
    dispatch({
      type: FAILED_PROCESS,
    });
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
