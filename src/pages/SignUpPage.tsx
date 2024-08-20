import React from 'react'
import "../styles/SignUpPage.css"

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up-page-wrapper">
      <div className="form-box">
        <h2>Sign Up</h2>
        <div className="text-field">
          <label>First Name</label>
          <input type="text" required />
        </div>
        <div className="text-field">
          <label>Last Name</label>
          <input type="text" required />
        </div>
        <div className="text-field">
          <label>Username</label>
          <input type="text" required />
        </div>
        <div className="text-field">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="text-field">
          <label>Password</label>
          <input type="password" required />
        </div>
        <div className="text-field">
          <label>Confirm Password</label>
          <input type="password" required />
        </div>
        <div className="text-field">
          <label>Phone Number</label>
          <input type="tel" id="phone" required />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  )
}

export default SignUpPage
