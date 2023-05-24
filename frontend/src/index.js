import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createRoot } from 'react-dom';

import { I18nextProvider } from 'react-i18next';
// import i18n (needs to be bundled ;)) 

import i18n from './i18n';


ReactDOM.render(
<React.StrictMode>
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
