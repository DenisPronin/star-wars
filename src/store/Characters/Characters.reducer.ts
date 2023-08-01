import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, Nullish } from 'interfaces';

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

export interface CharactersState {
  characters: ICharacterListState;
  characterSelected: {
    isLoading: boolean;
    isLoaded: boolean;
    data: Nullish<ICharacter>;
  }
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
  },
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
    characterSelectedLoaded: (state, action: PayloadAction<ICharacter>) => {
      state.characterSelected = {
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      }
    },
  },
});

export const charactersReducer = charactersSlice.reducer;
