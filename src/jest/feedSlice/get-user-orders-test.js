import reducer, { getUserOrders } from './feedSlice';

describe('Feed Slice Reducer - getUserOrders', () => {
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

  it('should set isLoading to true when getUserOrders is pending', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update feed.orders and set isLoading to false when getUserOrders is fulfilled', () => {
    const mockOrders = [
      { id: '1', name: 'Order 1' },
      { id: '2', name: 'Order 2' }
    ];
    const action = { type: getUserOrders.fulfilled.type, payload: mockOrders };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed.orders).toEqual(mockOrders);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when getUserOrders is rejected', () => {
    const mockError = 'Network error';
    const action = { type: getUserOrders.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed.orders).toEqual([]);
  });
});
