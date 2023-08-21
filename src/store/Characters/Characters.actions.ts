import { apiCharactersLoadItem, apiCharactersLoadPage } from 'api/apiCharacters';
import { AppDispatch, GetState, ICharacter, ICharacterListResponse, ICharacterListKey } from 'interfaces';
import { queryGet } from '../../api/apiConfig';
import { charactersSlice, IAdditionalDataItems } from './Characters.reducer';
import { selectCharacterAdditionalData, selectCharacterSavedByUrl, selectCharacterSelectedModel } from './Characters.selectors';

export const {
  charactersLoading,
  charactersLoaded,
  characterSelectedLoaded,
  characterSelectedLoading,
  characterSave,
  characterAdditionalDataInit,
  characterAdditionalDataLoading,
  characterAdditionalDataLoaded,
  characterReset,
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

export const characterEditFinish = (
  character: ICharacter,
) => (dispatch: AppDispatch) => {
  dispatch(characterSave(character));
  dispatch(characterSelectedLoaded(character));
};

export const characterLoadAdditionalData = (
  listKey: ICharacterListKey,
) => async (dispatch: AppDispatch, getState: GetState) => {
  const characterModel = selectCharacterSelectedModel(getState());
  if (!characterModel.data) {
    return;
  }

  const urls = characterModel.data[listKey];

  try {
    const additionalDataItem = selectCharacterAdditionalData(listKey)(getState());
    if (additionalDataItem?.isLoaded) {
      return;
    }

    if (!additionalDataItem) {
      dispatch(characterAdditionalDataInit(listKey));
    }
    dispatch(characterAdditionalDataLoading({ listKey, isLoading: true }));

    const promises = urls.map((url) => {
      return queryGet(url);
    });
    const response = await Promise.all(promises);
    dispatch(characterAdditionalDataLoaded({ listKey, data: response as IAdditionalDataItems }));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(characterAdditionalDataLoading({ listKey, isLoading: false }));
  }
};
