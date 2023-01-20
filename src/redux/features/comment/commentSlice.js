import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
  comments: [],
  isLoading: false,
}

export const createComment = createAsyncThunk('/comment/createComment', async ({ postId, comment }) => {
  try {
    const { data } = await axios.post(`/comments/${postId}`, { postId, comment })
    return data;
  } catch (error) {
    console.log(error)
  }
})

export const getPostComments = createAsyncThunk('/comment/getPostComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/comments/${postId}`)
    return data;
  } catch (error) {
    console.log(error)
  }
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.isLoading = true
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false
      // if (!action.payload.message)
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getPostComments.pending]: (state) => {
      state.isLoading = true
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.isLoading = false
      // if (typeof action.payload === Object) {
      // }
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state) => {
      state.isLoading = false
    },
  }
})

export default commentSlice.reducer;