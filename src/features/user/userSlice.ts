import { loginUserApi, registerUserApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: { name: string } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
};

// Асинхронная функция для логина пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser', // Название действия
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUserApi(userData); // API запрос
      return response.user; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue('Failed to login'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронная функция для логина пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser', // Название действия
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUserApi(userData); // API запрос
      return { name: response.user.name }; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue('Failed to register'); // Возвращаем ошибку в случае неудачи
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Включаем флаг загрузки
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ name: string }>) => {
          state.user = action.payload; // Обновляем данные о пользователе
          state.isLoading = false; // Выключаем флаг загрузки
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // Выключаем флаг загрузки
        state.error = action.payload as string; // Записываем ошибку
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Включаем флаг загрузки
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload; // Обновляем данные о пользователе
        state.isLoading = false; // Выключаем флаг загрузки
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // Выключаем флаг загрузки
        state.error = action.payload as string; // Записываем ошибку
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
