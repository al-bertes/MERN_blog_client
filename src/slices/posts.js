import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const {data} = await axios.get('/posts');
  return data;
});

export const fetchRemovePost = createAsyncThunk('/posts/fetchRomovePost', async (id) => {
  await axios.delete(`/posts/${id}`)
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const {data} = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = []
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = []
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg )
    },
    [fetchRemovePost.rejected]: (state) => {
      state.tags.status = 'error';
    }
  }
})

export const postReduser = postSlice.reducer;
