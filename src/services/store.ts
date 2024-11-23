import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer, // Подключение userReducer
  ingredients: ingredientsReducer // Подключаем редюсер ингредиентов
  // Добавьте другие редьюсеры, если нужно
});

const store = configureStore({
  reducer: {
    rootReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
