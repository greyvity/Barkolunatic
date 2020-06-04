import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  const res = await fetch("api/posts");
  if (res.ok) {
    const jsonRes = await res.json();
    dispatch({
      type: GET_ITEMS,
      payload: jsonRes.posts,
    });
  }
};

export const deleteItems = (id) => async (dispatch) => {
  dispatch(setItemsLoading());
  const options = {
    headers: { "content-type": "application/json" },
    method: "DELETE",
  };
  await fetch(`api/posts/${id}`, options);
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const addItems = (post) => async (dispatch) => {
  dispatch(setItemsLoading());
  const options = {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      posts: post,
    }),
  };
  const res = await fetch("api/posts", options);
  if (res.ok) {
    const jsonRes = await res.json();
    dispatch({
      type: ADD_ITEM,
      payload: jsonRes.savedPost,
    });
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
