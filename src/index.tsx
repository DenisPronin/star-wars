import 'antd/dist/reset.css';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Router } from './router';
import { persistor, store } from './store';

const { defaultAlgorithm } = theme;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            fontFamily: 'Kanit',
            fontSize: 16,
            colorPrimary: '#3f74ac',
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
