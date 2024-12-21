import userReducer, { updateUser } from './userSlice';

describe('User Reducer - updateUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle updateUser.fulfilled', () => {
    const mockUpdatedUser = {
      id: '123',
      name: 'Updated User',
      email: 'updated@example.com'
    }; // Пример обновленных данных пользователя
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUpdatedUser
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUpdatedUser);
  });

  it('should handle updateUser.rejected', () => {
    const errorMessage = 'Failed to update user';
    const action = { type: updateUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
