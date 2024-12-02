import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const AppHeader: FC = () => {
  const userName: string | undefined = useSelector(
    (state: RootState) => state.rootReducer.user.user?.name
  );
  return <AppHeaderUI userName={userName} />;
};
