import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  GET_POST: "GET_POST_DETAIL",
  UPDATE_POST: "UPDATE_POST",
  DELETE_POST: "DELETE_POST",
  REPORT_POST: "REPORT_POST",
  SAVE_POST: "SAVE_POST",
};

export const createPost = ({ content, images, auth, socket }) => async (dispatch) => {
  let media = [];
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    if (images.length > 0) media = await imageUpload(images);

    const res = await postDataAPI("posts", { content, images: media }, auth.token);

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    const msg = {
      id: res.data.newPost._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.followers || [],
      url: `/post/${res.data.newPost._id}`,
      content,
      image: media[0]?.url || "",
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const getPosts = (token, page = 1) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

    const res = await getDataAPI(`posts?page=${page}`, token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: page + 1 },
    });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const updatePost = ({ content, images, auth, status }) => async (dispatch) => {
  let media = [];
  const imgNewUrl = images.filter((img) => !img.url);
  const imgOldUrl = images.filter((img) => img.url);

  if (status.content === content && imgNewUrl.length === 0 && imgOldUrl.length === status.images.length)
    return;

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

    const res = await patchDataAPI(
      `post/${status._id}`,
      { content, images: [...imgOldUrl, ...media] },
      auth.token
    );

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  
  if (socket?.emit) {
    socket.emit("likePost", newPost);
  }

  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token);

    if (auth.user._id !== post.user._id) {
      const msg = {
        id: auth.user._id,
        text: "Liked your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0]?.url || "",
      };

      dispatch(createNotify({ msg, auth, socket }));
    }
  } catch (err) {
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: post.likes.filter((like) => like._id !== auth.user._id) };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  
  if (socket?.emit) {
    socket.emit("unLikePost", newPost);
  }

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

    
    if (auth.user._id !== post.user._id) {
      const msg = {
        id: auth.user._id,
        text: "Unliked your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    }
  } catch (err) {
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
  if (detailPost.every((post) => post._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`, auth.token);
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err?.response?.data?.msg || err.message },
      });
    }
  }
};

export const deletePost = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token);

    const msg = {
      id: post._id,
      text: "Deleted a post.",
      recipients: res.data.deletedPost?.user?.followers || post.user?.followers || [],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const reportPost = ({ post, auth }) => async (dispatch) => {
  const reportExist = post.reports.find((report) => report === auth.user._id);

  if (reportExist) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "You have already reported this post." },
    });
  }

  const newPost = { ...post, reports: [...post.reports, auth.user._id] };
  dispatch({ type: POST_TYPES.REPORT_POST, payload: newPost });

  try {
    const res = await patchDataAPI(`post/${post._id}/report`, null, auth.token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: POST_TYPES.REPORT_POST, payload: post });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI("savePost/" + post._id, null, auth.token);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.AUTH, payload: auth });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};

export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: auth.user.saved.filter((id) => id !== post._id) };
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI("unSavePost/" + post._id, null, auth.token);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.AUTH, payload: auth });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err?.response?.data?.msg || err.message },
    });
  }
};
