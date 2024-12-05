import { FC } from 'react';
import styles from './order-page.module.css';

interface OrderPageUIProps {
  children: React.ReactNode;
  title: string;
}

export const OrderPageUI: FC<OrderPageUIProps> = ({ children, title }) => (
  <div className={styles.wrapper}>
    <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);
