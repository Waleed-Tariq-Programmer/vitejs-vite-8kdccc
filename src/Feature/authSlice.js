import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../Firebase/firebase";
import { signOut } from "firebase/auth";

export const Loginout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentusers: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentusers = action.payload;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Loginout.pending, (state) => {
        state.loading = true;  
        state.error = null;    
      })
      .addCase(Loginout.fulfilled, (state) => {
        state.currentusers = null;  
        state.loading = false;      
      })
      .addCase(Loginout.rejected, (state, action) => {
        state.loading = false;     
        state.error = action.payload;  
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
