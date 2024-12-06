import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../features/user/userSlice';
import { OrderPage } from '../order-page/order-page';
import { IngredientsDetailsPage } from '../ingredients-details-page/ingredients-details-page';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';

const App = () => {
  const selectedOrderId = useSelector(
    (state: RootState) => state.rootReducer.orders.selectedOrderId
  );

  const location = useLocation();

  // Определяем фон (background), если Modal должен открываться поверх текущей страницы
  const state = location.state as { background?: Location };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <AppHeader />
      <Routes location={state?.background || location}>
        {/* Основные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <OrderPage>
              <OrderInfo />
            </OrderPage>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <IngredientsDetailsPage>
              <IngredientDetails />
            </IngredientsDetailsPage>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderPage>
                <OrderInfo />
              </OrderPage>
            </ProtectedRoute>
          } // Защищённый маршрут
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {state?.background && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={`#${String(selectedOrderId).padStart(6, '0')}`}
                  onClose={onClose}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={`#${String(selectedOrderId).padStart(6, '0')}`}
                    onClose={onClose}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
