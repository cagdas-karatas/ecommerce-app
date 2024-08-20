import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/add-product' element={<AddProductPage/>}/>
    </Routes>
  );
}

const AppWithProvider: React.FC = () => (
  <UserProvider initialUser={null}>
    <App />
  </UserProvider>
);

export default AppWithProvider;