import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/SellerFormContainer.css"
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const SellerFormContainer = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [shopName, setShopName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  if (!(user && user.user)) {
    return <div>Yükleniyor...</div>
  }

  const handleSubmit = () => {
    const data = {
      shopName: shopName,
      taxNumber: taxNumber,
      companyPhoneNumber: companyPhoneNumber,
      shopAddress: shopAddress,
      userId: user.user.userId
    }

    axios.post("http://localhost:5212/api/Shop/send_request", data).then(
      response => {
        alert("istek gönderildi");
        navigate("/");
      }
    ).catch(
      error => {
        alert("İstek gönderilirken bir hata oluştu");
      }
    );
  }

  return (
    <div className='seller-form-container'>
      <div className="form-box">
        <h2>Become A Seller</h2>
        <div className="text-field">
          <label>Shop Name</label>
          <input type="text" onChange={(e) => { setShopName(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Tax Number</label>
          <input type="text" onChange={(e) => { setTaxNumber(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Company Phone Number</label>
          <input type="text" onChange={(e) => { setCompanyPhoneNumber(e.target.value) }} />
        </div>
        <div className="text-field">
          <label>Shop Address</label>
          <input type="text" onChange={(e) => { setShopAddress(e.target.value) }} />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  )
}

export default SellerFormContainer;
