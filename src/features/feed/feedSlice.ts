import { getFeedsApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../../services/store';

interface FeedState {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const selectOrders = (state: RootState) => state.rootReducer.orders.feed;

export const selectOrderById = createSelector(
  [selectOrders, (_: RootState, id: string) => id], // Передаем состояние и id
  (feed, id) => feed.orders.find((order) => order.number === Number(id))
);

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

export const createOrder = createAsyncThunk(
  'feed/createOrder',
  async (ingredientsData: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredientsData);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to create order');
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;
