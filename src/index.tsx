import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';

const startMockServer = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
};

// Инициализируем мок-сервер перед рендерингом приложения
startMockServer().then(() => {
  const container = document.getElementById('root') as HTMLElement;
  const root = ReactDOMClient.createRoot(container!);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

