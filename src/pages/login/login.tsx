import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../features/user/userSlice';
import { AppDispatch } from 'src/services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
