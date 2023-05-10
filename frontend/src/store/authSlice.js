import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('auth/register', async (user) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', user);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (user) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', user);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;
