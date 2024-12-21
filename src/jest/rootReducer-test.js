import { combineReducers } from 'redux';
import { rootReducer } from './path-to-root-reducer'; // Замените на путь к вашему rootReducer
import userReducer from './path-to-user-reducer'; // Замените на путь к вашему userReducer
import ingredientsReducer from './path-to-ingredients-reducer'; // Замените на путь к вашему ingredientsReducer
import ordersReducer from './path-to-orders-reducer'; // Замените на путь к вашему ordersReducer

describe('rootReducer', () => {
  it('should initialize with the correct structure', () => {
    // Пример начального состояния для каждого редьюсера
    const initialUserState = {
      user: null,
      isLoading: false,
      isUserDataOnInitLoaded: false,
      error: null
    };

    const initialIngredientsState = {}; // Замените на фактическое начальное состояние
    const initialOrdersState = {}; // Замените на фактическое начальное состояние

    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      user: initialUserState,
      ingredients: initialIngredientsState,
      orders: initialOrdersState
    });
  });
});
