import { createSlice } from '@reduxjs/toolkit';

interface CharactersState {
  test: boolean;
}

const initialState: CharactersState = {
  test: true,
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
});

export const charactersReducer = charactersSlice.reducer;
