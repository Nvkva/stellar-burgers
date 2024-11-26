import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api'; // Импорт API метода
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

interface IngredientsState {
  ingredients: TIngredient[];
  selectedIngredients: TIngredient[]; // Новое состояние для выбранных ингредиентов
  selectedBun?: TIngredient | null;
  constructor: {
    bun?: TIngredient | null;
    ingredients: TIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredients: [], // Изначально список пуст
  selectedBun: null,
  constructor: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

// Селектор для извлечения всех ингредиентов из состояния
const selectIngredients = (state: RootState) =>
  state.rootReducer.ingredients.ingredients;

// Селектор для поиска ингредиента по id
export const selectIngredientById = createSelector(
  [selectIngredients, (_: RootState, id: string) => id], // Передаем состояние и id
  (ingredients, id) => ingredients.find((ingredient) => ingredient._id === id)
);

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
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedIngredients.push(action.payload);
      }

      state.constructor = {
        bun: state.selectedBun,
        ingredients: state.selectedIngredients
      };
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient._id !== action.payload // Удаляем по id
      );

      state.constructor = {
        bun: state.selectedBun,
        ingredients: state.selectedIngredients
      };
    }
  },
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

export const { addIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
