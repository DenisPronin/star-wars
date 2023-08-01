import { apiCharactersLoadPage } from 'api/apiCharacters';
import { AppDispatch, ICharacterListResponse } from 'interfaces';
import { charactersSlice } from './Characters.reducer';

export const {
  charactersLoading,
  charactersLoaded,
  characterSelectedLoaded,
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
