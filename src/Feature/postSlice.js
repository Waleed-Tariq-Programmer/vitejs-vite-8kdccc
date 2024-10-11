import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../Firebase/firebase";




export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
  },
  reducers: {

  }
});

// export const { setUser } = authSlice.actions;
export default postSlice.reducer;
