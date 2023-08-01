import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'interfaces';
import { CHARACTERS_STORE_KEY, CharactersState, ICharacterSelectedState } from './Characters.reducer';

export const selectCharactersSlice = (state: AppState): CharactersState => {
  return state[CHARACTERS_STORE_KEY];
};

export const selectCharactersModel = createSelector(
  selectCharactersSlice,
  (slice) => slice.characters,
);

export const selectCharacterSelectedModel = createSelector(
  selectCharactersSlice,
  (slice): ICharacterSelectedState => slice.characterSelected,
);
