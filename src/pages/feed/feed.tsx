import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders } from '../../features/feed/feedSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';

export const Feed: FC = () => {
  const { orders } = useSelector(
    (state: RootState) => state.rootReducer.orders.feed
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders()); // Запрашиваем ингредиенты при загрузке компонента
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients()); // Запрашиваем ингредиенты при загрузке компонента
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  } else {
    return (
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(fetchOrders());
          dispatch(fetchIngredients());
        }}
      />
    );
  }
};
