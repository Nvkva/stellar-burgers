import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { logoutUser } from '../../features/user/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result) {
      navigate('/login');
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
