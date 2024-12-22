import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import userReducer from '../features/user/userSlice';
import ordersReducer from '../features/feed/feedSlice';
import { expect } from '@jest/globals';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

describe('rootReducer', () => {
  it('should return the correct initial state when called with undefined state and an unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState = {
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };

    expect(initialState).toEqual(expectedState);
  });
});
