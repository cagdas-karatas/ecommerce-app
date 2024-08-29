import React from 'react';
import { useUser } from '../contexts/UserContext';
import "../styles/ProfilePage.css";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!(user && user.user && user.user.userType)) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className='profile-page-wrapper'>
      <h1>Hoşgeldiniz {user.user.firstName} {user.user.lastName}</h1>
      <p>Kullanıcı Adı: {user.user.userName}</p>
      <p>Telefon: {user.user.phoneNumber}</p>
      <p>E-mail: {user.user.phoneNumber}</p>
      <p>Yetki: {user.user.userType}</p>
      <p style={{display: user.user.userType === "customer" ? "initial" : "none"}} className="become-a-seller">
        Wanna become a seller? <a onClick={()=>navigate("/seller-form")}>Click Here</a>
      </p>
    </div>
  )
}

export default ProfilePage;
