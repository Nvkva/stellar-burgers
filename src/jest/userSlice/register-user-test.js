import userReducer, { registerUser } from './userSlice';

describe('User Reducer - registerUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null,
  };

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle registerUser.fulfilled', () => {
    const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' }; // Example user data
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle registerUser.rejected', () => {
    const errorMessage = 'Failed to register user';
    const action = { type: registerUser.rejected.type, payload: errorMessage };
    const state = userReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
