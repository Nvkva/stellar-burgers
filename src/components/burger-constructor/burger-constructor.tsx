import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../features/feed/feedSlice';
import { resetOrderData } from '../../features/feed/feedSlice';
import { resetConstructor } from '../../features/ingredients/ingredientsSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.rootReducer.ingredients.constructor
  );

  const { user } = useSelector((state) => state.rootReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const orderRequest = useSelector(
    (state) => state.rootReducer.orders.isLoading
  );

  const selectedIngredients = useSelector(
    (state) => state.rootReducer.ingredients.selectedIngredients
  );

  const orderModalData = useSelector((state) => state.rootReducer.orders.order);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      const ids = selectedIngredients.map((item) => item._id);
      dispatch(createOrder(ids));
    }
    if (!constructorItems?.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(resetOrderData());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun?.price * 2 : 0) +
      (constructorItems.ingredients.reduce((s, v) => s + v.price, 0) ?? 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
