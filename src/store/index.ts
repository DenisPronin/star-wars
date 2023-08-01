import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import { CHARACTERS_STORE_KEY, charactersReducer } from './Characters/Characters.reducer';

const rootConfig = {
  key: 'root',
  storage,
  blacklist: [CHARACTERS_STORE_KEY],
};

const charactersConfig = {
  key: CHARACTERS_STORE_KEY,
  storage,
  blacklist: ['characters', 'characterSelected'],
};

const rootReducer = combineReducers({
  [CHARACTERS_STORE_KEY]: persistReducer(charactersConfig, charactersReducer),
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
