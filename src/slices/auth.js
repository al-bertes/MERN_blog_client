import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const {data} = await axios.post('/auth/login', params);
  return data;
})
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
  const {data} = await axios.get('/auth/me');
  return data;
})
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const {data} = await axios.post('auth/register', params);
  return data;
})
const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.data = null;
      }
    },
    extraReducers: {
      [fetchLogin.pending]: (state) => {
        state.status = 'loading';
        state.data = null;
      },
      [fetchLogin.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      },
      [fetchLogin.rejected]: (state) => {
        state.status = 'error';
        state.data = null;
      },
      [fetchAuth.pending]: (state) => {
        state.status = 'loading';
        state.data = null;
      },
      [fetchAuth.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      },
      [fetchAuth.rejected]: (state) => {
        state.status = 'error';
        state.data = null;
      },
      [fetchRegister.pending]: (state) => {
        state.status = 'loading';
        state.data = null;
      },
      [fetchRegister.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      },
      [fetchRegister.rejected]: (state) => {
        state.status = 'error';
        state.data = null;
      },fetchRegister
    }
  }
)

export const {logout} = authSlice.actions;
export const authReduser = authSlice.reducer;
