import React, { useState } from 'react';
import "../styles/LoginPage.css"
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { error } from 'console';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    const userData = {
      userName: userName,
      password: password
    }
    axios.post("http://localhost:5212/api/Login", userData).then(
      response => {
        setUser(response.data);
        navigate("/");
      }
    ).catch(
      error => {
        alert("Giriş yapılamadı...");
      }
    );
  }

  return (
    <div className="login-page-wrapper">
      <div className="form-box">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text"  onChange={e=>setUserName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"  onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button type="submit" onClick={()=>handleLogin()}>Login</button>
        <p>Don't have an account? <a href="/sign-up">Sign up here</a></p>
      </div>
    </div>

  );
}

export default LoginPage
