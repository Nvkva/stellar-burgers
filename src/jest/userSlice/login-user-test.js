import userReducer, { loginUser } from './userSlice'; // замените на путь к вашему userSlice файлу

// Начальное состояние
const initialState = {
  user: null,
  isLoading: false,
  isUserDataOnInitLoaded: false,
  error: null,
};

describe('userSlice reducers', () => {
  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isLoading: false,
    });
  });

  it('should handle loginUser.rejected', () => {
    const mockError = 'Invalid credentials';
    const action = { type: loginUser.rejected.type, payload: mockError };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: mockError,
    });
  });
});
