import React, { useState } from 'react'
import "../styles/SignUpPage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignUp = () => {
    if (password == confirmPassword) {
      const userData = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        userType: "customer"
      }

      axios.post("http://localhost:5212/api/User", userData).then(
        response => {
          alert("Kullanıcı başarıyla eklendi");
          navigate("/login");
        }
      ).catch(
        err => {
          if (err.response?.data?.errors) {
            const errorMessages = Object.values(err.response.data.errors).flat();
            const combinedErrors = errorMessages.join('\n');
            alert(combinedErrors);
          } else {
            alert("bu kullanıcı adı kullanılmış");
          }
        }
      );
    } else {
      alert("Parolalar eşleşmiyor...");
    }
  }

  return (
    <div className="sign-up-page-wrapper">
      <div className="form-box">
        <h2>Sign Up</h2>
        <div className="text-field">
          <label>Username</label>
          <input type="text" onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>First Name</label>
          <input type="text" onChange={(e) => { setFirstName(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Last Name</label>
          <input type="text" onChange={(e) => { setLastName(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Email</label>
          <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Password</label>
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Confirm Password</label>
          <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Phone Number</label>
          <input type="tel" id="phone" onChange={(e) => { setPhoneNumber(e.target.value) }} />
        </div>
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  )
}

export default SignUpPage
