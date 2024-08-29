import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { UserProvider } from './contexts/UserContext';
import AdminPanel from './pages/AdminPanel';
import StorePage from './pages/StorePage';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/admin/*' element={<AdminPanel />} />
    </Routes>
  );
}

const AppWithProvider: React.FC = () => (
  <UserProvider initialUser={null}>
    <App />
  </UserProvider>
);

export default AppWithProvider;