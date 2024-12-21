import userReducer, { getUser } from './userSlice';

describe('User Reducer - getUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null,
  };

  it('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getUser.fulfilled', () => {
    const userPayload = { id: '123', name: 'Test User', email: 'test@example.com' };
    const action = { type: getUser.fulfilled.type, payload: userPayload };
    const state = userReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(userPayload); // Проверяем, что пользователь записался в state
    expect(state.isUserDataOnInitLoaded).toBe(true); // Проверяем, что флаг инициализации обновился
  });

  it('should handle getUser.rejected', () => {
    const errorMessage = 'Failed to fetch user';
    const action = { type: getUser.rejected.type, payload: errorMessage };
    const state = userReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage); // Проверяем, что ошибка записалась
    expect(state.isUserDataOnInitLoaded).toBe(true); // Проверяем, что флаг инициализации обновился
  });
});
