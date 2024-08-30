// src/Dashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardApp from './DashboardApp';
import Users from './Users';
import Menu from './Menu';
import Profile from './Profile';

export default function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardApp />} />
      <Route path="users" element={<Users />} />
      <Route path="create-menu" element={<Menu />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

