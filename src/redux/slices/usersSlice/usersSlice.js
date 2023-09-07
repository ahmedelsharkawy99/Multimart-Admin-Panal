import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  adminLogin: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    replaceUsers: (state, action) => {
      state.users = action.payload;
    },

    setLog: (state, action) => {
      if (!action.payload) state.adminLogin = null;
      else
        state.adminLogin = {
          displayName: action.payload.displayName,
          imageUrl: action.payload.photoURL,
          id: action.payload.uid,
          email: action.payload.email,
        };
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
