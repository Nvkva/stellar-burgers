import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api'; // Импортируем API метод
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

// Асинхронная Thunk-функция для запроса ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data; // Возвращаем данные ингредиентов
    } catch (error) {
      return rejectWithValue('Failed to fetch ingredients'); // Обрабатываем ошибку
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true; // Включаем флаг загрузки
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload; // Сохраняем ингредиенты
          state.isLoading = false; // Выключаем флаг загрузки
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false; // Выключаем флаг загрузки
        state.error = action.payload as string; // Записываем ошибку
      });
  }
});

export default ingredientsSlice.reducer;
