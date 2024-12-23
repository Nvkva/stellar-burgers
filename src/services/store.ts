import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from '../features/user/userSlice';
import ordersReducer from '../features/feed/feedSlice';

const rootReducer = combineReducers({
  user: userReducer, // Подключение userReducer
  ingredients: ingredientsReducer,
  orders: ordersReducer
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
