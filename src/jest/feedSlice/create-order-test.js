import reducer, { createOrder } from './feedSlice';

describe('Feed Slice Reducer - createOrder', () => {
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

  it('should set isLoading to true when createOrder is pending', () => {
    const action = { type: createOrder.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update order and set isLoading to false when createOrder is fulfilled', () => {
    const mockOrderData = { id: '1', name: 'Order 1', ingredients: ['Ingredient 1', 'Ingredient 2'] };
    const action = { type: createOrder.fulfilled.type, payload: mockOrderData };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.order).toEqual(mockOrderData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when createOrder is rejected', () => {
    const mockError = 'Network error';
    const action = { type: createOrder.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.order).toBeNull();
  });
});
