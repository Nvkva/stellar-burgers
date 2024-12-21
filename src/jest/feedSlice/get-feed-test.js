import reducer, { fetchOrders } from './feedSlice';

describe('Feed Slice Reducer - fetchOrders', () => {
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

  it('should set isLoading to true when fetchOrders is pending', () => {
    const action = { type: fetchOrders.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  it('should update feed and set isLoading to false when fetchOrders is fulfilled', () => {
    const mockFeedData = {
      orders: [{ id: '1', name: 'Order 1' }],
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchOrders.fulfilled.type, payload: mockFeedData };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed).toEqual(mockFeedData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when fetchOrders is rejected', () => {
    const mockError = 'Network error';
    const action = { type: fetchOrders.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0
    });
  });
});
