import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../../services/store';

const DEFAULT_FEED_VALUE: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

interface FeedState {
  selectedOrderId: string | null;
  feed: TOrdersData;
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  selectedOrderId: null,
  feed: DEFAULT_FEED_VALUE,
  order: null,
  isLoading: false,
  error: null
};

const selectOrders = (state: RootState) => state.rootReducer.orders.feed;

export const selectOrderById = createSelector(
  [selectOrders, (_: RootState, id: string) => id],
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
      return data.order;
    } catch (error) {
      return rejectWithValue('Failed to create order');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue('Failed to get user orders');
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetOrderData: (state) => {
      state.order = null;
    },
    setSelectedOrderId: (state, action: PayloadAction<string | null>) => {
      state.selectedOrderId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.feed = DEFAULT_FEED_VALUE;
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

    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.feed.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetOrderData, setSelectedOrderId } = feedSlice.actions;
export default feedSlice.reducer;
