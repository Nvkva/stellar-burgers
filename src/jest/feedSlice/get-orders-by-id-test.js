import reducer, { fetchOrdersById } from './feedSlice';

describe('Feed Slice Reducer - fetchOrdersById', () => {
  const initialState = {
    selectedOrderId: null,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    order: null,
    isLoading: false,
    error: null
  };

  it('should set isLoading to true when fetchOrdersById is pending', () => {
    const action = { type: fetchOrdersById.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update feed and set isLoading to false when fetchOrdersById is fulfilled', () => {
    const mockOrdersData = [{ id: '1', name: 'Order 1' }];
    const action = { type: fetchOrdersById.fulfilled.type, payload: mockOrdersData };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed.orders).toEqual(mockOrdersData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when fetchOrdersById is rejected', () => {
    const mockError = 'Network error';
    const action = { type: fetchOrdersById.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed.orders).toEqual([]);
  });
});
