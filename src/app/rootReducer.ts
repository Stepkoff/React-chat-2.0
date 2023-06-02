import {combineReducers} from "@reduxjs/toolkit";
import {authSlice} from "@/features/Auth";
import {chatSlice} from '@/entities/Chat';


export const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  chatSlice: chatSlice.reducer,
});