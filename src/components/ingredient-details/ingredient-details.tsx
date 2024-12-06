import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredientById
} from '../../features/ingredients/ingredientsSlice';
import { fetchOrders } from '../../features/feed/feedSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state: RootState) =>
    id ? selectIngredientById(state, id) : null
  );

  const { orders } = useSelector(
    (state: RootState) => state.rootReducer.orders.feed
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
