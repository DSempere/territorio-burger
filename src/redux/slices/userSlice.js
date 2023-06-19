import { createSlice } from "@reduxjs/toolkit";

//parte de user del store(redux)
const initialState = { username: "", token: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {

      state.username = payload.username;
      state.token = payload.token;
    },
    removeUser: (state) => {
      state.username = "";
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
