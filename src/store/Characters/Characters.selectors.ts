import { createSelector } from '@reduxjs/toolkit';
import { AppState, ICharacter, ICharacterListKey } from 'interfaces';
import { CHARACTERS_STORE_KEY, CharactersState, IAdditionalDataByKey, ICharacterSelectedState } from './Characters.reducer';

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

export const selectCharacterSavedByUrl = (url: string) => createSelector(
  selectCharactersSlice,
  (slice): Partial<ICharacter> => slice.charactersSaved[url] || {},
);

export const selectCharacterAdditionalData = (listKey: ICharacterListKey) => createSelector(
  selectCharactersSlice,
  (slice): IAdditionalDataByKey | undefined => slice.characterSelected.additionalData[listKey],
);
