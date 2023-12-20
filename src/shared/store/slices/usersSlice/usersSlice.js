import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  adminLogin: null,
  usersStatus: null,
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

    setUserStatus: (state, action) => {
      state.usersStatus = action.payload;
    },

    updateUserRole: (state, action) => {
      const { email, isAdmin } = action.payload;
      state.users = state.users.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            isAdmin: isAdmin,
          };
        }
        return user;
      });
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
