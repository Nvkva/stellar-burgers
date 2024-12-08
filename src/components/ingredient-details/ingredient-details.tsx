import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredientById } from '../../features/ingredients/ingredientsSlice';
import { fetchOrders } from '../../features/feed/feedSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state) =>
    id ? selectIngredientById(state, id) : null
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
