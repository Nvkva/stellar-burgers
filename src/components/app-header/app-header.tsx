import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName: string | undefined = useSelector(
    (state) => state.rootReducer.user.user?.name
  );
  return <AppHeaderUI userName={userName} />;
};
