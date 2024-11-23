import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ConstructorPage, Feed, Login, NotFound404, Profile } from '@pages';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, logout } from '../../features/user/userSlice';

const App = () => {
  const location = useLocation();

  // Определяем фон (background), если Modal должен открываться поверх текущей страницы
  const state = location.state as { background?: Location };
  const navigate = useNavigate();

  const onClose = () => {
      navigate(-1);
  };

  const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const userData = localStorage.getItem('token');
        console.log(userData);
        if (userData) {
            dispatch(loginUser({email: 'asdad', password: 'asdads'}));
        } else {
            dispatch(logout());
        }
    }, [dispatch]);


  return (
    <div>
      <AppHeader />
      <Routes location={state?.background || location}>
        {/* Основные маршруты */}
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route
          path="/profile/orders/:number"
          element={<ProtectedRoute><OrderInfo /></ProtectedRoute>} // Защищённый маршрут
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {state?.background && (
        <>
          <Routes>
            <Route
              path="/feed/:number"
              element={
                <Modal title={''} onClose={onClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path="/ingredients/:id"
              element={
                <Modal title={'Детали ингредиента'} onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRoute>
                  <Modal title={''} onClose={onClose}>
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
