import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, ICharacterListKey, IFilm, ISpecies, IStarship, IVehicle, Nullish, ObjectLike } from 'interfaces';

export const CHARACTERS_STORE_KEY = 'characters';

export interface ICharacterLoadedAction {
  count: number;
  page: number;
  list: ICharacter[];
}

export interface ICharacterListState {
  count: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  isLoaded: boolean;
  list: ICharacter[];
}

export type IAdditionalDataItems = IFilm[] | IStarship[] | IVehicle[] | ISpecies[];

export interface IAdditionalDataByKey {
  isLoading: boolean;
  isLoaded: boolean;
  data: IAdditionalDataItems;
}

export type IAdditionalData = {
  [key in ICharacterListKey]?: IAdditionalDataByKey;
};

export interface ICharacterSelectedState {
  isLoading: boolean;
  isLoaded: boolean;
  data: Nullish<ICharacter>;
  additionalData: IAdditionalData;
}

export interface CharactersState {
  characters: ICharacterListState;
  characterSelected: ICharacterSelectedState;
  charactersSaved: ObjectLike<ICharacter>;
}

const initialState: CharactersState = {
  characters: {
    count: 0,
    page: 1,
    perPage: 10,
    isLoading: false,
    isLoaded: false,
    list: [],
  },
  characterSelected: {
    isLoading: false,
    isLoaded: false,
    data: null,
    additionalData: {},
  },
  charactersSaved: {},
};

export const charactersSlice = createSlice({
  name: CHARACTERS_STORE_KEY,
  initialState,
  reducers: {
    charactersLoading: (state, action: PayloadAction<boolean>) => {
      state.characters.isLoading = action.payload;
    },
    charactersLoaded: (state, action: PayloadAction<ICharacterLoadedAction>) => {
      state.characters = {
        ...state.characters,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
      };
    },
    characterSelectedLoading: (state, action: PayloadAction<boolean>) => {
      state.characterSelected.isLoading = action.payload;
    },
    characterSelectedLoaded: (state, action: PayloadAction<Nullish<ICharacter>>) => {
      state.characterSelected = {
        ...state.characterSelected,
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      };
    },
    characterSave: (state, action: PayloadAction<ICharacter>) => {
      state.charactersSaved = {
        ...state.charactersSaved,
        [action.payload.url]: action.payload,
      };
    },
    characterAdditionalDataInit: (state, action: PayloadAction<ICharacterListKey>) => {
      state.characterSelected.additionalData = {
        ...state.characterSelected.additionalData,
        [action.payload]: {
          isLoading: false,
          isLoaded: false,
          data: [],
        },
      };
    },
    characterAdditionalDataLoading: (
      state,
      action: PayloadAction<{ listKey: ICharacterListKey, isLoading: boolean }>,
    ) => {
      const { listKey, isLoading } = action.payload;
      state.characterSelected.additionalData = {
        ...state.characterSelected.additionalData,
        [listKey]: {
          ...state.characterSelected.additionalData[listKey],
          isLoading,
        },
      };
    },
    characterAdditionalDataLoaded: (
      state,
      action: PayloadAction<{
        listKey: ICharacterListKey,
        data: IAdditionalDataItems,
      }>,
    ) => {
      const { listKey, data } = action.payload;
      state.characterSelected.additionalData = {
        ...state.characterSelected.additionalData,
        [listKey]: {
          ...state.characterSelected.additionalData[listKey],
          isLoading: false,
          isLoaded: true,
          data,
        },
      };
    },
    characterReset: (state) => {
      state.characterSelected = initialState.characterSelected;
    },
  },
});

export const charactersReducer = charactersSlice.reducer;
