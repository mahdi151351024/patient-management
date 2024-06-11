import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = 'http://localhost:8000/api';

export const getLoginResponse = createAsyncThunk('auth/getLoginResponse', 
    async (loginPayload) => {
        const res = await axios.post(`${apiUrl}/login`, loginPayload);
        return res.data;
    }
);

export const getLogoutResponse = createAsyncThunk(
  "auth/getLogoutResponse",
  async () => {
      const res = await axios.get(`${apiUrl}/logout`, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
    return res.data;
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
      //Login
      builder.addCase(getLoginResponse.pending, (state) => {
        state.isLoading = true;
      });

      builder.addCase(getLoginResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
          if (!action.payload.status) { 
           state.error = action.payload.message;
              return;   
          }
        localStorage.setItem("token", action.payload.data.access_token);
        state.isLoggedIn = true;
      });

      builder.addCase(getLoginResponse.rejected, (state, action) => {
        if (!action.payload.status) {
          state.isLoading = false;
          state.error = action.payload.message;
        }
      });

      //Logout
      builder.addCase(getLogoutResponse.pending, (state) => {
        
      });

      builder.addCase(getLogoutResponse.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.isLoggedIn = false;
      });

        builder.addCase(getLogoutResponse.rejected, (state, action) => {
            state.error = null;
            if (action.payload === undefined) state.error = 'Unauthenticated Access';
            else if (!action.payload.status) state.error = action.payload.message;
      });
    },
    reducers: {
        
    }
});

// export const {  } = authSlice.actions;

export default authSlice.reducer;