import reducer, { feedSlice } from './feedSlice';

// Моковые данные
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

describe('Feed Slice Reducer', () => {
  it('should handle adding an ingredient', () => {
    const newIngredient = { id: '1', name: 'Ingredient 1' };
    const action = { type: 'feed/addIngredient', payload: newIngredient };

    const newState = reducer(initialState, action);

    expect(newState.feed.orders).toContainEqual(newIngredient);
  });

  it('should handle deleting an ingredient', () => {
    const existingState = {
      ...initialState,
      feed: {
        ...initialState.feed,
        orders: [{ id: '1', name: 'Ingredient 1' }, { id: '2', name: 'Ingredient 2' }]
      }
    };

    const action = { type: 'feed/deleteIngredient', payload: '1' };

    const newState = reducer(existingState, action);

    expect(newState.feed.orders).not.toContainEqual({ id: '1', name: 'Ingredient 1' });
    expect(newState.feed.orders).toHaveLength(1);
  });

  it('should handle reordering ingredients', () => {
    const existingState = {
      ...initialState,
      feed: {
        ...initialState.feed,
        orders: [
          { id: '1', name: 'Ingredient 1' },
          { id: '2', name: 'Ingredient 2' }
        ]
      }
    };

    const action = {
      type: 'feed/reorderIngredients',
      payload: { fromIndex: 0, toIndex: 1 }
    };

    const newState = reducer(existingState, action);

    expect(newState.feed.orders).toEqual([
      { id: '2', name: 'Ingredient 2' },
      { id: '1', name: 'Ingredient 1' }
    ]);
  });
});

