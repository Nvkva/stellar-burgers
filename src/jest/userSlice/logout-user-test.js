import userReducer, { logoutUser } from './userSlice';

describe('User Reducer - logoutUser', () => {
  const initialState = {
    user: { id: '123', name: 'Test User', email: 'test@example.com' }, // Пример начального состояния с пользователем
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null); // Пользователь должен быть сброшен
  });

  it('should handle logoutUser.rejected', () => {
    const errorMessage = 'Failed to logout';
    const action = { type: logoutUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
