import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from 'interfaces';

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
  },
});

export const charactersReducer = charactersSlice.reducer;
