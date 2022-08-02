import React from 'react';
import ReactDOM from 'react-dom/client'; // FIXME отступ после глобальных импортов
import { App } from './feature/App'; // FIXME App должен находиться в корне src

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
