import { configureStore } from '@reduxjs/toolkit';
import { CHARACTERS_STORE_KEY, charactersReducer } from './Characters/Characters.reducer';

export const store = configureStore({
  reducer: {
    [CHARACTERS_STORE_KEY]: charactersReducer,
  },
});
