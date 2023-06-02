import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthSlice, authData} from './types.ts';
import {User} from "@/app/globalTypes.ts";

const initialState: AuthSlice = {
  authData: null,
  currentUser: null,
}

export const authSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<authData | null>) => {
      state.authData = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },
    logOutUser: (state) => {
      state.authData = null;
      state.currentUser = null;
    }
  },
})

export const {
  setCurrentUser,
  setAuthData,
  logOutUser,
} = authSlice.actions