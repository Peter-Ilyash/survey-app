import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, rootReducer } from './rootReducer';

/** 
  It's worth thinking about the store partially persistent to browser storage.
  As well as answers play crucial role in choosing and displayment the following ones,
  this approach could avoid critical bad cases related to session interruption by any reason.
**/

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
