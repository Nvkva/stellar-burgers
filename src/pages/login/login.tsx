import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Инициализируем dispatch

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Пример данных, вы можете передать реальные данные после аутентификации
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
