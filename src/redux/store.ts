import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from "redux-logger";
import state from "./state"


export const store = configureStore({
    reducer: state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const entireState = (state: RootState) => state
export const entireStateView = (state: RootState) => state.view
export const entireStateUser = (state: RootState) => state.user
export const entireStateUsers = (state: RootState) => state.users
export const entireStateImages = (state: RootState) => state.images