import { FC, memo } from 'react';
import { OrderPageUI } from '../ui/order-page';
import { OrderPageProps } from './type';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectOrderById } from '../../features/feed/feedSlice';

export const OrderPage: FC<OrderPageProps> = ({ children }) => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector((state) =>
    number ? selectOrderById(state, number) : null
  );

  return (
    <OrderPageUI title={`#${String(orderData?.number).padStart(6, '0')}`}>
      {children}
    </OrderPageUI>
  );
};
