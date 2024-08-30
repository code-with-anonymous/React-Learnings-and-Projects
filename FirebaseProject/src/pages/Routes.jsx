// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './Auth/Index';
import Frontend from './Frontend/Index';
import Dashboard from './Dashboard/Index';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path='auth/*' element={<Auth />} />
      <Route path='dashboard/*' element={<Dashboard />} />
    </Routes>
  );
}
