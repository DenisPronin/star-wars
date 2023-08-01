import { useDispatch } from 'react-redux';
import { store } from 'store';

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
