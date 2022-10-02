import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    tokens: {
      accessToken: null,
      refreshToken: null,
    },
    user: {
      id: null,
      email: null,
      nickname: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { id, email, nickname } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.nickname = nickname;
    },
    auth: (state, action) => {
      const { tokens, user } = action.payload;
      const { accessToken, refreshToken } = tokens;
      const { id, email, nickname } = user;

      state.tokens.accessToken = accessToken;
      state.tokens.refreshToken = refreshToken;
      state.user.id = id;
      state.user.email = email;
      state.user.nickname = nickname;
    },
    logout: (state) => {
      state.tokens.accessToken = null;
      state.tokens.refreshToken = null;
      state.user.id = null;
      state.user.email = null;
      state.user.nickname = null;
    },
  },
});

export interface IAuthenticationSlice {
  tokens: {
    accessToken: null | string;
    refreshToken: null | string;
  };
  user: {
    id: null | string;
    email: null | string;
    nickname: null | string;
  };
}

export const { auth, setUser, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
