import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'
import commentSlice from './features/comment/commentSlice'

export const store = configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice,
    comment: commentSlice,
  }
})