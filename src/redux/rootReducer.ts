import { combineReducers } from '@reduxjs/toolkit';
import { surveysProgressReducer } from './slices/surveys-progress';

export const rootReducer = combineReducers({
  surveysProgress: surveysProgressReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
