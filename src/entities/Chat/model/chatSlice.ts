import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatSlice, ActionSetChat, ChatMap} from "./types.ts";

const initialState:ChatSlice = {
  isSelected: false,
  chatId: null,
  user: null,
  userChats: {},
}

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatWithUser: (state, action:PayloadAction<ActionSetChat>) => {
      state.isSelected = true
      state.user = action.payload.user
      state.chatId = action.payload.chatId
    },
    removeChatWithUser: (state) => {
      state.chatId = null
      state.user = null
      state.isSelected = false
    },
    setUserChats: (state, action: PayloadAction<ChatMap>) => {
      state.userChats = action.payload
    },
    removeUserChats: (state) => {
      state.userChats = {};
    }
  }
});

export const {
  setChatWithUser,
  removeChatWithUser,
  removeUserChats,
  setUserChats,
} = chatSlice.actions;