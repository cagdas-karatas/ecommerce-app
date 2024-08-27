import React, { useState } from 'react'
import "../styles/SignUpPage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpContainer from '../components/SignUpContainer';

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up-page-wrapper">
      <SignUpContainer></SignUpContainer>
    </div>
  )
}

export default SignUpPage
