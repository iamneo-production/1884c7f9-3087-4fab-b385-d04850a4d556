import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './globalHandler/AuthProvider';
import { AppointmentsProvider } from './globalHandler/AppointmentsContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentsProvider>
        <App/>
      </AppointmentsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

