import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store'; // Импортируем ваш Redux store

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean; // Если true, защищает роуты только для неавторизованных пользователей
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const { user } = useSelector((state: RootState) => state.user); // Данные о пользователе из стора
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Если пользователь авторизован и пытается зайти на маршрут для неавторизованных (например, "/login"),
    // перенаправляем на главную страницу
    return <Navigate to='/' />;
  }

  if (!onlyUnAuth && !user) {
    // Если пользователь не авторизован и пытается зайти на защищенный маршрут,
    // перенаправляем на "/login" с сохранением текущего пути
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если все условия соблюдены, рендерим дочерние компоненты
  return <>{children}</>;
};