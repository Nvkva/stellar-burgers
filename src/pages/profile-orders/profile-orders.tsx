import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { getUserOrders } from '../../features/feed/feedSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.rootReducer.orders.feed.orders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
