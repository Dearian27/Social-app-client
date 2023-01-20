import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';


const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
}

export const createPost = createAsyncThunk('post/createPosts', async (params) => {
  try {
    const { data } = await axios.post('/posts', params)
    return data;
  } catch (error) {
    console.log(error)
  }
})

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost) => {
  try {
    const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getAll = createAsyncThunk('post/getAll', async () => {
  try {
    const { data } = await axios.get('/posts')
    return data;
  } catch (error) {
    console.log(error)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isLoading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.posts.push(action.payload)
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false

    },
    [getAll.pending]: (state) => {
      state.isLoading = true
    },
    [getAll.fulfilled]: (state, action) => {
      state.isLoading = false
      state.posts = action.payload.posts
      state.popularPosts = action.payload.popularPosts
    },
    [getAll.rejected]: (state, action) => {
      state.isLoading = false

    },
    [deletePost.pending]: (state) => {
      state.isLoading = true
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.posts = state.posts.filter(post => post._id !== action.payload._id)
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false
      const index = state.posts.findIndex((post) => post._id === action.payload.id)
      state.posts[index] = action.payload
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
})

export default postSlice.reducer