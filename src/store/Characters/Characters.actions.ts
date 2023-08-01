import { apiCharactersLoadItem, apiCharactersLoadPage } from 'api/apiCharacters';
import { AppDispatch, GetState, ICharacterListResponse } from 'interfaces';
import { charactersSlice } from './Characters.reducer';
import { selectCharacterSelectedModel } from './Characters.selectors';

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
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(charactersLoading(true));
    const response: ICharacterListResponse = await apiCharactersLoadPage(page, search);
    dispatch(charactersLoaded({
      list: response.results,
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
    dispatch(characterSelectedLoaded(response));
  } catch (e: any) {
    if (e.response.status === 404) {
      dispatch(characterSelectedLoaded(null));
    }
    console.error(e);
  } finally {
    dispatch(characterSelectedLoading(false));
  }
};
