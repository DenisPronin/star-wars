import { configureStore } from '@reduxjs/toolkit';
import { CHARACTERS_STORE_KEY, charactersReducer } from './Characters/Characters.reducer';

const rootReducer = {
  [CHARACTERS_STORE_KEY]: charactersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
