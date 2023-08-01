import { apiCharactersLoadItem, apiCharactersLoadPage } from 'api/apiCharacters';
import { AppDispatch, GetState, ICharacterListResponse } from 'interfaces';
import { charactersSlice } from './Characters.reducer';
import { selectCharacterSavedByUrl, selectCharacterSelectedModel } from './Characters.selectors';

export const {
  charactersLoading,
  charactersLoaded,
  characterSelectedLoaded,
  characterSelectedLoading,
  characterSave,
} = charactersSlice.actions;

export const characterLoadList = (
  page: number,
  search?: string,
) => async (dispatch: AppDispatch, getState: GetState) => {
  try {
    dispatch(charactersLoading(true));
    const response: ICharacterListResponse = await apiCharactersLoadPage(page, search);
    // restore saved character
    const state = getState();
    const results = response.results.map((character) => {
      const savedCharacter = selectCharacterSavedByUrl(character.url)(state);
      return { ...character, ...savedCharacter };
    });
    dispatch(charactersLoaded({
      list: results,
      count: response.count,
      page,
    }));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(charactersLoading(false));
  }
};

export const characterLoad = (
  characterId?: string,
) => async (dispatch: AppDispatch, getState: GetState) => {
  const characterModel = selectCharacterSelectedModel(getState());
  if (!characterId || characterModel.isLoaded) {
    return;
  }

  try {
    dispatch(characterSelectedLoading(true));
    const response = await apiCharactersLoadItem(characterId);
    // restore saved character
    const savedCharacter = selectCharacterSavedByUrl(response.url)(getState());
    dispatch(characterSelectedLoaded({
      ...response,
      ...savedCharacter,
    }));
  } catch (e: any) {
    if (e.response.status === 404) {
      dispatch(characterSelectedLoaded(null));
    }
    console.error(e);
  } finally {
    dispatch(characterSelectedLoading(false));
  }
};
