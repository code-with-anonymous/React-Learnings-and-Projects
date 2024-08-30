import React from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import AppRoutes from './pages/Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
